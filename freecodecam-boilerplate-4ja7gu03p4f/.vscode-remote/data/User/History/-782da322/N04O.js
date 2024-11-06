const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Create an issue with every field: POST request to /api/issues/{project}', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/issues/neal_test')
          .query({ 
            project: 'neal_test',
            issue_title: 'data.issue_title',
            issue_text: 'data.issue_text',
            created_on: this.formatDate(),
            updated_on: this.formatDate(),
            created_by: 'neal',
            assigned_to: 'wyatt',
            open: true,
            status_text: 'in progress'
        })
          .end(function (err, res) {
            console.log(res.status)
            assert.equal(res.status, 200);
            console.log(typeof res.type)
            assert.equal(res.type, 'application/json');
            console.log(res.body)
            assert.equal(res.body.issue_title, 'data.issue_title');
            assert.equal(res.body.issue_text, 'data.issue_text');
            done();
          });
      });
});
