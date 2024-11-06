'use strict';
const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    const numPart = convertHandler.getNum(req.query.input);
    const unitPart = convertHandler.getUnit(req.query.input);
    const retUnit = convertHandler.getReturnUnit(unitPart);
    const convNum = convertHandler.convert(numPart, unitPart);
    const retString = convertHandler.getString(numPart, unitPart, convNum, retUnit);
    
    if (numPart == 'invalid number' && unitPart == ) {
      res.send('invalid number')
    } else if ()
    res.send({
      initNum: numPart,
      initUnit: unitPart,
      returnNum: convNum,
      returnUnit: retUnit,
      string: retString
    });
  })
};
