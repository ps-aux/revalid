"use strict";

var _ruleBuilder = require("./ruleBuilder");

describe('ruleBuilder', function () {
  describe('rule', function () {
    it('truthy test return falsy', function () {
      var always = (0, _ruleBuilder.rule)({
        test: function test() {
          return true;
        },
        code: 'any'
      })();
      expect(always('any')).toBeFalsy();
    });
    it('falsy test return code', function () {
      var never = (0, _ruleBuilder.rule)({
        test: function test() {
          return false;
        },
        code: 'code'
      })();
      expect(never('any')).toBe('code');
    });
  });
  it('regexRule', function () {
    var r = (0, _ruleBuilder.regexRule)({
      regex: /abc/,
      code: 'code'
    })();
    expect(r('abc')).toBeFalsy();
    expect(r('xx')).toBe('code');
  });
});