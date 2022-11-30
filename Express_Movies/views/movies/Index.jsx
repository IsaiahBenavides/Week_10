const React = require("react")
const DefaultLayout = require("../Default")

class Index extends React.Component {
  render(){
  const { movies }= this.props
  return(
    <DefaultLayout>
    <div>
      {
      movies.map((movie)=>{
        return(
        <article>
          <img src={movie.poster} alt="" />
          <h2>{movie.title}</h2>
          <h3>Staring:</h3>
          <h4> Directed by: {movie.director}</h4>
          <p>Genre: {movie.genre ? movie.genre : "Good Question :D"} | Release Year: {movie.releaseDate ? movie.releaseDate : "SOON™"}</p>
          <p>{movie.rating ? movie.rating : "Unrated"}</p>
          <p>{movie.watchAgain ? "I would watch this again!" : "You gotta pay me to watch this again..."}</p>
        </article>
        )
      })
      }
    </div>
    </DefaultLayout>
  )
  }
}

module.exports = Index