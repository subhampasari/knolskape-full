import React, { Component } from 'react';
import './App.css';
import Contacts from './Contacts';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

require('dotenv').config()

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: "",
		};
	}

	componentDidMount() {
		fetch(process.env.REACT_APP_API_HOST + '/auth/user', {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		})
		.then( res => res.json())
		.then( res => {
			if(res.user === null) {
				window.location.href = process.env.REACT_APP_API_HOST;
				return;
			}
		})
	}

	render() {
		return (
			<div className="App">
				<Router>
					<Route path="/contacts" component={Contacts}></Route>
		        </Router>
        	</div>
		);
	}
}

export default App;
