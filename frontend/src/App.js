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
				<a href="http://localhost:4000/">Google Signin</a>
			

				<Router>
					<Route path="/contacts" component={Contacts}></Route>
		        </Router>
        	</div>
		);
	}
}

export default App;
