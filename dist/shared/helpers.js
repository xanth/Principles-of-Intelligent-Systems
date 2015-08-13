"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newArray = newArray;

function newArray() {
  for (var _len = arguments.length, dimens = Array(_len), _key = 0; _key < _len; _key++) {
    dimens[_key] = arguments[_key];
  }

  var arrLength = dimens[0];
  var arr = new Array(arrLength);
  dimens.shift();
  for (var i = 0; i < arrLength; i++) {
    arr[i] = dimens[0] !== undefined ? newArray.apply(undefined, dimens) : null;
  }
  return arr;
}
//# sourceMappingURL=helpers.js.map
