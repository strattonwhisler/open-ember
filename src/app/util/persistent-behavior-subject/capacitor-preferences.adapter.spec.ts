// import { capacitorPreferencesAdapter } from './capacitor-preferences.adapter';
// import { PersistenceAdapter } from './persistence-adapter';
// import { typeCases } from './types.fixture';
//
// describe('capacitorPreferencesAdapter', () => {
//   let adapter: PersistenceAdapter<string>;
//
//   beforeEach(() => {
//     //TODO: Impl
//     adapter = capacitorPreferencesAdapter('test-key');
//   });
//
//   it('should read from preferences', async () => {
//     //TODO: Impl
//   });
//
//   it('should write to preferences', async () => {
//     //TODO: Impl
//   });
//
//   it('should clear the key from preferences', async () => {
//     //TODO: Impl
//   });
//
//   it('should support custom printers and parsers', async () => {
//     //TODO: Impl
//   });
//
//   it.each(typeCases)(
//     'should support reading and writing $type',
//     async ({ value }) => {
//       const _adapter = capacitorPreferencesAdapter<any>('test-key');
//       await _adapter.write(value);
//       expect(await _adapter.read()).toEqual(value);
//     }
//   );
// });
