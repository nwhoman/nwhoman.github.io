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
            assert.deepEqual(res.body, { error: 'Required field(s) missing' });
            done();
          });
        });
        
        test('Test POST /api/check with missing coordinate', function(done) {
            chai.request(server)
            .post('/api/check')
            .send({
              puzzle: '82..4..6...16..89...98315.749.157..............3..4...96.415..81..7632..3...28.51',  
              coordinate: '',
              value: '1'
              })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type, 'application/json');
              assert.deepEqual(res.body, { error: 'Required field(s) missing' });
              done();
            });
          });

          test('Test POST /api/check with missing value', function(done) {
            chai.request(server)
            .post('/api/check')
            .send({
              puzzle: '82..4..6...16..89...98315.749.157..............3..4...96.415..81..7632..3...28.51',  
              coordinate: 'a3',
              value: ''
              })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type, 'application/json');
              assert.deepEqual(res.body, { error: 'Required field(s) missing' });
              done();
            });
          });

          test('Test POST /api/check with bad puzzle', function(done) {
            chai.request(server)
            .post('/api/check')
            .send({
              puzzle: '82..4..6...16..89...98315.749.157..............3..4...96.415..81..7632..3...28.51',  
              coordinate: 'a3',
              value: ''
              })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.type, 'application/json');
              assert.deepEqual(res.body, { error: 'Required field(s) missing' });
              done();
            });
          });
      });

});

