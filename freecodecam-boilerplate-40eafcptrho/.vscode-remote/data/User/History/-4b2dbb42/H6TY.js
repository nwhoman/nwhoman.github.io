const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Send {surname: "Colombo"}', function (done) {
        chai
          .request(server)
          .keepOpen()
          .put('/travellers')
          .send({surname: "Colombo"})
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.name, 'Cristoforo');
            assert.equal(res.body.surname, 'Colombo');
            done();
          });
      });
});
