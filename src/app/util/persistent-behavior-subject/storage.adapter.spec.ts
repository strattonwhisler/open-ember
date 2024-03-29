import { PersistenceAdapter } from './persistence-adapter';
import { identity } from 'rxjs';
import { localStorageAdapter, sessionStorageAdapter } from './storage.adapter';
import { typeCases } from './types.fixture';


describe('localStorageAdapter', () => {
  let adapter: PersistenceAdapter<string>;

  beforeEach(() => {
    localStorage.clear();
    adapter = localStorageAdapter('test-key');
  });

  it('should read from localStorage', async () => {
    localStorage.setItem('test-key', '"test-value"');
    expect(await adapter.read()).toEqual('test-value');
  });

  it('should write to localStorage', async () => {
    await adapter.write('test-value');
    expect(localStorage.getItem('test-key')).toEqual('"test-value"');
  });

  it('should clear the key from localStorage', async () => {
    localStorage.setItem('test-key', '"test-value"');
    localStorage.setItem('test-key2', '"test-value"');
    expect(localStorage.getItem('test-key')).toEqual('"test-value"');
    await adapter.clear();
    expect(localStorage.getItem('test-key')).toBeNull();
    expect(localStorage.getItem('test-key2')).toEqual('"test-value"');
  });

  it('should support custom printers and parsers', async () => {
    adapter = localStorageAdapter('test-key', identity, identity);
    await adapter.write('test-value');
    expect(localStorage.getItem('test-key')).toEqual('test-value');
    expect(await adapter.read()).toEqual('test-value');
  });

  it.each(typeCases)('should support reading and writing $type', async ({ value }) => {
    localStorage.clear();
    const _adapter = localStorageAdapter<any>('test-key');
    await _adapter.write(value);
    expect(await _adapter.read()).toEqual(value);
  });
});

describe('sessionStorageAdapter', () => {
  let adapter: PersistenceAdapter<string>;

  beforeEach(() => {
    sessionStorage.clear();
    adapter = sessionStorageAdapter('test-key');
  });

  it('should read from sessionStorage', async () => {
    sessionStorage.setItem('test-key', '"test-value"');
    expect(await adapter.read()).toEqual('test-value');
  });

  it('should write to sessionStorage', async () => {
    await adapter.write('test-value');
    expect(sessionStorage.getItem('test-key')).toEqual('"test-value"');
  });

  it('should clear the key from sessionStorage', async () => {
    sessionStorage.setItem('test-key', '"test-value"');
    sessionStorage.setItem('test-key2', '"test-value"');
    expect(sessionStorage.getItem('test-key')).toEqual('"test-value"');
    await adapter.clear();
    expect(sessionStorage.getItem('test-key')).toBeNull();
    expect(sessionStorage.getItem('test-key2')).toEqual('"test-value"');
  });

  it('should support custom printers and parsers', async () => {
    adapter = sessionStorageAdapter('test-key', identity, identity);
    adapter.write('test-value');
    expect(sessionStorage.getItem('test-key')).toEqual('test-value');
    expect(await adapter.read()).toEqual('test-value');
  });

  it.each(typeCases)('should support reading and writing $type', async ({ value }) => {
    sessionStorage.clear();
    const _adapter = sessionStorageAdapter<any>('test-key');
    await _adapter.write(value);
    expect(await _adapter.read()).toEqual(value);
  });
});
