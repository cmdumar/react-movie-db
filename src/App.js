import React, {Component} from 'react';
import {observer} from "mobx-react"
import {Switch, Route} from "react-router-dom"
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import Movie from "./components/Movie"
import "./styles/main.scss"
import movieStore from "./store/movie"
import Actor from "./components/Actor"

const App = observer(class extends Component {
  componentDidMount() {
    this.props.store.fetchPopular(this.props.store.currentPage)
  }

  handleInput = (e) => {
    let term = this.props.store.term = e.target.value
    if(term === 0) {
      this.props.store.fetchPopular(this.props.store.currentPage)
    } else {
      this.props.store.fetchSearch(term, this.props.store.currentPage)
    }
  }

  changePage = (e) => {
    this.props.store.currentPage = e.target.value
    if(this.props.store.term.length === 0) {
      this.props.store.fetchPopular(this.props.store.currentPage)
    } else {
      this.props.store.fetchSearch(this.props.store.term, this.props.store.currentPage)
    }
  }

  clearSearch = () => {
    this.props.store.term = ""
    this.props.store.currentPage = 1
    this.props.store.fetchPopular(this.props.store.currentPage)
  }

  render() {
    const {popular, searchResults, loaded, term} = this.props.store
    const { crew, cast } = movieStore.credits
    const director = crew ? crew.filter(i => i.job === 'Director') : null
    const directorName = crew ? director[0].name : null
    const directorId = crew ? director[0].id : null
    return (
      <>
        <Navigation clearSearch={this.clearSearch} term={this.props.store.term} handleInput={this.handleInput} />
        <Switch>
          <Route exact path="/">
            <Home changePage={this.changePage} />
          </Route>
        </Switch>

        <Switch>
          {!loaded ? null : !term ? popular.results.map(i => <Route
          path={`/movie/${i.id}`} 
          key={i.id}>
            <Movie id={i.id} />
          </Route>) :
          searchResults.results.map(i => <Route
          path={`/movie/${i.id}`} key={i.id}><Movie id={i.id} /></Route>)}
        </Switch>

        <Switch>
          <Route path={`/director/${directorName}`}>
            <Actor id={directorId} />
          </Route>
          {!loaded ? null : movieStore.credits.length !== 0 ?  cast.slice(0, 11).map(person => (
            <Route key={person.id} path={`/actor/${person.name.split(' ').join('-')}`}>
              <Actor id={person.id} />
            </Route>
          )) : null}
        </Switch>
      </>
    )
  }
})

export default App