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

app.get("/movies/seed", (req,res)=>{
    const startMovies= [
        {
            title: "Matrix",
            releaseDate: "1999",
            length: 136,
            genre: "Sci-fi",
            poster: "https://imgc.allpostersimages.com/img/posters/the-matrix_u-L-F4S5W20.jpg?artHeight=550&artPerspective=n&artWidth=550&background=fbfbfb",
            director: "The Wasoki Bros",
            rating: "R",
            watchAgain: true,
            cast: ["Keanu Reeves", "Laurence Fishburne"]
        },
        {
            title: "50 First Dates",
            releaseDate: "2004",
            length: 99,
            genre: "Comedy",
            poster: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wolfgangsvault.com%2Fm%2Fxlarge%2FZZZ060179-PO%2F50-first-dates-poster-feb-13-2004.jpg&f=1&nofb=1&ipt=e5b24fb9700122c5f3b1ca26924cba6bd65f109bb01bb9f05f435bec38af4a7b&ipo=images",
            director: "Peter Segal",
            rating: "PG-13",
            watchAgain: true,
            cast: ["Adam Sandler, Drew Barrymore"]
        },
        {
            title: "The Dark Knight",
            releaseDate: "2008",
            length: 152,
            genre: "Superhero",
            poster: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F1416%2F8662%2Fproducts%2Fdark_knight_english_original_film_art_spo_2000x.jpg%3Fv%3D1543419185&f=1&nofb=1&ipt=5921f90739a7595647631928c3d3ed0f660a8cd992cc8ec19b9a1ad7cee56942&ipo=images",
            director: "Christoper Nolan",
            rating: "PG-13",
            watchAgain: true,
            cast: ["Christan Bale", "Heath Ledger", "Morgan Freeman"]
        },
        {
            title: "Birdemic: Shock and Terror",
            releaseDate: "2010",
            length: 105,
            genre: "Horror",
            poster: "https://bmoviebffs.com/wp-content/uploads/2018/06/Birdemic-2010-poster-768x1024.jpg",
            director: "James Nguyen",
            rating: "Not Rated",
            watchAgain: false,
            cast: ["Alan Bagh", "Whitney Moore"]
        }
    ];

    
    // Delete all movies
    Movie.deleteMany({}).then((data)=>{
        // Seed Starter Movies
        Movie.create(startMovies).then((data)=>{
            // Send created movies as response to confirm creation
            res.json(data);
        })
    })
})

// Index route
// The Async/Await Method
app.get("/movies", async (req, res) => {
    try{
        const movies = await movies.find({});
        res.render("movies/Index", { movies });
    }catch(err){
        res.json({err})
    }
});

// The .then Method
// app.get("/movies", (req, res) => {
//     // find all the movies
//     movie.find({})
//       // render a template after they are found
//       .then((movies) => {
//         res.render("movies/Index", { movies });
//       })
//       // send error as json if they aren't
//       .catch((error) => {
//         res.json({ error });
//       });
//   });

//   Callback Method
// app.get("/movies", (req, res) => {
//   movie.find({}, (err, movies) => {
//     res.render("movies/Index", { movies });
//   });
// });

  //////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));