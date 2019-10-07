import React, {Component} from "react"

const Actor = class extends Component {
    render() {
        return (
            <div className="relative">
                <h2>{this.props.id}</h2>
            </div>
        )
    }
} 

export default Actor