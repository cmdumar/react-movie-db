import { observable, action, decorate, runInAction } from "mobx"

const html = document.querySelector('html')
 
// Store for fetching the Movies Page
class Movie {
  details = []
  credits = []
  loaded = false

  fetchAll(id) {
    runInAction(() => {
      this.loaded = false
    })

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=82dee22856e0d0ac5f767ec6fb845efc`
    )
      .then(res => res.json())
      .then(res => {
        this.setCredits(res)
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
  }

  setDetails(data) {
    this.details = data
    this.loaded = true
  }

  setCredits(data) {
    this.credits = data
  }
}

decorate(Movie, {
  details: observable,
  credits: observable,
  loaded: observable,
  setDetails: action,
  setCredits: action
})

let movieStore = new Movie()

export default movieStore