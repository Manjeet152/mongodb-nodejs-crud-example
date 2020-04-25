const express = require('express');
const  app = express();
const mongoose = require('mongoose');
const book = require('./schema');
const port = 3000;

app.use(express.json())
mongoose.connect('mongodb://localhost:27017/TestDB', { useNewUrlParser: true,useUnifiedTopology: true } );
var db = mongoose.connection;
db.on('error', ()=>{
    console.error('Unable to connect MongoDB!')
});
db.once('open', ()=> {
    console.log('Connected to mongoDB!');
});

app.get('/', (req,res) =>{          //get all books info from db
    book.find({},(err,doc)=>{
        if(doc)
            res.json({"Available books" : doc});
        else {
            res.err(err);
        }
    })
});

app.post('/addbook',(req,res)=>{        //add a new book
    var bookObj = new book({
        bookTitle : req.body.booktitle,
        author : req.body.author,
        bookId : req.body.bookid,
        publisher : req.body.publisher,
        publishDate : req.body.publishdate
    })
    bookObj.save((err)=>{
        if(err){
        console.log(err);
        res.send('Unable to save book data!');
        }
        else
        res.send('book data saved successfully!');
    })
});

app.get('/getbookDetails/:bookid',(req,res)=>{              //get a book details
    book.findOne({bookId : req.params.bookid},{},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.status(404).send('Ops!Detail not found');
        }
    })
});

app.post('/update',(req,res)=>{          //update a book data
    book.findOneAndUpdate({bookId : req.body.bookid},{$set:{publisher : req.body.publisher}},(err,doc)=>{
        if(doc)
            res.send('Book updated successfully!');
        else {
            res.err(err.message);
        }
    })
});

app.delete('/deletebook/:bookid',(req,res)=>{           //delete a perticular book
    book.findOneAndRemove({bookId : req.params.bookid},{},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.status(404).send('Ops! Book not found');
        }
    })
});

app.listen(port, (err) =>{
    if(!err)
    console.log('server started running on:' + port);
    else
    console.log('unable to start server');
});

