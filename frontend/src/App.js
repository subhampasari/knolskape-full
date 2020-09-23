import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import Contacts from './Contacts';
import Cookies from 'js-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

require('dotenv').config()

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: "",
			hasToken: false
		};
	}

	componentDidMount() {

	}

	render() {
		const isLoggedIn = this.state.hasToken;
		return (
			<div className="App">
				<a href={process.env.REACT_APP_API_HOST}>Google Signin</a>
			

				<Router>
					<Route path="/contacts" component={Contacts}></Route>
		        </Router>
        	</div>
		);
	}
}

export default App;
