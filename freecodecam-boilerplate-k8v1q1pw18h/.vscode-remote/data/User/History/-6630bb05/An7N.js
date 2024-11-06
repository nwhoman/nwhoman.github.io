/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const projectNumber = (Math.random()*10000).toFixed(0);
const badId = '5871dda29faedc3491ff93bb';
let goodId = ''
chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({
          title: 'test title ' + projectNumber
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


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .get('/api/books')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.isArray(res.body, 'return value should be an array');
          done();
        })
      });            
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/' + badId)
        
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body, 'no book exists');
          done();
        })
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
        .get('/api/books/' + goodId)
        
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.isObject(res.body, 'return value should be an array');
          done();
        })
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        const comment = 'test comment ' + (Math.random()*10000).toFixed(0)
        console.log('good id', goodId)
        chai.request(server)
        .post('/api/books/' + goodId)
        .send({
          comment: comment
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          console.log('response', res.body)
          assert.equal(res.body._id, goodId, 'ID should be equal');
          assert.equal(res.body.comments[0], comment)
          done()
        })
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        const comment = ''
        chai.request(server)
        .post('/api/books/' + goodId)
        .send({
          comment: comment
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          console.log('response', res.body)
          assert.equal(res.body, 'missing required field comment')
          done()
        })
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        const comment = 'test comment ' + (Math.random()*10000).toFixed(0)
        const _id2 = goodId.slice(1) + goodId.slice(0, 1)
        console.log('good id', _id2)
        chai.request(server)
        .post('/api/books/' + _id2)
        .send({
          comment: comment
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          console.log('response', res.body)
          assert.equal(res.body, 'no book exists')
          done()
        })
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
        .delete('/api/books/' + goodId)
        .send({
          comment: comment
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          console.log('response', res.body)
          assert.equal(res.body, 'missing required field comment')
          done()
        })
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        //done();
      });

    });

  });

});
