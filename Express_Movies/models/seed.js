///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection")
const Movie = require("./movie")

///////////////////////////////////////////
// Seed Code
///////////////////////////////////////////
// save the connection in a variable
const db = mongoose.connection;

// Make sure code is not run till connected
db.on("open", () => {
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
                // log new movies
                console.log("data", data)
                db.close();
            })
            .catch((error) =>{
                console.log(error)
                db.close()
            })
        });
    });
