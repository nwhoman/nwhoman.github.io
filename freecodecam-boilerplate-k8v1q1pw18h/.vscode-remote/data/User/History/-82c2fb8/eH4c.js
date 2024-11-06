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
        for (i=0; i < result.length; i++){
            data.push({
                _id: result[i]._id,
                title: result[i].book_title,
                comments: result[i].comments,
                commentcount: result[i].comments.length
        })
        }
        return data;
    }
    this.getBook = async function (_id) {
        const result = await bookModel.find({ _id: _id}).exec();
        return result;
    }
    this.createBook = async function(data) {
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
    this.addComment = async function (_id, update) {
        const result = await bookModel.updateOne({_id: _id}, update);
        return result;
    }
}