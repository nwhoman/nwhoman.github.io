'use strict';

const { interfaces } = require('mocha');
const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const validInput = solver.validate(req.body)
      console.log(validInput.length)
      if (validInput.length === 81) {
        
        res.json({ valid: 'true' })
      } else {
        res.json(validInput)
      }
      /*if (validInput) {
        console.log(validInput)
        return res.json({input: 'good'})
        // start checking entry
      } else {
        return res.json({input: 'good'})//validInput
      }*/
      

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const validInput = solver.validate(req.body)
      console.log(validInput)
      const solved = solver.solve(req.body)
     
        let str = ''
        solved.puzzle.forEach((item) => {
          str += item;
        })
        console.log(str)
        res.json({ solution: str ,
          backtrack: solved.backtrack
        })
      
      
    });
};
