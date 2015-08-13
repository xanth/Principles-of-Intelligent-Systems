import { Graph, generateLinks } from './graph';

export const metadata = {
  week: 2,
  description: "Week 2 - Base Graph Class"
};

export default function (inquirer, cb){
  let isNumber = (v) => { return !isNaN(v) || "Please specify a number" };
  var questions = [
    {
      name: "numberOfCities",
      type: "input",
      message: "Number of Cities:",
      validate: isNumber
    },
    {
      name: "numberOfLinks",
      type: "input",
      message: "Number of Links:",
      validate: isNumber
    },
    {
      name: "links",
      type: "input",
      message: "Links or exit <source> <dest> <cost>:",
      validate: (value) => {
        var valid = value == 'exit' || value.split(' ').length % 3 === 0;
        return valid || "Please specify links as per the format";
      }
    }
  ];

  function promptHandeler(answer) {
    if(answer.links == 'exit'){
      cb();
    } else {
      let links = generateLinks(answer.links);
      let graph = new Graph(...links)
      graph.printNodes();
      graph.printLinks();
      inquirer.prompt(questions, promptHandeler);
    }
  }
  inquirer.prompt(questions, promptHandeler);
}
