'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const Datastore = require('@google-cloud/datastore');
const projectId = 'booktracks';
const cors = require('cors');
require('dotenv').config();

const datastore = new Datastore({
  projectId: projectId,
});

app.use(bodyParser.json());
app.use(cors());

var Author = require('./api/models/authorModel');
var Book = require('./api/models/bookModel');
var Director = require('./api/models/directorModel');
var Film = require('./api/models/filmModel');
var Topic = require('./api/models/topicModel');
var Quote = require('./api/models/quoteModel');
//var User = require('./api/models/userModel');

//Connect to mongoose
mongoose.connect(config.getDbConnectionString());
var db = mongoose.connection;

app.get('/', (req, res) => {
  res.json('Here we are');
});

//authors
app.get('/authors', (req, res) => {
  const query = datastore.createQuery('Author');

  datastore
    .runQuery(query)
    .then(results => {
      const authors = results[0];
      authors.forEach(author => {
        const authorKey = author[datastore.KEY];
        var newAuthor = {"oldId":authorKey.id.toString(), "name":author.name, "namelc":author.namelc, "userId":author.userId};
        Author.create(newAuthor, function(err, author) {
          if (err) {
            throw err;
          }
        });
      });
      res.json(authors);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
    console.log('waiting to return json');
});

//books
app.get('/books', (req, res) => {

  const query = datastore.createQuery('Book');

  datastore
    .runQuery(query)
    .then(results => {
        const books = results[0];
        books.forEach(book => {
            const bookKey = book[datastore.KEY];
            if (book.topicId) {
                var strTopic = book.topicId.toString();
                var topicDesc = book.topicDesc;
            }
            var newBook = {
              "oldId":bookKey.id.toString(),
              "authorId":book.authorId.toString(),
              "authorName":book.authorName,
              "createDate":book.createDate,
              "genre":book.genre,
              "notes":book.notes,
              "rating":book.rating,
              "readDate":book.readDate,
              "title":book.title,
              "topicId":strTopic,
              "topicDesc":topicDesc,
              "userId":book.userId
            };
            Book.create(newBook, function(err, book) {
              if (err) {
                throw err;
              }
            });
            console.log('book ', book.title);
        });
        res.json(books);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
});

//directors
app.get('/directors', (req, res) => {
  const query = datastore.createQuery('Director');

  datastore
    .runQuery(query)
    .then(results => {
      const directors = results[0];
      directors.forEach(director => {
        const directorKey = director[datastore.KEY];
        var newDirector = {"oldId":directorKey.id.toString(), "name":director.name, "namelc":director.namelc, "userId":director.userId};
        Director.create(newDirector, function(err, director) {
          if (err) {
            throw err;
          }
        });
      });
      res.json(directors);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
    console.log('waiting to return json');
});

//films
app.get('/films', (req, res) => {

  const query = datastore.createQuery('Film');

  datastore
    .runQuery(query)
    .then(results => {
        const films = results[0];
        films.forEach(film => {
            const filmKey = film[datastore.KEY];
            if (film.topicId) {
                var strTopic = film.topicId.toString();
                var topicDesc = film.topicDesc;
            }
            var newFilm = {
              "oldId":filmKey.id.toString(),
              "directorId":film.directorId.toString(),
              "directorName":film.directorName,
              "createDate":film.createDate,
              "notes":film.notes,
              "stars":film.stars,
              "rating":film.rating,
              "watchDate":film.watchDate,
              "title":film.title,
              "topicId":strTopic,
              "topicDesc":topicDesc,
              "year":film.year,
              "userId":film.userId
            };
            Film.create(newFilm, function(err, film) {
              if (err) {
                throw err;
              }
            });
            console.log('film ', film.title);
        });
        res.json(films);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
});

//quotes
app.get('/quotes', (req, res) => {

  const query = datastore.createQuery('Quote');

  datastore
    .runQuery(query)
    .then(results => {
        const quotes = results[0];
        quotes.forEach(quote => {
            const quoteKey = quote[datastore.KEY];
            if (quote.bookId) {
                var strBookId = quote.bookId.toString();
                var strBookTitle = quote.bookTitle;
            }
            if (quote.filmId) {
                var strFilmId = quote.filmId.toString();
                var strFilmTitle = quote.filmTitle;
            }
            var newQuote = {
              "oldId":quoteKey.id.toString(),
              "bookId":strBookId,
              "bookTitle":strBookTitle,
              "filmId":strFilmId,
              "filmTitle":strFilmTitle,
              "characterName":quote.characterName,
              "quoteText":quote.quoteText,
              "userId":quote.userId
            };
            Quote.create(newQuote, function(err, quote) {
              if (err) {
                throw err;
              }
            });
        });
        res.json(quotes);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
});

//topics
app.get('/topics', (req, res) => {
  const query = datastore.createQuery('Topic');

  datastore
    .runQuery(query)
    .then(results => {
      const topics = results[0];
      topics.forEach(topic => {
        const topicKey = topic[datastore.KEY];
        var newTopic = {"oldId":topicKey.id.toString(), "description":topic.description, "userId":topic.userId};
        Topic.create(newTopic, function(err, topic) {
          if (err) {
            throw err;
          }
        });
      });
      res.json(topics);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
    console.log('waiting to return json');
});


//These are the update routines

app.get('/updateBooks', (req, res) => {
    var cursor = Book.find({}).cursor();
    cursor.on('data', function(book) {
        Author.find({oldId:book.authorId}, function(err, author) {
            Book.findOneAndUpdate({_id:book._id}, {$set:{authorId:author[0]._id}}, {new:true}, function(err, updatedBook) {
                console.log('updated');
            });
        });
    });

    cursor.on('close', function() {
        console.log('Cursor done');
    });
    res.json('Book cursor done processing');
});

app.get('/updateBookTopics', (req, res) => {
    var cursor = Book.find({topicId:{$ne:null}}).cursor();
    cursor.on('data', function(book) {
        Topic.find({oldId:book.topicId}, function(err, topic) {
            Book.findOneAndUpdate({_id:book._id}, {$set:{topicId:topic[0]._id}}, {new:true}, function(err, updatedBook) {
                console.log('updated');
            });
        });
    });

    cursor.on('close', function() {
        console.log('Cursor done');
    });
    res.json('Book Topic cursor done processing');
});

app.get('/updateFilms', (req, res) => {
    var cursor = Film.find({}).cursor();
    cursor.on('data', function(film) {
        Director.find({oldId:film.directorId}, function(err, director) {
            Film.findOneAndUpdate({_id:film._id}, {$set:{directorId:director[0]._id}}, {new:true}, function(err, updatedFilm) {
                console.log('updated');
            });
        });
    });

    cursor.on('close', function() {
        console.log('Cursor done');
    });
    res.json('Film cursor done processing');
});

app.get('/updateFilmTopics', (req, res) => {
    var cursor = Film.find({topicId:{$ne:null}}).cursor();
    cursor.on('data', function(film) {
        Topic.find({oldId:film.topicId}, function(err, topic) {
            Film.findOneAndUpdate({_id:film._id}, {$set:{topicId:topic[0]._id}}, {new:true}, function(err, updatedFilm) {
                console.log('updated');
            });
        });
    });

    cursor.on('close', function() {
        console.log('Cursor done');
    });
    res.json('Film Topic cursor done processing');
});

app.get('/updateQuotesByBook', (req, res) => {
    var cursor = Quote.find({bookId:{$ne:null}}).cursor();
    cursor.on('data', function(quote) {
        Book.find({oldId:quote.bookId}, function(err, book)  {
            Quote.findOneAndUpdate({_id:quote._id}, {$set:{bookId:book[0]._id}}, {new:true}, function(err, updatedQuote) {
                console.log('** Quote via book updated');
            });
        });
    });
    cursor.on('close', function() {
        console.log('Quote Cursor done');
    });
    res.json('Quote by Book Cursor done processing ');
});

app.get('/updateQuotesByFilm', (req, res) => {
    var cursor = Quote.find({filmId:{$ne:null}}).cursor();
    cursor.on('data', function(quote) {
        Film.find({oldId:quote.filmId}, function(err, film)  {
            Quote.findOneAndUpdate({_id:quote._id}, {$set:{filmId:film[0]._id}}, {new:true}, function(err, updatedQuote) {
                console.log('** Quote via film updated');
            });
        });
    });
    cursor.on('close', function() {
        console.log('Quote Cursor done');
    });
    res.json('Quote by Book Cursor done processing ');
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Running on port ', port);
