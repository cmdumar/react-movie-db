import { observable, action, decorate, runInAction } from "mobx"

const html = document.querySelector('html')
 
// Store for fetching the Movies Page
class Movie {
  details = []
  credits = []
  loaded = false
  recommendations = []

  fetchAll(id) {
    runInAction(() => {
      this.loaded = false
    })

    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=82dee22856e0d0ac5f767ec6fb845efc&language=en-US`
    )
      .then(res => res.json())
      .then(res => {
        return (
          this.setDetails(res),
          this.details ? html.style.background = `url(https://image.tmdb.org/t/p/w1280${this.details.backdrop_path}) 
                center center / cover no-repeat fixed` : null
        )
    })

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=82dee22856e0d0ac5f767ec6fb845efc`
    )
      .then(res => res.json())
      .then(res => {
        this.setCredits(res)
      })

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=82dee22856e0d0ac5f767ec6fb845efc&language=en-US&page=1`
    )
    .then(res => res.json())
    .then(res => (
      this.setRecommendations(res)
    ))
  }

  setDetails(data) {
    this.details = data
  }

  setCredits(data) {
    this.credits = data
  }

  setRecommendations(data) {
    this.recommendations = data
    this.loaded = true
  }
}

decorate(Movie, {
  details: observable,
  credits: observable,
  loaded: observable,
  recommendations: observable,
  setDetails: action,
  setCredits: action,
  setRecommendations: action
})

let movieStore = new Movie()

export default movieStore