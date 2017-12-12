var mongoose = require("mongoose");

//genre schema --for application

var genreSchema = mongoose.Schema({
  //exclude id becase automatically generated
  //require check for validation
  name:{
    type:String,
    required: true,
  },
  //default will automatically fill in the creation date
  create_date:{
    type: Date,
    default: Date.now
  }
});

//create an Genre Object and export it and can be access from outside
var Genre = module.exports = mongoose.model("Genre", genreSchema);

//Get genre
//be able to access this function from the route
module.exports.getGenres = function(callback, limit){
  Genre.find(callback).limit(limit);
};

//add Genre
module.exports.addGenre = function(genre, callback){
  Genre.create(genre, callback);
}
//update Genre
module.exports.updateGenre = function(id, genre, options, callback){
    var query = {_id: id};
    var update = {
      name: genre.name
    };

    Genre.findOneAndUpdate(query, update, options, callback);
}

//remove genre

module.exports.removeGenre = function(id, callback){
  var query = {_id: id};
  Genre.remove(query, callback);
}
