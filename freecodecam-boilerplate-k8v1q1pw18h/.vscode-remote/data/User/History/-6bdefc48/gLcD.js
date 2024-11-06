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
      
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      if (!req.params._id){
        const books = await bookModel.getBooks();
        let bookArray = []
        for (i=0; i<books.length; i++){
          bookArray.push(books[i]);
          console.log(books[i])
        }
        return res.json(bookArray);
      }
      
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      console.log(req.body)
      if (title){
        const book = await bookModel.createBook(req.body);
        return res.json({
          _id: book._id,
          title: book.book_title,
        })
      } else {
        return res.json( '{ missing required field title }')
      }
      //response will contain new book object including atleast _id and title
      
    })
    
    .delete(async function(req, res){
      console.log('delete all books')
      //if successful response will be 'complete delete successful'
      const result = await bookModel.deleteAllBooks()
      return res.json( '{ complete delete successful }')
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;
      console.log(req.params.id)
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      const book = await bookModel.getBook(bookid);
      //console.log(book, book[0].book_title, book[0].comments)
      return res.json({
        _id: book[0]._id,
        title: book[0].book_title,
        comments: book[0].comments
      })
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      
      //json res format same as .get
      const book = await bookModel.getBook(bookid);
      
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
    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      //if successful response will be 'complete delete successful'
      const result = await bookModel.deleteBook(bookid)
      console.log('delete one book', result)
      return res.json( '{ delete successful }')
    });
  
};
