const React = require("react");
const DefaultLayout = require("../Default");

class Edit extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <DefaultLayout>
        <a href={`/movies/${movie._id}`}><button>Back</button></a>
        <form action={`/movies/${movie._id}?_method=PUT`} method="POST">
          <fieldset>
            <legend>Edit {movie.title}</legend>
            <label>
              TITLE:
              <input
                type="text"
                name="title"
                placeholder="enter movie"
                value={movie.title}
              />
            </label>

            <label>
              RELEASE DATE:
              <input
                type="text"
                name="releaseDate"
                placeholder="enter year"
                value={movie.releaseDate}
              />
            </label>

            <label>
              LENGTH: (In minuets)
              <input
                type="number"
                name="length"
                placeholder="enter length"
                value={movie.length}
              />
            </label>

            <label>
              GENRE:
              <input
                type="text"
                name="genre"
                placeholder="enter genre"
                value={movie.genre}
              />
            </label>

            <label>
              POSTER:
              <input
                type="text"
                name="poster"
                placeholder="enter poster link"
                value={movie.poster}
              />
            </label>

            <label>
              DIRECTOR:
              <input
                type="text"
                name="director"
                placeholder="enter director"
                value={movie.director}
              />
            </label>

            <label>
              RATING:
              <input
                type="text"
                name="rating"
                placeholder="enter rating"
                value={movie.rating}
              />
            </label>

            <label>
              CAST: (Please seperate cast members with commas)
              <input
                type="text"
                name="cast"
                placeholder="enter stars"
                value={movie.cast.join(",")}
              />
            </label>

            {movie.watchAgain ? (
              <label>
                REWATCH?:
                <input type="checkbox" name="watchAgain" checked />
              </label>
            ) : (
              <label>
                REWATCH?:
                <input type="checkbox" name="watchAgain" />
              </label>
            )}
          </fieldset>
          <input type="submit" value="Edit movie" />
        </form>
      </DefaultLayout>
    );
  }
}

module.exports = Edit