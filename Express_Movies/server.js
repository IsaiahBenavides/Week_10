/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require(`dotenv`).config();
const express = require(`express`);
const morgan = require(`morgan`);
const methodOverride = require(`method-override`);
// const mongoose = require(`mongoose`);
const Movie = require("./models/movie")
const path = require(`path`);

// /////////////////////////////////////////////
// // Database Connection //////////////////////// (Moved to conections during refactor) ////////////////////////
// /////////////////////////////////////////////

// // Setup inputs for our connect function
// const DATABASE_URL = process.env.DATABASE_URL;
// const CONFIG = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// // Extablish connection
// mongoose.connect(DATABASE_URL, CONFIG);

// // Events for when connection opens/disconnects/errors
// mongoose.connection
//   .on("open", () => console.log("Connected to Mongoose"))
//   .on("close", () => console.log("Disconnected from Mongoose"))
//   .on("error", (error) => console.log(error));

// ////////////////////////////////////////////////
// // Our Models //////////////////////// (Moved from server to movie during refactor) ////////////////////////
// ////////////////////////////////////////////////
// // pull schema and model from mongoose using object destructuring
// const { Schema, model } = mongoose;

// // make Movies schema
// const MoviesSchema = new Schema({
//   title: { type: String, required: true },
//   releaseDate: String,
//   length: Number,
//   genre: String,
//   poster: { type: String, required: true },
//   director: { type: String, required: true },
//   rating: String,
//   cast: [{ type: String }],
//   watchAgain: Boolean,
// });

// // make Movie model
// const Movie = model("Movie", MoviesSchema);

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = express();
app.engine("jsx", require("express-react-views").createEngine());
app.set("view engine", "jsx");

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

app.get("/movies/seed", (req, res) => {
  const startMovies = [
    {
      title: "The Matrix",
      releaseDate: "1999",
      length: 136,
      genre: "Sci-fi",
      poster:
        "https://imgc.allpostersimages.com/img/posters/the-matrix_u-L-F4S5W20.jpg?artHeight=550&artPerspective=n&artWidth=550&background=fbfbfb",
      director: "The Wasoki Bros",
      rating: "R",
      watchAgain: true,
      cast: ["Keanu Reeves", "Laurence Fishburne"],
    },
    {
      title: "50 First Dates",
      releaseDate: "2004",
      length: 99,
      genre: "Comedy",
      poster:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wolfgangsvault.com%2Fm%2Fxlarge%2FZZZ060179-PO%2F50-first-dates-poster-feb-13-2004.jpg&f=1&nofb=1&ipt=e5b24fb9700122c5f3b1ca26924cba6bd65f109bb01bb9f05f435bec38af4a7b&ipo=images",
      director: "Peter Segal",
      rating: "PG-13",
      watchAgain: true,
      cast: ["Adam Sandler, Drew Barrymore"],
    },
    {
      title: "The Dark Knight",
      releaseDate: "2008",
      length: 152,
      genre: "Superhero",
      poster:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F1416%2F8662%2Fproducts%2Fdark_knight_english_original_film_art_spo_2000x.jpg%3Fv%3D1543419185&f=1&nofb=1&ipt=5921f90739a7595647631928c3d3ed0f660a8cd992cc8ec19b9a1ad7cee56942&ipo=images",
      director: "Christoper Nolan",
      rating: "PG-13",
      watchAgain: true,
      cast: ["Christan Bale", "Heath Ledger", "Morgan Freeman"],
    },
    {
      title: "Birdemic: Shock and Terror",
      releaseDate: "2010",
      length: 105,
      genre: "Horror",
      poster:
        "https://bmoviebffs.com/wp-content/uploads/2018/06/Birdemic-2010-poster-768x1024.jpg",
      director: "James Nguyen",
      rating: "Not Rated",
      watchAgain: false,
      cast: ["Alan Bagh", "Whitney Moore"],
    },
  ];

  // Delete all movies
  Movie.deleteMany({}).then((data) => {
    // Seed Starter Movies
    Movie.create(startMovies).then((data) => {
      // Send created movies as response to confirm creation
      res.json(data);
    });
  });
});

// INDEX
// The Async/Await Method
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.render("movies/Index", { movies });
  } catch (err) {
    res.json({ err });
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

// NEW
app.get("/movies/new", (req, res) => {
  res.render("movies/New");
});

//DELETE
app.delete("/movies/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // delete the fruit
  Movie.findByIdAndRemove(id)
    .then((movie) => {
      // redirect to main page after deleting
      res.redirect("/movies");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//UPDATE
app.put("/movies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    req.body.watchAgain = req.body.watchAgain === "on" ? true : false;
    req.body.cast = req.body.cast.split(",")
    await Movie.findByIdAndUpdate(id, req.body)
    res.redirect(`/movies/${id}`)
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
})

// CREATE
app.post("/movies", async (req, res) => {
  try {
    req.body.watchAgain = req.body.watchAgain === "on" ? true : false;
    req.body.cast = req.body.cast.split(",")
    console.log(req.body)
    const createdMovie = await Movie.create(req.body)
    res.redirect("/movies")
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
})

//EDIT
app.get("/movies/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the movie from the database
  Movie.findById(id)
    .then((movie) => {
      // render Edit page and send movie data
      res.render("movies/Edit.jsx", { movie });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// SHOW
app.get("/movies/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    res.render("movies/Show", { movie });
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
});

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
