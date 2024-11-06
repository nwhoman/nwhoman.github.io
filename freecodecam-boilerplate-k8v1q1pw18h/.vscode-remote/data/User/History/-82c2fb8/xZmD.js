require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true,
        useUnifiedTopology: true 
     }
);

const db = mongoose.connection;

const bookSchema = mongoose.Schema({
    book_title: {type: String, required: true},
    comments: [{type: String}]
});

const bookModel = mongoose.model('book', bookSchema);

module.exports = function () {
    this.createBook = async function(data) {
        console.log(data)
        const book = new bookModel({
            book_title: data.title,
        });
        book.save();
        return book;
    };
    this.deleteBook = async function (_id) {
        
    }
}