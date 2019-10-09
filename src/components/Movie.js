import React, {Component} from "react"
import {observer} from "mobx-react"
import {Link} from "react-router-dom"
import movieStore from "../store/movie"
import "../styles/movie.scss"

const nullw185 = require('../images/nullw185.png')
const nullw500 = require('../images/nullw500.png')

const Movie = observer(class extends Component {
    componentDidMount() {
        movieStore.fetchAll(this.props.id)
    }

    render() {
        const {loaded, details, credits, recommendations} = movieStore
        const director = credits.crew ? credits.crew.filter(i => i.job === 'Director') : null
        let direc = credits.crew ? director[0] : null
        let direcName = direc ? direc.name : null
        const {results} = recommendations
        const {scrollTop} = this.props
        return <div className="relative">
            {loaded && (details.length !== 0 && credits.length !== 0) ? 
            <>
            <div className="movie-grid">
                <div className="movie-poster">
                    <img src={details.poster_path ? 
                        `https://image.tmdb.org/t/p/w500${details.poster_path}` : 
                        `${nullw500}`} 
                        alt="Movie poster" />
                </div>
                <div className="infos-grid">
                    <div className="movie-title relative">
                    {details.title}</div>
                    <div className="movie-infos">
                        <span className="movie-date">{details.release_date}</span>
                        <span className="movie-vote">{details.vote_average}</span>
                        <span className="movie-runtime">
                        {Math.floor(details.runtime / 60)}h {details.runtime % 60}m</span>
                    </div>
                    <div className="movie-genres">
                        {details.genres ? details.genres.map(({id, name}, i) => <span key={id}>
                        {i !== details.genres.length - 1 ? `${name}, ` :
                         ` ${name}`}
                        </span>) : null}
                    </div>
                    <div className="movie-tagline">{details.tagline ? 
                        details.tagline : null}</div>
                    
                    <div className="movie-overview">{details.overview}</div>
                    <div className="movie-director">
                        <span className="director-job">Director</span>
                        <span className="director-name">{direcName}</span>
                    </div>
                    <div>
                        <span className="main-cast">Main Cast</span>
                        {loaded ? credits.cast.map((cast, i) => (i < 11) ? 
                        <span key={cast.cast_id}>
                        {i !== 10 ? `${cast.name}, ` : 
                        `${cast.name}`}
                        </span> : null) : null}
                    </div>
                </div>
                <div className="rec-grid">
                    <span className="title">Recommendations</span>
                    {results ? results.slice(0, 6).map(({id, 
                    poster_path, 
                    original_title, 
                    release_date, 
                    vote_average}) =>
                        (
                            <div className="infos-container cursor-normal" 
                            key={id}>   
                                        <img src={poster_path ? 
                                        `https://image.tmdb.org/t/p/w500${poster_path}` :
                                            `${nullw500}`} 
                                            alt={`Movie Poster`}/>
                                        <div className="infos-box">
                                            <div className="infos-one">{release_date}</div>
                                            <div className="infos-two">{original_title}</div>
                                            <div className="infos-three">{vote_average}</div>
                                        </div>
                            </div>
                        )) : 
                        <h2>Loading...</h2>
                    }
                </div>
                <div className="cast-grid">
                    <div className="title">Cast and Crew</div>
                    <div className="cast-img infos-container">
                        <Link 
                        to={`/director/${direc.name.split(' ').join('-')}`}
                        onClick={scrollTop}>
                            <img src={direc.profile_path ? 
                            `https://image.tmdb.org/t/p/w185${direc.profile_path}` :
                            `${nullw185}`} alt={`${direc.name} (Director)`}/>
                            <div className="infos-box">
                            <div className="infos-one">Director</div>
                            <div className="infos-two">{direc.name}</div>
                            <div className="infos-three">{direc.job}</div>
                            </div>
                        </Link>
                    </div>
                    {credits.cast ? credits.cast.slice(0, 11)
                    .map(cast => <div key={cast.id} 
                    className="cast-img infos-container">
                        <Link 
                        to={`/actor/${cast.name.split(' ').join('-')}`}
                        onClick={scrollTop}>
                            <img src={cast.profile_path ? 
                            `https://image.tmdb.org/t/p/w185${cast.profile_path}` : 
                            `${nullw185}`} alt={`${cast.name} (Actor)`} />
                            <div className="infos-box">
                                <div className="infos-one">Actor</div>
                                <div className="infos-two">{cast.name}</div>
                                <div className="infos-three">{cast.character}</div>
                            </div>
                        </Link>
                    </div>) : null}
                </div>
                <div className="details-grid">
                    <div className="title">Movie Facts</div>
                    <div className="details-container">
                        <div className="details-title">Original Title</div>
                        <div className="details-value">{details.original_title}</div>
                    </div>
                    <div className="details-container">
                        <div className="details-title">Status</div>
                        <div className="details-value">{details.status ? 
                            details.status : "Unknown"}</div>
                    </div>
                    <div className="details-container">
                        <div className="details-title">Release Date</div>
                        <div className="details-value">{details.release_date ? 
                            details.release_date : '-'}</div>
                    </div>
                    <div className="details-container">
                        <div className="details-title">Ratings</div>
                        <div className="details-value">{details.vote_average ? 
                            details.vote_average : '-'}</div>
                    </div>
                    <div className="details-container">
                        <div className="details-title">Runtime</div>
                        <div className="details-value">
                        {Math.floor(details.runtime / 60)}h {details.runtime % 60}m
                        </div>
                    </div>
                    <div className="details-container">
                        <div className="details-title">Budget</div>
                        <div className="details-value">${details.budget ? 
                        details.budget.toFixed(1)
                    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,') : '-'}</div>
                    </div>
                    <div className="details-container">
                        <div className="details-title">Revenue</div>
                        <div className="details-value">${details.revenue ? 
                        details.revenue.toFixed(1)
                    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,') : "-"}</div>
                    </div>
                </div>
            </div>
            </>
            : <div className="loading">Loading</div>}
        </div>
    }
})

export default Movie