//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection");

////////////////////////////////////////////////
// Our Models (Moved from server to movie during refactor)
////////////////////////////////////////////////
// pull schema and model from mongoose using object destructuring
const { Schema, model } = mongoose;

// make Movie schema
const movieSchema = new Schema({
  title: { type: String, required: true },
  releaseDate: String,
  length: Number,
  genre: String,
  poster: { type: String, required: true },
  director: { type: String, required: true },
  rating: String,
  cast: [{ type: String }],
  watchAgain: Boolean,
});

// make Movie model
const Movie = model("Movie", movieSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Movie