"use strict";

var _Validator = require("./Validator");

var mustBe = function mustBe(val) {
  return {
    test: function test(x) {
      return {
        passed: x === val,
        detail: x !== val ? 'detail' : null
      };
    },
    name: "must be ".concat(val)
  };
};

describe('Validator', function () {
  it('basic test case', function () {
    var sut = (0, _Validator.Validator)({
      a: mustBe(3),
      b: mustBe('abc')
    });
    var res = sut({
      b: 456
    });
    expect(res).toMatchObject({
      a: {
        code: 'must be 3',
        value: undefined,
        detail: 'detail'
      },
      b: {
        code: 'must be abc',
        value: 456,
        detail: 'detail'
      }
    });
  });
});