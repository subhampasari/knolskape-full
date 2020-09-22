import React, {Component } from 'react';
import Container from 'react-bootstrap/Container';
import '@fortawesome/fontawesome-free/js/all.js';
import './TopBar.css';
import axios from "axios";

class TopBar extends Component {

	componentDidMount() {

		axios.get('http://localhost:4000/auth/user')
			.then(res => {
				console.log(res);
			})

	}

	logout(e) {
		console.log('clicked');
		axios.get('http://localhost:4000/auth/logout')
			.then(res => {
				console.log(res);
			})
	}

	render(){
		return(
			<div className="topBar">
					<div className="userDetails">
						<div className="circleUserAvatar"></div>
						<div style={{'color': 'white', 'float': 'right', 'marginTop': '0.4rem'}}>
							<span>Subham Pasari</span><br />
							<small>sp.subham1995@gmail.com</small>
						</div>
					</div>

					<div className="rightLogout">
						<button onClick={this.logout}><i className="fas fa-2x fa-sign-out-alt"></i></button>
					</div>
			</div>
		)
	}
	
}


export default TopBar