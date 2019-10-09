import React, {Component} from "react"
import {observer} from "mobx-react"
import {Link} from "react-router-dom"
import actorStore from "../store/actor"

const nullw500 = require('../images/nullw500.png')

const Actor = observer(class extends Component {
    componentDidMount() {
        actorStore.fetchAll(this.props.id)
    }

    render() {
        const {scrollTop} = this.props
        const {actorDetails, actorCredits, loaded} = actorStore
        const {cast} = actorCredits
        const {profile_path, name, birthday, deathday, biography, known_for_department, gender, place_of_birth, homepage, also_known_as} = actorDetails
        return (
            <div className="relative">
            {loaded && 
            (actorDetails.length !== 0 && 
            actorCredits.length !== 0) ?
                <div className="movie-grid">
                    <div className="movie-poster">
                        <img src={profile_path ?
                            `https://image.tmdb.org/t/p/w500${profile_path}` 
                            : `${nullw500}`} alt="Actor poster" 
                        />
                    </div>
                    <div className="infos-grid">
                        <div className="movie-title relative">{name}</div>
                        <div className="movie-overview">{biography ? biography : "No biography found"}</div>
                    </div>
                    <div className="rec-grid">
                        <span className="title">Known For</span>
                        {cast.length ? cast ? cast
                        .filter(item => item.vote_average > 6)
                        .sort((a, b) =>
                            a.vote_average > b.vote_average
                            ? -1
                            : b.vote_average > a.vote_average
                            ? 1
                            : 0
                        )
                        .slice(0, 9)
                        .map(({id, poster_path, original_title, release_date, vote_average}) =>
                            (
                                <div className="infos-container" key={id}> 
                                    <Link 
                                    to={`/movie/${id}`} 
                                    onClick={scrollTop}>
                                        <img src={poster_path ? 
                                        `https://image.tmdb.org/t/p/w500${poster_path}` :
                                            `${nullw500}`} alt={`Movie Poster`} />
                                        <div className="infos-box">
                                            <div className="infos-one">{release_date}</div>
                                            <div className="infos-two">{original_title}</div>
                                            <div className="infos-three">{vote_average}</div>
                                        </div>
                                    </Link>
                                </div>
                            )) : 
                            <h2>Loading...</h2>
                        : "Nothing found"}
                    </div>
                    <div className="details-grid">
                        <div className="title">Personal Info</div>
                        <div className="details-container">
                            <div className="details-title">Name</div>
                            <div className="details-value">{name}</div>
                        </div>
                        <div className="details-container">
                            <div className="details-title">Birthday</div>
                            <div className="details-value">{birthday}</div>
                        </div>
                        {deathday ? <div className="details-container">
                            <div className="details-title">Deathday</div>
                            <div className="details-value">{deathday}</div>
                        </div> : <div className="hidden"></div>}
                        <div className="details-container">
                            <div className="details-title">Known For</div>
                            <div className="details-value">{known_for_department}</div>
                        </div>
                        <div className="details-container">
                            <div className="details-title">Gender</div>
                            <div className="details-value">{gender === 2 ? "Male" : "Female"}</div>
                        </div>
                        <div className="details-container">
                            <div className="details-title">Place Of Birth</div>
                            <div className="details-value">{place_of_birth || "-"}</div>
                        </div>
                        <div className="details-container">
                            <div className="details-title">Website</div>
                            <div className="details-value">{homepage ? homepage : "-"}</div>
                        </div>
                        <div className="details-container">
                            <div className="details-title">Also Known as</div>
                            <div className="details-value">{also_known_as ? also_known_as
                            .map(i => <span key={i}>{i}<br/></span>) : 
                            "-"}</div>
                        </div>
                    </div>
                </div>
            :
            <div className="loading">Loading...</div>}
            </div>
        )
    }
})

export default Actor