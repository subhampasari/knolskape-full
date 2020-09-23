import React, {Component } from 'react';
import Container from 'react-bootstrap/Container';
import '@fortawesome/fontawesome-free/js/all.js';
import './TopBar.css';
import axios from "axios";
import { Redirect } from "react-router-dom";

class TopBar extends Component {

	
	constructor(props) {
		super(props);
		this.state = {
			user_name : "",
			user_email : "",
			user_img : "",
			redirect: null
		}
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
			this.setState({
				user_name: res.name,
				user_email : res.email,
				user_img : res.profileImageUrl
			})
		})
		.catch(err => {
			console.log(err);
		})

	}

	logout = (e) => {
		e.preventDefault();
		
		console.log('clicked');
		fetch(process.env.REACT_APP_API_HOST + '/auth/logout', {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		})
		.then(res => res.json() )
		.then( res => {
			console.log(res);
			if(res.msg && res.msg === 'logging you out') {
				// redirect to home page
				this.setState({ redirect: "/" });
				return res;
			}
		})
		.catch(err => {
			console.log(err);
		})
	}

	render(){
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}
		return(
			<div className="topBar">
					<div className="userDetails">
						<div className="circleUserAvatar">
							<img className="userImg" src={this.state.user_img} />
						</div>
						<div style={{'color': 'white', 'float': 'right', 'marginTop': '0.4rem'}}>
							<span><b>{this.state.user_name}</b></span><br />
							<small>{this.state.user_email}</small>
						</div>
					</div>

					<div className="rightLogout">
						<button onClick={this.logout} className="logoutButton"><i className="fas fa-2x fa-sign-out-alt"></i></button >
					</div>
			</div>
		)
	}
	
}


export default TopBar