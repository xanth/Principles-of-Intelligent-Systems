#!/usr/bin/env node
"use strict";

var _ = require('lodash');
var inquirer = require("inquirer");
var glob = require("glob");
var path = require('path');

global.appRoot = path.resolve(__dirname);

var choices = _(glob.sync(appRoot + "/**/inquirerWrapper.js")).map(function (file) {
  var problem = require(file).metadata;
  return {
    name: problem.description,
    value: file,
    key: problem.week
  };
}).value();

var questions = [{
  name: "problem",
  type: "list",
  message: "Please select a problem:",
  choices: choices
}];

function promptHandeler(answer) {
  var problem = require(answer.problem)["default"];
  problem(inquirer, function () {
    inquirer.prompt(questions, promptHandeler);
  });
}

console.log("Type exit at any time to return to to this menu");
inquirer.prompt(questions, promptHandeler);
//# sourceMappingURL=app.js.map
