const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookSchema = new Schema({

    bookTitle : {
        type : String,
        uppercase : true,   //it will always covert firstName to Uppercase
        required : true
    },
    author : {
        type : String,
        required : false  
    },
    bookId : {
        type : String,
        required : true,
        unique : true      //ensures this will have always unique value
    },
    publisher : {
        type : String,
        required : true
    },
    publishDate : {
        type : Date,
        required : true
    }
});

var book = mongoose.model('books',bookSchema);
module.exports = book;
