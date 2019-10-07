import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles/main.scss"
import store from "./store/home"
import {BrowserRouter as Router} from "react-router-dom"

ReactDOM.render(
    <Router>
        <App store={store} />
    </Router>
    , document.getElementById('root'));
