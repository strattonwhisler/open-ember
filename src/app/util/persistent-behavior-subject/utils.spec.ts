import { expect } from 'chai';
import { safeStringParse } from './utils';
import * as sinon from 'sinon';
import * as fc from 'fast-check';

describe.only('safeStringParse', () => {
  [null, undefined].forEach((value) => {
    it(`should return undefined for a ${String(value)} value`, () => {
      const result = safeStringParse(value, JSON.parse);

      expect(result).to.be.undefined();
    });
  });

  it('should pass the value to the parse function', () => {
    fc.assert(
      fc.property(
        fc.string(),
        (value) => {
          const parse = sinon.fake();

          const result = safeStringParse(value, parse);

          expect(parse).to.have.been.calledWith(value);
        }
      )
    );
  });

  // over('string values', fc.string(), (it) => {
  //   it('should pass the value to the parse function', (value) => {
  //     const parse = sinon.fake();
  //
  //     const result = safeStringParse(value, parse);
  //
  //     expect(parse).to.have.been.calledWith(value);
  //   });
  // });
});
