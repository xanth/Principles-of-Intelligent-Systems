"use strict";

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _magicSquare = require('./magicSquare');

var magicSquare = _interopRequireWildcard(_magicSquare);

var metadata = {
  week: 1,
  description: "Week 1 - Magic Square Problem"
};

exports.metadata = metadata;

exports["default"] = function (inquirer, cb) {
  var questions = [{
    name: "size",
    type: "input",
    message: "Magic square size or exit (odd):",
    validate: function validate(value) {
      var valid = value == 'exit' || magicSquare.validate(value);
      return valid || "Please enter an odd number";
    }
  }];

  function promptHandeler(answer) {
    if (answer.size == 'exit') {
      cb();
    } else {
      magicSquare.output(magicSquare.magicSquare(answer.size));
      inquirer.prompt(questions, promptHandeler);
    }
  }

  inquirer.prompt(questions, promptHandeler);
};
//# sourceMappingURL=inquirerWrapper.js.map
