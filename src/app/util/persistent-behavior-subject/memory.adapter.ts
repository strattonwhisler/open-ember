import { PersistenceAdapter } from './persistence-adapter';

/**
 * Persists values using memory
 */
export const memoryAdapter = <T>(): PersistenceAdapter<T> => {
  let _value: T | undefined = undefined;

  return {
    async read(): Promise<T | undefined> {
      return _value;
    },

    async write(value: T): Promise<void> {
      _value = value;
    },

    async clear(): Promise<void> {
      _value = undefined;
    },
  };
};
