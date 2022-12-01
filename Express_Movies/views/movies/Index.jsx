const React = require("react")
const DefaultLayout = require("../Default")

class Index extends React.Component {
  render(){
  const { movies }= this.props
  return(
    <DefaultLayout>
        <nav>
            <a href="/movies/new">Add a new movie</a>
        </nav>
    <div>
      {
      movies.map((movie)=>{
        return(
        <article>
          <img src={movie.poster} alt="" />
          <a href={`/movies/${movie._id}`}><h2>{movie.title}</h2></a>
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