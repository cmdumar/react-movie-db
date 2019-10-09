import {observable, action, decorate, runInAction} from "mobx"

const html = document.querySelector('html')

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
let random = randomNumber(0, 20)


class Home {
    popular = []
    loaded = false
    searchResults = []
    term = ""
    currentPage = 1

    fetchPopular (page) {
        runInAction(() => {
            this.loaded = false
        })

        fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=82dee22856e0d0ac5f767ec6fb845efc&language=en-US&page=${page}`
          )
            .then(res => res.json())
            .then(res => {
              return (
              this.setPopular(res),
              this.popular.results[random] ? html.style.background = `url(https://image.tmdb.org/t/p/w1280${this.popular.results[random].backdrop_path}) 
              center center / cover no-repeat fixed` : null 
              )
        });
    }

    fetchSearch (term, page) {
        runInAction(() => {
          this.loaded = false;
          this.currentPage = 1;
        });
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=82dee22856e0d0ac5f767ec6fb845efc&language=en-US&query=${term}&page=${page}&include_adult=false`
        )
        .then(res => res.json())
        .then(res => {
        this.setSearch(res);
        });
    }

    setPopular(data) {
        this.popular = data;
        this.loaded = true;
    }
    
    setSearch(data) {
        this.searchResults = data;
        this.loaded = true;
    }
}

decorate(Home, {
    popular: observable,
    search: observable,
    currentPage: observable,
    term: observable,
    setPopular: action,
    setSearch: action,
    loaded: observable
})

const store =  new Home()

export default store