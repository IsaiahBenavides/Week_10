const React = require("react");
const DefaultLayout = require("../Default");

class Show extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <DefaultLayout>
        <div>
          <article>
            <h2>{movie.title}</h2>
                <img src={movie.poster} alt="" />
            <h3>Staring:</h3>
            <ul>
                {movie.cast.map((star) => {
                    return(
                        <li>{star}</li>
                    )
                })}
            </ul>
            <h4> Directed by: {movie.director}</h4>
            <p>
              Genre: {movie.genre ? movie.genre : "Good Question :D"} | Release
              Year: {movie.releaseDate ? movie.releaseDate : "SOON™"}
            </p>
            <p>{movie.rating ? movie.rating : "Unrated"}</p>
            <p>
              {movie.watchAgain
                ? "I would watch this again!"
                : "You gotta pay me to watch this again..."}
            </p>
            <a href={`/movies/${movie._id}/Edit`}><button>Edit</button></a>
            <form action={`/movies/${movie._id}?_method=DELETE`} method="POST">
              <input type="submit" value="Delete" />
            </form>
            <a href={`/movies/`}>
              <button>Back to Main</button>
            </a>
          </article>
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = Show