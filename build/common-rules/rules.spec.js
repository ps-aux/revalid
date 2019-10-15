"use strict";

var _codes = _interopRequireDefault(require("./codes"));

var _rules = require("./rules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testRule = function testRule(name, rule, _ref) {
  var error = _ref.error,
      _ref$valid = _ref.valid,
      valid = _ref$valid === void 0 ? [] : _ref$valid,
      _ref$invalid = _ref.invalid,
      invalid = _ref$invalid === void 0 ? [] : _ref$invalid;
  return describe(name, function () {
    valid.forEach(function (v) {
      return it("".concat(v, " is valid"), function () {
        expect(rule(v)).toBeFalsy();
      });
    });
    invalid.forEach(function (v) {
      return it("".concat(v, " is invalid"), function () {
        expect(rule(v)).toBe(error);
      });
    });
  });
};

describe('rules.ts.jts', function () {
  testRule('notEmpty', (0, _rules.notEmpty)(), {
    error: _codes["default"].EMPTY,
    valid: ['yes'],
    invalid: ['', ' ', undefined, null]
  });
  testRule('notNull', (0, _rules.notNull)(), {
    error: _codes["default"].EMPTY,
    valid: [{}, ''],
    invalid: [undefined, null]
  });
  testRule('minLen', (0, _rules.minLen)(3), {
    error: _codes["default"].MIN_LEN,
    valid: ['123', '1234'],
    invalid: ['ab']
  });
  testRule('maxLen', (0, _rules.maxLen)(3), {
    error: _codes["default"].MAX_LEN,
    valid: ['12', '123'],
    invalid: ['abcd']
  });
  testRule('email', (0, _rules.email)(), {
    error: _codes["default"].EMAIL,
    valid: ['jano@email.com', 'abc@abc.com'],
    invalid: ['ab']
  });
  testRule('phoneNumber', (0, _rules.phoneNumber)(), {
    error: _codes["default"].PHONE_NUMBER,
    valid: ['00421900123456', '004212123456'],
    invalid: ['+421900123456', '0042190012345']
  });
  testRule('only letters', (0, _rules.onlyLetters)(), {
    error: _codes["default"].ONLY_LETTERS,
    valid: ['abcdefghijklmnopqrstuvxyz', 'ÁáÄäČčĎďÉéÍíĹĺĽľŇňÓóÔôŔŕŠšŤťÚúÝýŽžÁáČčĎďÉéĚěÍíŇňÓóŘřŠšŤťÚúŮůÝýŽž'],
    invalid: ['Doe_', 'In va#lid', 'NoWay123']
  });
});