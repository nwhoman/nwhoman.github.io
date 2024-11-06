'use strict';
const bodyParser = require('body-parser');

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  app.use(bodyParser.json());
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    //convertHandler.getNum(req);
    res.json({name: req.body} )
  })
};
