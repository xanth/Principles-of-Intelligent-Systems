export function newArray(...dimens) {
  let arrLength = dimens[0]
  var arr = new Array(arrLength);
  dimens.shift();
  for (var i = 0; i < arrLength; i++){
    arr[i] = dimens[0] !== undefined ? newArray(...dimens) : null;
  }
  return arr;
}
