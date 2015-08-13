import *  as magicSquare from './magicSquare';

export const metadata = {
  week: 1,
  description: "Week 1 - Magic Square Problem"
};

export default function (inquirer, cb){
  var questions = [
    {
      name: "size",
      type: "input",
      message: "Magic square size or exit (odd):",
      validate: (value) => {
        var valid = value == 'exit' || magicSquare.validate(value);
        return valid || "Please enter an odd number";
      }
    }];

  function promptHandeler(answer) {
    if(answer.size == 'exit'){
      cb();
    } else {
      magicSquare.output(magicSquare.magicSquare(answer.size));
      inquirer.prompt(questions, promptHandeler);
    }
  }

  inquirer.prompt(questions, promptHandeler)
}
