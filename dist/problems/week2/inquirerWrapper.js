"use strict";

var _toConsumableArray = require("babel-runtime/helpers/to-consumable-array")["default"];

var _bind = require("babel-runtime/helpers/bind")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graph = require('./graph');

var metadata = {
  week: 2,
  description: "Week 2 - Base Graph Class"
};

exports.metadata = metadata;

exports["default"] = function (inquirer, cb) {
  var isNumber = function isNumber(v) {
    return !isNaN(v) || "Please specify a number";
  };
  var questions = [{
    name: "numberOfCities",
    type: "input",
    message: "Number of Cities:",
    validate: isNumber
  }, {
    name: "numberOfLinks",
    type: "input",
    message: "Number of Links:",
    validate: isNumber
  }, {
    name: "links",
    type: "input",
    message: "Links or exit <source> <dest> <cost>:",
    validate: function validate(value) {
      var valid = value == 'exit' || value.split(' ').length % 3 === 0;
      return valid || "Please specify links as per the format";
    }
  }];

  function promptHandeler(answer) {
    if (answer.links == 'exit') {
      cb();
    } else {
      var links = (0, _graph.generateLinks)(answer.links);
      var graph = new (_bind.apply(_graph.Graph, [null].concat(_toConsumableArray(links))))();
      graph.printNodes();
      graph.printLinks();
      inquirer.prompt(questions, promptHandeler);
    }
  }
  inquirer.prompt(questions, promptHandeler);
};
//# sourceMappingURL=inquirerWrapper.js.map
