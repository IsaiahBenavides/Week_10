const React = require("react");
const DefaultLayout = require("../Default");

class Index extends React.Component {
  render() {
    const { movies } = this.props;
    return (
      <DefaultLayout>
        <nav>
          <a href="/movies/new">
            <button>Add a new movie</button>
          </a>
        </nav>
        <div>
          {movies.map((movie) => {
            return (
              <article>
                <a href={`/movies/${movie._id}`}>
                  <h2>
                    <button>{movie.title}</button>
                  </h2>
                <img src={movie.poster} alt="" />
                </a>
              </article>
            );
          })}
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = Index;
