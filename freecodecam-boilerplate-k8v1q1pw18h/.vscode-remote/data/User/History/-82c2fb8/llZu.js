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
        let data = []
        const result = await bookModel.find();
        console.log(result)
        for (i=0; i < result.length; i++){
            console.log(result[i])
        }
        return result;
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