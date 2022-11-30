require(`dotenv`).config()
const express = require(`express`)
const morgan = require(`morgan`)
const methodOverride= require(`method-override`)
const mongoose = require(`mongoose`)
const path = require(`path`)

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////

// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Extablish connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));


////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////

// pull schema and model from mongoose using object destructuring
const { Schema, model } = mongoose;

// make Movies schema
const MoviesSchema = new Schema({
  title: {type: String, required: true},
  releaseDate: String,
  length: Number,
  genre: String,
  poster: {type: String, required: true},
  director: {type: String, required: true},
  rating: String,
  watchAgain: Boolean,
  cast: [{type: String}]
});

// make Movie model
const Movie = model("Movie", MoviesSchema);

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = express()
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx')

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("your server is running... better catch it.");
});

  //////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));