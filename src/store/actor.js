import { observable, decorate, action, runInAction } from "mobx";


const api_key = "82dee22856e0d0ac5f767ec6fb845efc"
// Store for fetching the Actor's Page
class Actor {
  actorDetails = []
  actorCredits = []
  loaded = false

  fetchAll(actorId) {
    runInAction(() => {
      this.loaded = false
    })

    fetch(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=${api_key}&language=en-US`
    )
      .then(res => res.json())
      .then(res => {
        this.setDetails(res)
      })

    fetch(
      `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${api_key}&language=en-US`
    )
      .then(res => res.json())
      .then(res => {
        this.setCredits(res)
      })
  }

  setDetails(data) {
    this.actorDetails = data
  }

  setCredits(data) {
    this.actorCredits = data
    this.loaded = true
  }
}

decorate(Actor, {
  actorDetails: observable,
  actorCredits: observable,
  loaded: observable,
  setCredits: action,
  setDetails: action
})

const actorStore = new Actor()

export default actorStore