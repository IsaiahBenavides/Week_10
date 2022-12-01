const React = require("react");
const DefaultLayout = require("../Default");

class New extends React.Component {
    render(){
        return(
            <DefaultLayout>
              <a href="/movies">Back</a>
  <form action="/movies" method="post">
    <fieldset>
      <legend>Create a New movie</legend>
      <label>
        TITLE:<input type="text" name="title" placeholder="enter movie" />
      </label>

      <label>
        RELEASE DATE:<input type="text" name="releaseDate" placeholder="enter year" />
      </label>

      <label>
        LENGTH:<input type="number" name="length" placeholder="enter length" />
      </label>

      <label>
        GENRE:<input type="text" name="genre" placeholder="enter genre" />
      </label>

      <label>
        POSTER:<input type="text" name="poster" placeholder="enter poster link" />
      </label>

      <label>
        DIRECTOR:<input type="text" name="director" placeholder="enter director" />
      </label>

      <label>
        RATING:<input type="text" name="rating" placeholder="enter rating" />
      </label>

      <label>
        CAST: (Please seperate cast members with commas)<input type="text" name="cast" placeholder="enter stars" />
      </label>

      <label> 
        REWATCH?:<input type="checkbox" name="watchAgain" /> 
      </label>
      
    </fieldset>
    <input type="submit" value="create New movie" />
  </form>
</DefaultLayout>
        )
    }
}

module.exports = New