const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('POST /api/check', function() {
      
        test('Test POST /api/check with missing puzzle', function(done) {
          chai.request(server)
          .post('/api/check')
          .send({
            coordinate: 'a1',
            value: '1'
            })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            goodId = res.body._id;
            assert.equal(res.body.title, 'test title ' + projectNumber);
            done();
          });
        });
        
        test('Test POST /api/books with no title given', function(done) {
          chai.request(server)
          .post('/api/books')
          .send({
            title: ''
          })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body, 'missing required field title');
            done();
          });
        });
      });

});

