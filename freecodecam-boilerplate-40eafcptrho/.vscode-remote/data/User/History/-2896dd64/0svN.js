const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('correctly read a whole number input', function () {
        assert.equal(convertHandler.getNum('3467km'), 3467);
        assert.equal(convertHandler.getNum('3-467km'), 'invalid number');
        assert.equal(convertHandler.getNum('3..467km'), 'invalid number');
        assert.equal(convertHandler.getNum('-3467km'), 'invalid number');
        assert.equal(convertHandler.getNum('1/3/467km'), 'invalid number');
        assert.equal(convertHandler.getNum('/13467km'), 'invalid number');
      });
    test('correctly read a decimal number input', function () {
        assert.equal(convertHandler.getNum('1.13467km'), 1.13467);
      });
    test('correctly read a fractional input', function () {
        assert.equal(convertHandler.getNum('1/13467km'), 1/13467);
    });
    test('should correctly read a fractional input with a decimal', function () {
        assert.equal(convertHandler.getNum('1.134/67km'), 1.134/67);
    });
    test('should correctly read a fractional input with a decimal', function () {
        assert.equal(convertHandler.getNum('1.134/67km'), 1.134/67);
    });
    test('should correctly return an error on a double-fraction', function () {
        assert.equal(convertHandler.getNum('1/134/67km'), 'invalid number');
    });
    test('should correctly default to a numerical input of 1 when no numerical input is provided', function () {
        assert.equal(convertHandler.convert(1, 'gal'),  3.78541);
        assert.equal(convertHandler.convert(1, 'L'),  0.26417);
        assert.equal(convertHandler.convert(1, 'kg'),  2.20462);
        assert.equal(convertHandler.convert(1, 'lbs'),  0.45359);
        assert.equal(convertHandler.convert(1, 'km'),  0.62137);
        assert.equal(convertHandler.convert(1, 'mi'),  1.60934);

    });
    test('should correctly read each valid input unit', function () {
        assert.equal(convertHandler.getUnit('1/13467Gal'), 'gal');
        assert.equal(convertHandler.getUnit('1/13467km'), 'km');
        assert.equal(convertHandler.getUnit('1/13467mi'), 'mi');
        assert.equal(convertHandler.getUnit('1/13467L'), 'L');
        assert.equal(convertHandler.getUnit('1/13467l'), 'L');
        assert.equal(convertHandler.getUnit('1/13467kg'), 'kg');
        assert.equal(convertHandler.getUnit('1/13467lbs'), 'lbs');
    });
    test(' should correctly return an error for an invalid input unit', function () {
        assert.equal(convertHandler.getUnit('1/13467gal '), 'invalid unit')
        assert.equal(convertHandler.getUnit('1/13467gal6'), 'invalid unit')
        assert.equal(convertHandler.getUnit('1/13467gk'), 'invalid unit')
        assert.equal(convertHandler.getUnit('1/13467lvs'), 'invalid unit')
        assert.equal(convertHandler.getUnit('1/13467'), 'invalid unit')

    });
    test('Return Units', function () {
        assert.equal(convertHandler.getReturnUnit('L'), 'gal');
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');

    });
    test('Spell out Units', function () {
        assert.equal(convertHandler.spellOutUnit('L'), 'liters');
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    });
    
    test('Return string', function () {
        assert.equal(convertHandler.getString(3, 'km', 1.86412, 'mi'), '3 kilometers converts to 1.86412 miles')
    });
});