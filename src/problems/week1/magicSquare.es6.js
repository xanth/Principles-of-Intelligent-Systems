const newArray = require(`${appRoot}/shared/helpers`).newArray;

export function magicSquare(size) {
  var state = newArray(size, size);
  var x = (size - 1) / 2
  var y = 0;
  var i = 1;
  state[y][x] = i++;
  while(i <= size ** 2){
    if(i === size ** 2 ){
      state[size - 1][(size - 1) / 2] = i++;
    } else if(i % size == 0){
      [x, y] = getPos(size - 1, x, y);
      state[y++][x] = i++;
      state[y][x] = i++;
    } else {
      [x, y] = getPos(size - 1, x, y)
      state[y][x] = i++;
    }
  }
  return state;
}

function getPos(max, posx, posy) {
  let newPosX = posx + 1 > max ? 0 : posx + 1;
  let newPosY = posy - 1 < 0 ? max : posy - 1;
  return [newPosX, newPosY];
}

export function output(state){
  for(var i = 0; i < state.length; i++){
    var row = "";
    for(var j = 0; j < state.length; j++){
      row += " " + (state[i][j] === null ? "0" : state[i][j]);
    }
    console.log(row);
  }
  console.log();
}

export function validate(size){
  return size % 2 === 1;
}
