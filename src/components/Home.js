import React from "react"
import Popular from "./Popular"
import Search from "./Search"
import "../styles/homepage.scss"
import 'rc-pagination/assets/index.css'
import "../styles/pagination.scss"
const Home = (props) => {
    const {term, handleInput} = props
    return <div className="relative">
        <div className="search-input">
            <input type="text" name="search" value={term} onChange={handleInput} placeholder="Search..." />
        </div>
            {term.length === 0 ? <Popular {...props} /> : <Search {...props} />}
        </div> 
}

export default Home