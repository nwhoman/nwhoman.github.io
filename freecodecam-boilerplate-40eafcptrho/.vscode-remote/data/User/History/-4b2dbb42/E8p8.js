const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Convert a valid input such as 10L: GET request to /api/convert', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert')
          .query({ input: "10L" })
          .end(function (err, res) {
            console.log(res.status)
            assert.equal(res.status, 200);
            console.log(typeof res.type)
            assert.equal(res.type, 'application/json');
            console.log(res.body)
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.returnNum, 2.64172);
            done();
          });
      });
    test('Convert an invalid input such as 32g: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert')
            .query({ input: "32g" })
            .end(function (err, res) {
            console.log(res.status)
            assert.equal(res.status, 200);
            console.log(typeof res.type)
            assert.equal(res.type, 'text/html');
            console.log(res.text)
            assert.equal(res.text, 'invalid unit');
            done();
        });
    });
    test('Convert an invalid number such as 3/7..2/4kg: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert')
            .query({ input: "3/7..2/4kg" })
            .end(function (err, res) {
            console.log(res.status)
            assert.equal(res.status, 200);
            console.log(typeof res.type)
            assert.equal(res.type, 'text/html');
            console.log(res.text)
            assert.equal(res.text, 'invalid number');
            done();
        });
    });
    test('Convert an invalid number AND unit such as 3/7..2/4kilomegagram: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert')
            .query({ input: "3/7..2/4kilomegagram" })
            .end(function (err, res) {
            console.log(res.status)
            assert.equal(res.status, 200);
            console.log(typeof res.type)
            assert.equal(res.type, 'text/html');
            console.log(res.text)
            assert.equal(res.text, 'invalid number and unit');
            done();
        });
    });
    test('Convert with no number such as kg: GET request to /api/convert', function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert')
            .query({ input: "km" })
            .end(function (err, res) {
            console.log(res.status)
            assert.equal(res.status, 200);
            console.log(typeof res.type)
            assert.equal(res.type, 'application/json');
            console.log(res.body)
            assert.equal(res.body, {
                initNum: 1,
                initUnit: 'km',
                returnNum: 0.62137,
                returnUnit: 'mi',
                string: '1 kilometers converts to 0.62137 miles'
              });
            done();
        });
    });
});
