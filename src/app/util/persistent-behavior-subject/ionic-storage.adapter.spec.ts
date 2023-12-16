import { Storage } from '@ionic/storage';
import { ionicStorageAdapter } from './ionic-storage.adapter';
import { PersistenceAdapter } from './persistence-adapter';
import { typeCases } from './types.fixture';
import { expect } from 'chai';


describe('ionicStorageAdapter', () => {
  let store: Storage;
  let adapter: PersistenceAdapter<string>;

  beforeEach(async () => {
    store = new Storage();
    await store.create();
    adapter = ionicStorageAdapter(store, 'test-key');
  });

  it('should read from ionic storage');

  it('should write to ionic storage');

  it('should clear the key from ionic storage');

  it('should support custom printers and parsers');

  // it.each(typeCases)(
  //   'should support reading and writing $type',
  //   async ({ value }) => {
  //     const _adapter = ionicStorageAdapter<any>(store, 'test-key');
  //     await _adapter.write(value);
  //     expect(await _adapter.read()).to.equal(value);
  //   }
  // );
});
