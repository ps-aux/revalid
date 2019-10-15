"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlyLetters = exports.gt = exports.phoneNumber = exports.email = exports.maxLen = exports.minLen = exports.validNumber = exports.notNull = exports.notEmpty = void 0;

var _codes = _interopRequireDefault(require("./codes"));

var _ruleBuilder = require("../rule-builder/ruleBuilder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var notEmpty = function notEmpty() {
  return function (v) {
    return v && v.trim().length > 0 ? undefined : _codes["default"].EMPTY;
  };
};

exports.notEmpty = notEmpty;

var notNull = function notNull() {
  return function (v) {
    return v == null || v === undefined ? _codes["default"].EMPTY : undefined;
  };
};

exports.notNull = notNull;
var validNumber = (0, _ruleBuilder.rule)({
  test: function test(v) {
    return typeof v === 'number' && !Number.isNaN(v);
  },
  code: _codes["default"].INVALID_NUMBER
});
exports.validNumber = validNumber;
var minLen = (0, _ruleBuilder.rule)({
  test: function test(v, ops) {
    return v.length >= ops;
  },
  code: _codes["default"].MIN_LEN
});
exports.minLen = minLen;
var maxLen = (0, _ruleBuilder.rule)({
  test: function test(v, ops) {
    return v.length <= ops;
  },
  code: _codes["default"].MAX_LEN
});
exports.maxLen = maxLen;
var email = (0, _ruleBuilder.regexRule)({
  regex: /^[a-zA-Z0-9+._%\-+]{1,256}@[a-zA-Z0-9][a-zA-Z0-9-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25})$/,
  code: _codes["default"].EMAIL
});
exports.email = email;
var phoneNumber = (0, _ruleBuilder.regexRule)({
  regex: /^00421(2|9\d{2})\d{6}$/,
  code: _codes["default"].PHONE_NUMBER
}); // TODO add test

exports.phoneNumber = phoneNumber;
var gt = (0, _ruleBuilder.rule)({
  test: function test(v, opts) {
    return v > opts;
  },
  code: _codes["default"].TOO_SMALL
});
exports.gt = gt;
var sk = ["\u013A", "\u013E", "\u0148", "\u0155", "\u0165", "\xFA", "\xF4", "\xC4", "\u010E", "\u0139", "\u013D", "\u0147", "\u0154", "\u0164", "\xDA", "\xD4", "\xCD", "\xD3", "\xDD", "\xE1", "\xE9", "\xED", "\xF3", "\xFD", "\u010C", "\u010D", "\u010F", "\u0160", "\u0161", "\u017D", "\u017E", "\xE4", "\xC9", "\xC1"];
var cz = ["\u0148", "\u0165", "\xFA", "\u010E", "\u0147", "\u0164", "\xDA", "\xCD", "\xD3", "\xDD", "\xE1", "\xE9", "\xED", "\xF3", "\xFD", "\u010C", "\u010D", "\u010F", "\u0160", "\u0161", "\u017D", "\u017E", "\xC9", "\xC1", "\u011A", "\u011B", "\u0159", "\u0158", "\u016E", "\u016F"];
/**
 * Remove duplicates
 */

var all = [].concat(sk, cz).reduce(function (acc, curr) {
  if (!acc.find(function (i) {
    return i === curr;
  })) return [].concat(_toConsumableArray(acc), [curr]);
  return acc;
}, []);
var onlyLettersRegex = new RegExp("^[A-Za-z,".concat(all.join(','), "]*$")); // en, sk, cz alphabet

var onlyLetters = (0, _ruleBuilder.regexRule)({
  regex: onlyLettersRegex,
  code: _codes["default"].ONLY_LETTERS
});
exports.onlyLetters = onlyLetters;