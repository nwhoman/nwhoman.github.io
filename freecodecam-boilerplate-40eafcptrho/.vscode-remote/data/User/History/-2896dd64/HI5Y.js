const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('Invalid numbers', function () {
        assert.equal(convertHandler.getNum('34.5.67km'), 'Invalid Number', 'Numbers are coerced into strings with ==');
        assert.equal(convertHandler.getNum('3-467km'), 'Invalid Number');
        assert.equal(convertHandler.getNum('3..467km'), 'Invalid Number');
        assert.equal(convertHandler.getNum('-3467km'), 'Invalid Number');
        assert.equal(convertHandler.getNum('1/3/467km'), 'Invalid Number');
        assert.equal(convertHandler.getNum('/13467km'), 'Invalid Number');
        
      });
    test('Valid numbers', function () {
        assert.equal(convertHandler.getNum('1/13467km'), 0.00007);
        assert.equal(convertHandler.getNum('1.13467km'), 1.13467);
        assert.equal(convertHandler.getNum('1.134/67km'), 0.01693);
        assert.equal(convertHandler.getNum('10/0.5km'), 20);
      });
    test('Valid Units', function () {
        assert.equal(convertHandler.getUnit('1/13467gal'), 'gal');
        assert.equal(convertHandler.getUnit('1/13467km'), 'km');
        assert.equal(convertHandler.getUnit('1/13467mi'), 'mi');
        assert.equal(convertHandler.getUnit('1/13467L'), 'L');
        assert.equal(convertHandler.getUnit('1/13467l'), 'L');
        assert.equal(convertHandler.getUnit('1/13467kg'), 'kg');
        assert.equal(convertHandler.getUnit('1/13467lbs'), 'lbs');
    });
    test('Invalid Units', function () {
        assert.equal(convertHandler.getUnit('1/13467gal '), 'Invalid Units')
        assert.equal(convertHandler.getUnit('1/13467gal6'), 'Invalid Units')
        assert.equal(convertHandler.getUnit('1/13467gk'), 'Invalid Units')
        assert.equal(convertHandler.getUnit('1/13467lvs'), 'Invalid Units')
        assert.equal(convertHandler.getUnit('1/13467'), 'Invalid Units')

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
    test('Convert Values', function () {
        assert.equal(convertHandler.convert(1, 'gal'),  3.78541);
        assert.equal(convertHandler.convert(1, 'L'),  0.26417);
        assert.equal(convertHandler.convert(1, 'kg'),  0.45359);
        assert.equal(convertHandler.convert(1, 'lbs'),  2.20462);
        assert.equal(convertHandler.convert(1, 'km'),  0.62137);
        assert.equal(convertHandler.convert(1, 'mi'),  1.60934);

    });
    test('Return string', function () {
        assert.equal(convertHandler.getString(3, 'km', 1.86412, 'mi'), '3 kilometers converts to 1.86412 miles')
    });
});