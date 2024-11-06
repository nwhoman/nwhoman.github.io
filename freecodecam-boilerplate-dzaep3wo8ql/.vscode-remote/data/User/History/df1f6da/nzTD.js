'use strict';

const { interfaces } = require('mocha');
const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const validInput = solver.validate(req.body)
      if (validInput.length === 0) {
        res.json({ valid: true })
      } else if (validInput.error) {
        res.json(validInput)
      } else {
        res.json({ "valid": false, "conflict": validInput })
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const validInput = solver.validate(req.body)
      console.log(validInput, validInput.valid)
      if (!validInput.valid) {
        res.json(validInput)
      } else {
        const solved = solver.solve(req.body)
        if (typeof solved.puzzle !== String){
          let str = ''
          solved.puzzle.forEach((item) => {
            str += item;
          })
          console.log(str)
          res.json({ solution: str ,
            backtrack: solved.backtrack
          })
        } else {
          console.log('invalid', solved)
          res.json({ error: 'Puzzle cannot be solved' })
        }
      }
    });
};
