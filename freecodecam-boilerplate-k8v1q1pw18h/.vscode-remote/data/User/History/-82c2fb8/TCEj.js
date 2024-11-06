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
    this.getBooks = async function () {
        const result = bookModel.find({});
        result.forEach(element => {
            console.log(element)
        });
        return [...result];
    }
    this.getBook = async function (_id) {
        const result = bookModel.find({ _id: _id});
        return result;
    }
    this.createBook = async function(data) {
        console.log(data)
        const book = new bookModel({
            book_title: data.title,
        });
        book.save();
        return book;
    };
    this.deleteBook = async function (_id) {
        const result = await bookModel.deleteOne({_id: _id});
        return result;
    };
    this.deleteAllBooks = async function () {
        const result = await bookModel.deleteMany();
        return result;
    };
}