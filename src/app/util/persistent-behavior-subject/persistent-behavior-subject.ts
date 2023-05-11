import { Subject, Subscriber, Subscription } from 'rxjs';
import { memoryAdapter } from './memory.adapter';
import { PersistenceAdapter } from './persistence-adapter';

interface PersistentBehaviorSubjectOptions {
  /**
   * Behavior when missing values are read from the persistence layer.
   *
   * - `initial` - Notify the initial value when read
   * - `error` - Notify an error when read
   * - `undefined` - Notify undefined when read
   *
   * Defaults to `initial`.
   */
  onMissing?: 'initial' | 'error' | 'undefined';

  /**
   * Write the initial value to the persistence layer if missing.
   * Occurs during subscriptions, sync, getValue, and clear.
   *
   * Defaults to `true`.
   */
  writeOnMissing?: boolean;
}

export class PersistentBehaviorSubject<T> extends Subject<T> {
  private options: PersistentBehaviorSubjectOptions;

  constructor(
    private initialValue: T,
    private adapter: PersistenceAdapter<T> = memoryAdapter(),
    options?: PersistentBehaviorSubjectOptions
  ) {
    super();

    this.options = {
      onMissing: 'initial',
      writeOnMissing: true,
      ...options,
    };
  }

  /**
   * The current value in the persistence layer as a Promise.
   */
  get value(): Promise<T> {
    return this.getValue();
  }

  /** @internal */
  protected _subscribe(subscriber: Subscriber<T>): Subscription {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const subscription = super._subscribe(subscriber); // @internal
    !subscription.closed &&
      // TODO: Cache the read value? Currently reading on every subscription. This is akin to a cold observable.
      this.read()
        .then((value) => subscriber.next(value))
        .catch((error) => subscriber.error(error));
    return subscription;
  }

  /**
   * Get the current value from the persistence layer.
   */
  getValue(): Promise<T> {
    const { hasError, thrownError } = this;
    if (hasError) {
      throw thrownError;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._throwIfClosed(); // @internal
    return this.read();
  }

  next(value: T): void {
    this.adapter
      .write(value)
      .then(() => super.next(value))
      .catch((error) => super.error(error));
  }

  /**
   * Synchronizes the subject with the value in the persistent layer, notifying as needed.
   */
  async sync(): Promise<void> {
    return this.read()
      .then((value) => super.next(value))
      .catch((error) => super.error(error));
  }

  /**
   * Clears the value from the persistent layer, notifying as needed.
   */
  async clear(): Promise<void> {
    switch (this.options.onMissing) {
      case 'initial': {
        const chain = this.options.writeOnMissing
          ? this.adapter.write(this.initialValue)
          : this.adapter.clear();

        return chain
          .then(() => super.next(this.initialValue))
          .catch((error) => super.error(error));
      }
      case 'undefined': {
        return this.adapter
          .clear()
          .then(() => super.next(undefined as unknown as T))
          .catch((error) => super.error(error));
      }
      case 'error': {
        const error = new TypeError(
          'Clear was called with nullish values prohibited'
        );
        super.error(error);
        throw error;
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private async read(): Promise<T> {
    const value = await this.adapter.read();
    if (value === undefined) {
      if (this.options.writeOnMissing) {
        await this.adapter.write(this.initialValue);
      }
      switch (this.options.onMissing) {
        case 'initial':
          return this.initialValue;
        case 'undefined':
          return undefined as unknown as T;
        case 'error':
          throw new TypeError('Adapter read a nullish value');
      }
    } else {
      return value;
    }
  }
}
