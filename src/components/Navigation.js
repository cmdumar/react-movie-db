import React from "react"
import {Link} from "react-router-dom"
import {observer} from "mobx-react"
import "../styles/nav.scss"

const Navigation = observer(({ clearSearch}) => {
    return <header>
        <nav>
            <div className="nav">
                <Link to="/" onClick={clearSearch} className="nav-btn">Popular Movies</Link>
            </div>
        </nav>
    </header>
})

export default Navigation