'use strict';
const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    const numPart = convertHandler.getNum(req.query.input);
    const unitPart = convertHandler.getUnit;
    const retUnit = convertHandler.getReturnUnit;
    const convNum = convertHandler.convert(numPart, unitPart);
    const retString = convertHandler.getString(numPart, unitPart, convNum, retUnit);
    
    
    res.send(retString);
  })
};
