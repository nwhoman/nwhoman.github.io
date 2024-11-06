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
            //assert.equal(res.body.name, 'Cristoforo');
            //assert.equal(res.body.surname, 'Colombo');
            done();
          });
      });
});
