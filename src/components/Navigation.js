import React from "react"
import {Link} from "react-router-dom"
import {observer} from "mobx-react"
import "../styles/nav.scss"

const Navigation = observer(({handleInput, term, clearSearch}) => {
    return <header>
        <nav>
        <ul>
            <li>
                <Link to="/" onClick={clearSearch}>Popular Movies</Link>
            </li>
            <li>
                <input type="text" name="search" value={term} onChange={handleInput} placeholder="Search..." />
            </li>
        </ul>
        </nav>
    </header>
})

export default Navigation