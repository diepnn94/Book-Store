var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


//specified the path to the static folder... frontend
app.use(express.static(__dirname + "/client"));

app.use(bodyParser.json());
//import the genre object
Genre = require("./models/genre");
Book = require("./models/book")


//connect to mongoose

mongoose.connect("mongodb://127.0.0.1:27017/bookstore", {useMongoClient:true,});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.get("/", function(req, res){
  res.send("Please use /api/books or /api/genres");
});

app.get("/api/genres", function(req, res){
  Genre.getGenres(function(err, genres){
    if (err){
      throw err;
    }
    // res.json(genres);
    res.end(JSON.stringify(genres));
  });
  // res.send("under implementing");
});
app.post("/api/genres", function(req, res){
  var genre = req.body;
  Genre.addGenre(genre, function(err, genre){
    if (err){
      throw err;
    }
    // res.json(genres);
    res.end(JSON.stringify(genre));
  });
  // res.send("under implementing");
});

app.put("/api/genres/:_id", function(req, res){
  var id = req.params._id;
  var genre = req.body;
  Genre.updateGenre(id, genre, {},  function(err, genre){
    if (err){
      throw err;
    }
    // res.json(genres);
    res.end(JSON.stringify(genre));
  });
  // res.send("under implementing");
});


app.delete("/api/genres/:_id", function(req, res){
  var id = req.params._id;
  Genre.removeGenre(id, function(err, genre){
    if (err){
      throw err;
    }
    res.end(JSON.stringify(genre));
  })
})
app.get("/api/books", function(req, res){
  Book.getBooks(function(err, books){
    if (err){
      throw err;
    }
    // res.json(genres);
    res.end(JSON.stringify(books));
  });
  // res.send("under implementing");
});
app.get("/api/books/:_id", function(req, res){
  Book.getBookById(req.params._id, function(err, book){
    if (err){
      throw err;
    }
    // res.json(genres);
    res.end(JSON.stringify(book));
  });
  // res.send("under implementing");
});

app.post("/api/books", function(req, res){
  var book = req.body;
  Book.addBook(book, function(err, book){
    if (err){
      throw err;
    }
    // res.json(genres);
    res.end(JSON.stringify(book));
  });
  // res.send("under implementing");
})

app.put("/api/books/:_id", function(req, res){
  var id = req.params._id;
  var book = req.body;
  Book.updateBook(id, book, {},  function(err, book){
    if (err){
      throw err;
    }
    // res.json(genres);
    res.end(JSON.stringify(book));
  });
  // res.send("under implementing");
});

app.delete("/api/books/:_id", function(req, res){
  var id = req.params._id;
  // var book = req.body;
  Book.removeBook(id, function(err, book){
    if (err){
      throw err;
    }
    // res.json(genres);
    res.end(JSON.stringify(book));
  });
  // res.send("under implementing");
});


app.listen(3000);
console.log("Starting on 3000");
