import React, {Component} from "react"
import {observer} from "mobx-react"
import {Switch, Route, Link} from "react-router-dom"
import store from "../store/home"
import Pagination from "./Pagination"

const nullw500 = require('../images/nullw500.png')

const Popular = observer(class extends Component {
    // handleLink = (e) => {
    //     console.log("ID", e.target.value)
    //     store.link = e.target.value
    //     console.log("Link", store.link)
    // }

    render() {
        const {popular, loaded} = store
        const {handleLink} = this.props
        return (
            <section>
                <div className="movies-grid">
                {loaded ? popular.results.map(({id, poster_path}) => (
                        <div className="movie-item">
                            <Link to={`/movie/${id}`} key={id}>        
                                    <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` :
                                     `${nullw500}`}/>
                            </Link>
                        </div>)) : 
                    <h2>Loading...</h2>
                }
                </div>
                <Pagination
                results={popular}
                changePage={this.props.changePage} />
            </section>
        )
    }
})

export default Popular