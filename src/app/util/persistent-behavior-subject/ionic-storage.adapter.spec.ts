import { Storage } from '@ionic/storage';
import { ionicStorageAdapter } from './ionic-storage.adapter';
import { PersistenceAdapter } from './persistence-adapter';
import { typeCases } from './types.fixture';


describe('ionicStorageAdapter', () => {
  let store: Storage;
  let adapter: PersistenceAdapter<string>;

  beforeEach(async () => {
    //TODO: Impl
    store = new Storage();
    await store.create();
    adapter = ionicStorageAdapter(store, 'test-key');
  });

  it('should read from ionic storage', async () => {
    //TODO: Impl
  });

  it('should write to ionic storage', async () => {
    //TODO: Impl
  });

  it('should clear the key from ionic storage', async () => {
    //TODO: Impl
  });

  it('should support custom printers and parsers', async () => {
    //TODO: Impl
  });

  it.each(typeCases)(
    'should support reading and writing $type',
    async ({ value }) => {
      const _adapter = ionicStorageAdapter<any>(store, 'test-key');
      await _adapter.write(value);
      expect(await _adapter.read()).toEqual(value);
    }
  );
});
