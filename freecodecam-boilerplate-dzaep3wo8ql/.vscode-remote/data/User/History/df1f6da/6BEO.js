'use strict';

const { interfaces } = require('mocha');
const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const validInput = solver.validate(req.body)
      if (validInput.length === 81) {
        res.json({ valid: 'true' })
      } else {
        res.json(validInput)
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
        console.log(typeof solved.puzzle)
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
          res.json({ error: 'Puzzle cannot be solved' })
        }
      }
    });
};
