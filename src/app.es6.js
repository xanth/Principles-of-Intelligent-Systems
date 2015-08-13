#!/usr/bin/env node
const _         = require('lodash');
const inquirer  = require("inquirer");
const glob      = require("glob")
const path      = require('path');

global.appRoot = path.resolve(__dirname);

let choices = _(glob.sync(`${appRoot}/**/inquirerWrapper.js`)).map((file) => {
  let problem = require(file).metadata;
  return {
    name  : problem.description,
    value : file,
    key   : problem.week
  }
}).value()

var questions = [{
  name: "problem",
  type: "list",
  message: "Please select a problem:",
  choices: choices
}];

function promptHandeler(answer) {
  var problem = require(answer.problem).default;
  problem(inquirer, () => { inquirer.prompt( questions, promptHandeler); } );
}

console.log("Type exit at any time to return to to this menu");
inquirer.prompt( questions, promptHandeler);
