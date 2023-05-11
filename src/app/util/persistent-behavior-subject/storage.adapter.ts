import { StringParser, StringPrinter } from './models';
import { PersistenceAdapter } from './persistence-adapter';
import { safeStringParse } from './utils';

/**
 * Persists values using the Web Storage API
 *
 * @param storage The storage object to store values in
 * @param key Key to store the value under
 * @param print Printer to use when writing the value
 * @param parse Parser to use when reading the value
 */
export const storageAdapter = <T>(
  storage: Storage,
  key: string,
  print: StringPrinter<T> = JSON.stringify,
  parse: StringParser<T> = JSON.parse
): PersistenceAdapter<T> => ({
  async read(): Promise<T | undefined> {
    return safeStringParse(storage.getItem(key), parse);
  },

  async write(value: T): Promise<void> {
    storage.setItem(key, print(value));
  },

  async clear(): Promise<void> {
    storage.removeItem(key);
  },
});

/**
 * Persists values using localStorage
 *
 * @param key Key to store the value under
 * @param print Printer to use when writing the value
 * @param parse Parser to use when reading the value
 */
export const localStorageAdapter = <T>(
  key: string,
  print?: StringPrinter<T>,
  parse?: StringParser<T>
): PersistenceAdapter<T> => storageAdapter(localStorage, key, print, parse);

/**
 * Persists values using sessionStorage
 *
 * @param key Key to store the value under
 * @param print Printer to use when writing the value
 * @param parse Parser to use when reading the value
 */
export const sessionStorageAdapter = <T>(
  key: string,
  print?: StringPrinter<T>,
  parse?: StringParser<T>
): PersistenceAdapter<T> => storageAdapter(sessionStorage, key, print, parse);
