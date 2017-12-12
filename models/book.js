var mongoose = require("mongoose");

//genre schema --for application

var bookSchema = mongoose.Schema({
  //exclude id becase automatically generated
  //require check for validation
  title:{
    type:String,
    required: true,
  },
  genre:{
    type:String,
    required: true,
  },
  description:{
    type:String
    // required: true,
  },
  author:{
    type:String,
    required: true,
  },
  publisher:{
    type:String
    // required: true,
  },
  page:{
    type:String
    // required: true,
  },
  image_url:{
    type:String
    // required: true,
  },
  buy_url:{
    type:String
    // required: true,
  },
  //default will automatically fill in the creation date
  create_date:{
    type: Date,
    default: Date.now
  }
});

//create an Genre Object and export it and can be access from outside
var Book = module.exports = mongoose.model("Book", bookSchema);

//Get books
//be able to access this function from the route
module.exports.getBooks = function(callback, limit){
  Book.find(callback).limit(limit);
};
//get book by id
module.exports.getBookById = function(id, callback){
  Book.findById(id, callback);
};
//add a book
module.exports.addBook = function(book, callback){
  Book.create(book, callback);
}

//update book
module.exports.updateBook = function(id, book, options, callback){
  var query = {_id: id};
  var update = {
    title : book.title,
    genre : book.genre,
    author : book.author,
    description: book.description,
    pages : book.pages,
    publisher : book.publisher,
    image_url: book.image_url,
    buy_url : book.buy_url
  }

  Book.findOneAndUpdate(query, update, options, callback);
}


//remove book
module.exports.removeBook = function(id, callback){
  var query = {_id : id};
  Book.remove(query, callback);
}
