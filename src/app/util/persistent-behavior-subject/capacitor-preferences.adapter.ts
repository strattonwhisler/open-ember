// import { Preferences } from '@capacitor/preferences';
// import { StringParser, StringPrinter } from './models';
// import { PersistenceAdapter } from './persistence-adapter';
// import { safeStringParse } from "./utils";
//
//
// /**
//  * Persists values using Capacitor Preferences
//  *
//  * @param {string} key Key to store the value under
//  * @param print Printer to use when writing the value
//  * @param parse Parser to use when reading the value
//  */
// export const capacitorPreferencesAdapter = <T>(
//   key: string,
//   print: StringPrinter<T> = JSON.stringify,
//   parse: StringParser<T> = JSON.parse
// ): PersistenceAdapter<T> => ({
//   async read(): Promise<T | undefined> {
//     const result = await Preferences.get({ key });
//     return safeStringParse(result.value, parse);
//   },
//
//   async write(value: T): Promise<void> {
//     await Preferences.set({ key, value: print(value) });
//   },
//
//   async clear(): Promise<void> {
//     await Preferences.remove({ key });
//   },
// });
