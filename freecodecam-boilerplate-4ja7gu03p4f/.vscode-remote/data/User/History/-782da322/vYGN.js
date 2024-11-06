const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const projectNumber = 

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Create an issue with every field: POST request to /api/issues/{project}', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/issues/neal_test')
          .send({ 
            project: 'neal_test',
            issue_title: 'data.issue_title',
            issue_text: 'data.issue_text',
            created_on: Date.now(),
            updated_on: Date.now(),
            created_by: 'neal',
            assigned_to: 'wyatt',
            open: true,
            status_text: 'in progress'
        })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.issue_title, 'data.issue_title');
            assert.equal(res.body.issue_text, 'data.issue_text');
            done();
          });
      });
      test('Create an issue with only required fields: POST request to /api/issues/{project}', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/issues/neal_test')
          .send({ 
            project: 'neal_test',
            issue_title: 'data.issue_title',
            issue_text: 'data.issue_text',
            created_by: 'neal',
        })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.issue_title, 'data.issue_title');
            assert.equal(res.body.issue_text, 'data.issue_text');
            done();
          });
      });
      test('Create an issue with missing required fields: POST request to /api/issues/{project}', function (done) {
        chai
          .request(server)
          .keepOpen()
          .post('/api/issues/neal_test')
          .send({ 
            project: 'neal_test',
            issue_text: 'data.issue_text',
            created_by: 'neal',
        })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.deepEqual(res.body, { error: 'required field(s) missing' });
            done();
          });
      });
      test('View issues on a project: GET request to /api/issues/{project}', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/issues/neal_test')
          .send({ 
            project: 'neal_test',
            issue_text: 'data.issue_text',
            created_by: 'neal',
        })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.deepEqual(res.body, { error: 'required field(s) missing' });
            done();
          });
      });
});
