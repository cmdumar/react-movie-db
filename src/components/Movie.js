import React, {Component} from "react"
import {observer} from "mobx-react"
import {Route, Link, Switch} from "react-router-dom"
import movieStore from "../store/movie"
import "../styles/movie.scss"

const nullw185 = require('../images/nullw185.png');

const Movie = observer(class extends Component {
    componentDidMount() {
        movieStore.fetchAll(this.props.id)
    }

    render() {
        const {loaded, details, credits} = movieStore
        const director = credits.crew ? credits.crew.filter(i => i.job === 'Director') : null
        const name = credits.crew ? director[0].name : null
        const profile = credits.crew ? director[0].profile_path : null
        return <div className="relative">
            {loaded ? 
            <>
            <div className="movie-grid">
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w300${details.poster_path}`} />
                </div>
                <div className="infos-grid">
                    <div className="movie-title relative">{details.title}</div>
                    <div className="movie-infos">
                        <span className="movie-date">{details.release_date}</span>
                        <span className="movie-vote">{details.vote_average}</span>
                        <span className="movie-runtime">{Math.floor(details.runtime / 60)}h {details.runtime % 60}m</span>
                    </div>
                    <div className="movie-genres">
                        {details.genres ? details.genres.map(({id, name}, i) => <span key={id}>
                        {i != details.genres.length - 1 ? `${name}, ` :
                         ` ${name}`}
                        </span>) : null}
                    </div>
                    <div className="movie-tagline">{details.tagline ? details.tagline : null}</div>
                    
                    <div className="movie-overview">{details.overview}</div>
                    <div className="movie-director">
                        <span className="director-job">Director</span>
                        <span className="director-name">{name}</span>
                    </div>
                    <div>
                        <span className="main-cast">Main Cast</span>
                        {loaded ? credits.cast.map((cast, i) => (i < 11) ? <span key={cast.cast_id}>
                        {i != 10 ? `${cast.name}, ` : `${cast.name}`}
                        </span> : null) : null}
                    </div>
                </div>
                <div className="cast-grid">
                    <div className="title">Cast and Crew</div>
                    <div className="cast-img">
                        <Link to={`/director/${name}`}>
                            <img src={profile ? 
                            `https://image.tmdb.org/t/p/w185${profile}` :
                            `${nullw185}`}/>
                        </Link>
                    </div>
                    {credits.cast ? credits.cast.slice(0, 11).map(cast => <div className="cast-img">
                        <Link to={`/actor/${cast.name.split(' ').join('-')}`}>
                            <img src={cast.profile_path ? 
                            `https://image.tmdb.org/t/p/w185${cast.profile_path}` : 
                            `${nullw185}`}/>
                        </Link>
                    </div>) : null}
                </div>
            </div>
            </>
            : <h2>Loading</h2>}
        </div>
    }
})

export default Movie