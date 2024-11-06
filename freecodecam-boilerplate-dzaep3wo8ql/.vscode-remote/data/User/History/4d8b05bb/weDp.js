const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver  = new Solver();;

suite('Unit Tests', () => {
    test('check missing puzzle', function () {
        assert.deepEqual(solver.validate({
            coordinate: 'a1',
            value: '1'
            }), { error: 'Required field missing' }, 'missing puzzle input');
    });
    test('check missing coordinate', function () {
        assert.deepEqual(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: '',
            value: '1'
            }), { error: 'Required field(s) missing' }, 'missing coordinate input');
        });
    test('check missing value', function () {    
        assert.deepEqual(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'a1',
            value: ''
            }), { error: 'Required field(s) missing' }, 'missing value input');
      });
    test('check valid value entries-0', function () {
        assert.deepEqual(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'a1',
            value: '0'
            }), { error: 'Invalid value' }, 'bad value 0 input');
        });
    test('check valid value entries-too long', function () {
        assert.deepEqual(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'a1',
            value: '10'
            }), { error: 'Invalid value' }, 'value 2 digits input');
        });
    test('check valid value entries-alpha', function () {
        assert.deepEqual(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'a1',
            value: 'a1'
            }), { error: 'Invalid value' }, 'alpha character in value input');
        });
    test('check valid coordinate entries-double alpha', function () {
        assert.deepEqual(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'aq',
            value: '1'
            }), { error: 'Invalid coordinate' }, 'no numeric in coordinate input');
        });
    test('check valid coordinate entries-bad alpha', function () {
        assert.deepEqual(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'j1',
            value: '2'
            }), { error: 'Invalid coordinate' }, 'bad alpha in coordinate input');
        });
    test('check valid coordinate entries-bad number', function () {
        assert.deepEqual(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'a0',
            value: '3'
            }), { error: 'Invalid coordinate' }, 'bad number 0 in coordinate input');
        });
    test('check valid coordinate entries-too long', function () {
        assert.deepEqual(solver.validate({
            puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'a10',
            value: '3'
            }), { error: 'Invalid coordinate' }, 'bad number 10 in coordinate input');
    });
    test('check valid puzzle entries-too short', function () {
        assert.deepEqual(solver.validate({
            puzzle: '.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'a1',
            value: '1'
            }), { error: 'Expected puzzle to be 81 characters long' }, 'puzzle input too short');
        });
    test('check valid puzzle entries-too long', function () {
        assert.deepEqual(solver.validate({
            puzzle: '1..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'a6',
            value: '2'
            }), { error: 'Expected puzzle to be 81 characters long' }, 'puzzle input too long');
        });
    test('check valid puzzle entries-bad number 0', function () {
        assert.deepEqual(solver.validate({
            puzzle: '0.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'c4',
            value: '3'
            }), { error: 'Invalid characters in puzzle' }, 'bad number 0 in puzzle input');
        });
    test('check valid puzzle entries-bad alpha', function () {
        assert.deepEqual(solver.validate({
            puzzle: 'a.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
            coordinate: 'b3',
            value: '4'
            }), { error: 'Invalid characters in puzzle' }, 'bad alpha character [a-z] in puzzle input');
    });
});
