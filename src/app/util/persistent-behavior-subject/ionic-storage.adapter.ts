import { Storage } from '@ionic/storage';
import { PersistenceAdapter } from './persistence-adapter';


/**
 * Persists values using Ionic Storage
 *
 * @param storage The Ionic storage object to store values in
 * @param key Key to store the value under
 */
export const ionicStorageAdapter = <T>(
  storage: Storage,
  key: string
): PersistenceAdapter<T> => ({
  async read(): Promise<T | undefined> {
    return storage.get(key);
  },

  async write(value: T): Promise<void> {
    await storage.set(key, value);
  },

  async clear(): Promise<void> {
    await storage.remove(key);
  },
});
