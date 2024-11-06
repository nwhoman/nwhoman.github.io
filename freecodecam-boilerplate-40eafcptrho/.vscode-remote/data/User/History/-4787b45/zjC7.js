'use strict';
const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    //convertHandler.getNum(req.body.data);
    console.log(req.body.result)
    res.json({name: req.body.result} )
  })
};