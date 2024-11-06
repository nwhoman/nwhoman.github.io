/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const BookModel = require('../book-model.js');

module.exports = function (app) {
  const bookModel = new BookModel();

  app.route('/api/books')
    .get(async function (req, res){
      if (!req.params._id){
        const books = await bookModel.getBooks();
        let bookArray = []
        for (i=0; i<books.length; i++){
          bookArray.push(books[i]);
        }
        return res.json(bookArray);
      }
      
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      if (title){
        const book = await bookModel.createBook(req.body);
        return res.json({
          _id: book._id,
          title: book.book_title,
        })
      } else {
        return res.json( 'missing required field title')
      }
    })
    
    .delete(async function(req, res){
      const result = await bookModel.deleteAllBooks()
      return res.json( 'complete delete successful')
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;
      if (bookid){
        const book = await bookModel.getBook(bookid);
        if (book.length > 0){
          return res.json({
            _id: book[0]._id,
            title: book[0].book_title,
            comments: book[0].comments
          })
        } else {
          return res.json( 'no book exists')
        }       
      } else {
        return res.json( 'missing required field id')
      }
      
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (comment){
        const book = await bookModel.getBook(bookid);
        if (book.length > 0){
          let comments = book[0].comments;
          comments.push(comment)
          const update = {
            book_title: book[0].book_title,
            comments: comments
          }
          const result = await bookModel.addComment(bookid, update)
          if (result.modifiedCount == 1){
            return res.json({
              _id: bookid,
              title: book[0].book_title,
              comments: comments
            })
          }
        } else {
          return res.json( 'no book exists')
        }
      } else {
        return res.json( 'missing required field comment')
      }
      
    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
  
      const result = await bookModel.deleteBook(bookid)
      if (result.deletedCount === 1){
        return res.json( 'delete successful')
      } else {
        return res.json( 'no book exists')
      }      
    });
  
};
