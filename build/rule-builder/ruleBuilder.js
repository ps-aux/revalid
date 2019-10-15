"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regexRule = exports.rule = void 0;

var rule = function rule(_ref) {
  var test = _ref.test,
      code = _ref.code;
  return function (ops) {
    return function (val) {
      if (val == null) return false;
      return test(val, ops) ? false : code;
    };
  };
};

exports.rule = rule;

var regexRule = function regexRule(_ref2) {
  var regex = _ref2.regex,
      code = _ref2.code;
  return rule({
    test: function test(v) {
      return regex.test(v);
    },
    code: code
  });
};

exports.regexRule = regexRule;