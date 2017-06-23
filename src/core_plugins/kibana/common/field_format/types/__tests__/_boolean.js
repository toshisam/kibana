import expect from 'expect.js';
import { stringifyBoolean } from '../boolean';

describe('Boolean Format', function () {

  let boolean;
  beforeEach(() => {
    const BoolFormat = stringifyBoolean();
    boolean = new BoolFormat();
  });

  [
    {
      input: 0,
      expected: 'false'
    },
    {
      input: 'no',
      expected: 'false'
    },
    {
      input: false,
      expected: 'false'
    },
    {
      input: 'false',
      expected: 'false'
    },
    {
      input: 1,
      expected: 'true'
    },
    {
      input: 'yes',
      expected: 'true'
    },
    {
      input: true,
      expected: 'true'
    },
    {
      input: 'true',
      expected: 'true'
    },
    {
      input: ' True  ',//should handle trailing and mixed case
      expected: 'true'
    }
  ].forEach((test)=> {
    it(`convert ${test.input} to boolean`, ()=> {
      expect(boolean.convert(test.input)).to.be(test.expected);
    });
  });

});
