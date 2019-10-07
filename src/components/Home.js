import React from "react"
// import {Link} from "react-router-dom"
import Popular from "./Popular"
import store from "../store/home"
import Search from "./Search"
import "../styles/homepage.scss"

const Home = props => {
    const {term} = store
    return <div>
            {term.length === 0 ? <Popular {...props} /> : <Search {...props} />}
        </div> 
}

export default Home