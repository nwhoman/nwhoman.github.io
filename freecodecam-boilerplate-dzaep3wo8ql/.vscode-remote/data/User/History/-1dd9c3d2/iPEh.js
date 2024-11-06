class SudokuSolver {

  validate(puzzleString) {
    /*puzzleString = {
    puzzle: '',
    coordinate: '',
    value: ''
    }
    errors:
    { error: 'Required field(s) missing' }
    { error: 'Invalid coordinate'}
    { error: 'Invalid value' }
    { error: 'Invalid characters in puzzle' }
    { valid: false, "conflict": [ "row" ] }
    valid:
    { valid: 'true' }*/
    // check for empty input
    if (puzzleString.coordinate == null && puzzleString.value == null) {
      if ( !puzzleString.puzzle) {
        return { error: 'Required field missing' }
      }
      else if (puzzleString.puzzle.length !== 81) {
        return { error: 'Expected puzzle to be 81 characters long' }
      }
      // check puzzle input values
      else if (!puzzleString.puzzle.match(/^[1-9\.]*$/g)) {
        return { error: 'Invalid characters in puzzle' }
      } else {
        return { valid: 'true' }
      }
    }
    if ( !puzzleString.value || !puzzleString.coordinate || !puzzleString.puzzle ) {
      return { error: 'Required field(s) missing' }
    }
    // check puzzle input length
    else if (puzzleString.puzzle.length !== 81) {
      return { error: 'Expected puzzle to be 81 characters long' }
    }
    // check puzzle input values
    else if (!puzzleString.puzzle.match(/^[1-9\.]*$/g)) {
      return { error: 'Invalid characters in puzzle' }
    }
    
    if (puzzleString.value && puzzleString.coordinate){
      // check coordinate input
      if (puzzleString.coordinate.length !== 2 || !puzzleString.coordinate.match(/^[a-i][1-9]$/i)) {
        return { error: 'Invalid coordinate' }
      }
      // check value numeric input
      else if (puzzleString.value.length > 1 || !puzzleString.value.match(/[1-9]/)) {
        return { error: 'Invalid value' }
      } else {
        const row = puzzleString.coordinate[0];
        const column = puzzleString.coordinate[1]-1;
        return this.checkCurrentCell(puzzleString.puzzle, row, column, puzzleString.value)
      }
    }
  }
  checkCurrentCell(puzzleString, row, column, value) {
    let errors = [];
    const alphas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    let rowValue = alphas.indexOf(row.toLowerCase());
    const index = indexFrom(rowValue, column);
    if (puzzleString[index] === value) {
      return errors;
    } else {
      return this.checkRowPlacement(puzzleString, rowValue, column, value, errors)
    }
  }

  checkRowPlacement(puzzleString, row, column, value, errors) {
    let rowString = puzzleString.slice(row * 9, row * 9 + 9);
    for (let i=0; i<9; i++){
      if (rowString[i] === value) {
        errors.push('row')
        console.log(errors)

      }
    }
    return this.checkColPlacement(puzzleString, row, column, value, errors)
  }

  checkColPlacement(puzzleString, row, column, value, errors) {
    for (let i=0; i<9; i++){
      if (puzzleString[i*9 + column] === value) {
        errors.push('column')
        console.log(errors)

      }
    }
    return this.checkRegionPlacement(puzzleString, row, column, value, errors)
  }

  checkRegionPlacement(puzzleString, row, column, value, errors) {
    let row_start = Math.floor((row) / 3) * 3
    let col_start = Math.floor((column) / 3) * 3
        for (let i=row_start; i < row_start + 3; i++) {
          for (let j=col_start; j < col_start + 3; j++) {
            if (puzzleString[i*9 + j] === value) {
              errors.push('region')
              console.log(errors)
            }
          }
        }
    return errors
  }

  solve(puzzleString) {
    let matrix = setMatrix(puzzleString.puzzle)
    
    let backtrack = 0
    if (solveHelper1()){
      return { puzzle: matrix, backtrack: backtrack };
    } else {
      console.log('unsolved', matrix)
      return { puzzle: 'unsolved', backtrack: 0 };
      
    }

    function solveHelper(){
      for (let i=0; i<matrix.length; i++){
        
        if (!matrix[i]){                          //gives cells with 0

          let choices = getMoves(matrix, i);      // get possible moves
          //console.log(choices)
          if (choices == null) {
            return true;
          }
          for (let m of choices) {
            matrix[i] = m;
            if (solveHelper()) return true;
          }
          matrix[i] = 0;
          backtrack++;
          return false;
        }
      }
      return true;
      
    }
    function solveHelper1(){
      let { moves, index } = getMoves1(matrix);
      //console.log(moves, index, matrix)
      if (index == null) return true;
      for (let m of moves) {
        matrix[index] = m;
        if (solveHelper1()) return true;
      }
      matrix[i] = 0;
      backtrack++;
      return false;
    }

  }
}
function indexTo(index){
  return { row: Math.floor(index / 9), col: index % 9 }

}
function indexFrom(row, col){
 return row * 9 + col
}
function setMatrix(puzzle) {
  let matrix = [];
  let j = 0;
  for (let i = 0; i < puzzle.length; i++){
    if (puzzle[i] != '.'){
      matrix.push(Number.parseInt(puzzle[i]));
    } else {
      matrix.push(0)
    }
  }
  return matrix;

}
function checkRow(matrix, row, col, value){
  for (let i=0; i<9; i++){
    if (matrix[indexFrom(row, i)] === value) {
      return false;
    }
  }
  return true
}
function checkCol(matrix, row, col, value){
  for (let i=0; i<9; i++){
    if (matrix[indexFrom(i, col)] === value) {
      return false;
    }
  }
  return true
}
function checkArea(matrix, row, col, value){
  let row_start = Math.floor((row) / 3) * 3
    let col_start = Math.floor((col) / 3) * 3
        for (let i=row_start; i < row_start + 3; i++) {
          for (let j=col_start; j < col_start + 3; j++) {
            if (matrix[indexFrom(i, j)] === value) {
              return false;
            }
          }
        }
  return true;
}
function isValid(matrix, index, value){
  let { row, col } = indexTo(index)
  if (checkRow(matrix, row, col, value) && checkCol(matrix, row, col, value) && checkArea(matrix, row, col, value)){
    return true;
  } else {
    return false;
  }
}
function getMoves(matrix, index){
  let choices = [];
  for (let i=1; i<10; i++){
 
      if (isValid(matrix, index, i)){
        choices.push(i)
      }
    
  }
  return choices;
}
function getMoves1(matrix){
  let index, bestLen = 100;
  let moves = []
  for (let i=0; i<matrix.length; i++){
    if (!matrix[i]){
      let m = getMoves(matrix, i);
      //console.log(m.length, i, m)
      if (m.length < bestLen){

        bestLen = m.length;
        index = i;
        moves = m;
        //console.log(bestLen, i, m)
        if (bestLen == 0) break;
      }
    }
  }
  return { moves, index };
}

module.exports = SudokuSolver;
