"use strict";

var _slicedToArray = require("babel-runtime/helpers/sliced-to-array")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.magicSquare = magicSquare;
exports.output = output;
exports.validate = validate;
var newArray = require(appRoot + "/shared/helpers").newArray;

function magicSquare(size) {
  var state = newArray(size, size);
  var x = (size - 1) / 2;
  var y = 0;
  var i = 1;
  state[y][x] = i++;
  while (i <= Math.pow(size, 2)) {
    if (i === Math.pow(size, 2)) {
      state[size - 1][(size - 1) / 2] = i++;
    } else if (i % size == 0) {
      var _getPos = getPos(size - 1, x, y);

      var _getPos2 = _slicedToArray(_getPos, 2);

      x = _getPos2[0];
      y = _getPos2[1];

      state[y++][x] = i++;
      state[y][x] = i++;
    } else {
      var _getPos3 = getPos(size - 1, x, y);

      var _getPos32 = _slicedToArray(_getPos3, 2);

      x = _getPos32[0];
      y = _getPos32[1];

      state[y][x] = i++;
    }
  }
  return state;
}

function getPos(max, posx, posy) {
  var newPosX = posx + 1 > max ? 0 : posx + 1;
  var newPosY = posy - 1 < 0 ? max : posy - 1;
  return [newPosX, newPosY];
}

function output(state) {
  for (var i = 0; i < state.length; i++) {
    var row = "";
    for (var j = 0; j < state.length; j++) {
      row += " " + (state[i][j] === null ? "0" : state[i][j]);
    }
    console.log(row);
  }
  console.log();
}

function validate(size) {
  return size % 2 === 1;
}
//# sourceMappingURL=magicSquare.js.map
