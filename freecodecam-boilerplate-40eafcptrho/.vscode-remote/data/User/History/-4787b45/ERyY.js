'use strict';
const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    
    console.log(convertHandler.getNum(req.query.input))
    res.send(convertHandler.getNum(req.query.input))
  })
};
