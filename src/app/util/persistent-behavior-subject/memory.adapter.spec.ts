import { memoryAdapter } from './memory.adapter';
import { PersistenceAdapter } from './persistence-adapter';
import { typeCases } from './types.fixture';
import { expect } from 'chai';

describe('memoryAdapter', () => {
  let adapter: PersistenceAdapter<string>;

  beforeEach(() => {
    adapter = memoryAdapter();
  });

  it('should persist the value in memory', async () => {
    await adapter.write('test-value');
    expect(await adapter.read()).to.equal('test-value');
  });

  it('should clear the value from memory', async () => {
    await adapter.write('test-value');
    await adapter.clear();
    expect(await adapter.read()).to.be.undefined();
  });

  // it.each(typeCases)('should support reading and writing $type', async ({ value }) => {
  //   const _adapter = memoryAdapter<any>();
  //   await _adapter.write(value);
  //   expect(await _adapter.read()).to.equal(value);
  // });
});
