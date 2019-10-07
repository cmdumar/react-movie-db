import React, {Component} from "react"
import {observer} from "mobx-react"
import {Switch, Route, Link} from "react-router-dom"
import store from "../store/home"
import Pagination from "./Pagination"

const nullw500 = require('../images/nullw500.png')

const Search = observer(class extends Component {
    render() {
      const {searchResults, loaded} = store
      console.log(searchResults)
      return (
          <section>
              <div className="movies-grid">
                {loaded ? searchResults.results.map(({id, poster_path}) => (
                        <div className="movie-item">
                            <Link to={`/movie/${id}`} key={id}>        
                                    <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                    : `${nullw500}`}/>
                            </Link>
                        </div>)) : 
                    <h2>Loading...</h2>
                }
                </div>
              <Pagination
              results={searchResults}
              changePage={this.props.changePage} />
          </section>
      )
    }
})

export default Search