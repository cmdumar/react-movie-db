import React from "react"
import {Link} from "react-router-dom"
import {observer} from "mobx-react"
import "../styles/nav.scss"

const logo = require('../images/logo.svg')

const Navigation = observer(({ clearSearch}) => {
    return <header>
        <div className="menu-grid">
            <div className="logo">
                <img src={logo} alt="TMDB" />
            </div>
            <div className="nav-btn">
                <Link to="/" onClick={clearSearch} className="btn">Popular Movies</Link>
            </div>
        </div>
    </header>
})

export default Navigation