const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver  = new Solver();;

suite('Unit Tests', () => {
    test('check missing inputs', function () {
        assert.equal(solver.validate({
            puzzle: '',
            coordinate: 'a1',
            value: '1'
            }), "{ error: 'Required field(s) missing' }", 'missing puzzle input');
        assert.equal(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: '',
            value: '1'
            }), "{ error: 'Required field(s) missing' }", 'missing coordinate input');
        assert.equal(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'a1',
            value: ''
            }), "{ error: 'Required field(s) missing' }", 'missing value input');
      });
    test('check valid value entries', function () {
        assert.equal(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'a1',
            value: '0'
            }), "{ error: 'Invalid value' }", 'missing value input');
        assert.equal(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'a1',
            value: '10'
            }), "{ error: 'Invalid value' }", 'missing value input');
        assert.equal(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'a1',
            value: 'a1'
            }), "{ error: 'Invalid value' }", 'missing value input');
        });
    test('check valid coordinate entries', function () {
        assert.equal(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'aq',
            value: '1'
            }), "{ error: 'Invalid coordinate' }", 'missing value input');
        assert.equal(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'j1',
            value: '2'
            }), "{ error: 'Invalid coordinate' }", 'missing value input');
        assert.equal(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'a0',
            value: '3'
            }), "{ error: 'Invalid coordinate' }", 'missing value input');
    });
});
