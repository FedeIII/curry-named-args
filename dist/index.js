"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = curryNamed;
exports.ParamTypes = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var isRequiredParamPassed = function isRequiredParamPassed(params, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      paramName = _ref2[0],
      paramType = _ref2[1];

  return paramType !== ParamTypes.isRequired || params.hasOwnProperty(paramName);
};

var areRequiredParamsPassed = function areRequiredParamsPassed(fn, params) {
  return Object.entries(fn.paramTypes).reduce(function (areRequiredPresent, paramEntry) {
    return areRequiredPresent && isRequiredParamPassed(params, paramEntry);
  }, true);
};

function curryNamed(fn) {
  var params = {};

  function curryNamedFn(newParams) {
    params = _objectSpread({}, params, newParams);

    if (areRequiredParamsPassed(curryNamedFn, params)) {
      return fn(params);
    }

    return curryNamedFn;
  }

  Object.defineProperty(curryNamedFn, "name", {
    value: "curryNamed(".concat(fn.name, ")")
  });
  return curryNamedFn;
}

var ParamTypes = {
  isRequired: "ParamTypes_REQUIRED"
};
exports.ParamTypes = ParamTypes;