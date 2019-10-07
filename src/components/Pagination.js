import React, {Component} from "react"
import { observer } from "mobx-react"
import "../styles/pagination.scss"

const Pagination =  observer(class extends Component {
    // changePage = (e) => {
    //     console.log(e.target.value)
    //     Home.fetchPopular(e.target.value)
    //     Home.currentPage = e.target.value
    //     console.log("currentPage", Home.currentPage)
    // }
    render() {
        const {results, changePage} = this.props
        let pageNumbers = []
        for(let i = 1; i <= results.total_pages; i++) {
            pageNumbers.push(i)
        }
        const renderPageNum = pageNumbers.map(i => <li key={i}><button onClick={changePage} value={i}>{i}</button></li>)
        return (
            <div className="relative">
                <ul className="pagination">
                    {renderPageNum}
                </ul>
            </div>
        )
    }
})

export default Pagination