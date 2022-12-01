////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Movie = require("../models/movie");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// Seed moved to models/seed.js during refactor

// router.get("/seed", (req, res) => {
//     const startMovies = [
//         {
//             title: "The Matrix",
//             releaseDate: "1999",
//             length: 136,
//             genre: "Sci-fi",
//             poster:
//                 "https://imgc.allpostersimages.com/img/posters/the-matrix_u-L-F4S5W20.jpg?artHeight=550&artPerspective=n&artWidth=550&background=fbfbfb",
//             director: "The Wasoki Bros",
//             rating: "R",
//             watchAgain: true,
//             cast: ["Keanu Reeves", "Laurence Fishburne"],
//         },
//         {
//             title: "50 First Dates",
//             releaseDate: "2004",
//             length: 99,
//             genre: "Comedy",
//             poster:
//                 "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wolfgangsvault.com%2Fm%2Fxlarge%2FZZZ060179-PO%2F50-first-dates-poster-feb-13-2004.jpg&f=1&nofb=1&ipt=e5b24fb9700122c5f3b1ca26924cba6bd65f109bb01bb9f05f435bec38af4a7b&ipo=images",
//             director: "Peter Segal",
//             rating: "PG-13",
//             watchAgain: true,
//             cast: ["Adam Sandler, Drew Barrymore"],
//         },
//         {
//             title: "The Dark Knight",
//             releaseDate: "2008",
//             length: 152,
//             genre: "Superhero",
//             poster:
//                 "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F1416%2F8662%2Fproducts%2Fdark_knight_english_original_film_art_spo_2000x.jpg%3Fv%3D1543419185&f=1&nofb=1&ipt=5921f90739a7595647631928c3d3ed0f660a8cd992cc8ec19b9a1ad7cee56942&ipo=images",
//             director: "Christoper Nolan",
//             rating: "PG-13",
//             watchAgain: true,
//             cast: ["Christan Bale", "Heath Ledger", "Morgan Freeman"],
//         },
//         {
//             title: "Birdemic: Shock and Terror",
//             releaseDate: "2010",
//             length: 105,
//             genre: "Horror",
//             poster:
//                 "https://bmoviebffs.com/wp-content/uploads/2018/06/Birdemic-2010-poster-768x1024.jpg",
//             director: "James Nguyen",
//             rating: "Not Rated",
//             watchAgain: false,
//             cast: ["Alan Bagh", "Whitney Moore"],
//         },
//     ];

//     // Delete all movies
//     Movie.deleteMany({}).then((data) => {
//         // Seed Starter Movies
//         Movie.create(startMovies).then((data) => {
//             // Send created movies as response to confirm creation
//             res.json(data);
//         });
//     });
// });

// INDEX
// The Async/Await Method
router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.render("movies/Index", { movies });
    } catch (err) {
        res.json({ err });
    }
});

// NEW
router.get("/new", (req, res) => {
    res.render("movies/New");
});

//DELETE
router.delete("/:id", (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
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
router.get("/:id/edit", (req, res) => {
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
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await Movie.findById(id);
        res.render("movies/Show", { movie });
    } catch (err) {
        console.log(err);
        res.json({ err });
    }
});


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router