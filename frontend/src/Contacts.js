import React, {Component } from 'react';
import axios from "axios";
import queryString from 'query-string';
import './Contacts.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TopBar from './TopBar.js';

import 'bootstrap/dist/css/bootstrap.min.css';

class Contacts extends Component {

	constructor(props) {
		super(props);
		this.state = {
			contacts: [],
			numberOfContacts: 0
		};
	}

	componentDidMount() {
		let params = queryString.parse(this.props.location.search)
		const token = params.token;

		function getRandomColor() {
			let colors = ["#4287f5", "#ed5628", "#a38981", "#85786b", "#3d7d0f", "#1c3859", "#591c33"]
			return colors[Math.floor(Math.random()*colors.length)]
		}

		axios.get('https://www.google.com/m8/feeds/contacts/default/full?alt=json&oauth_token='+token+'&max-results=10000')
			.then( res => {
				let data = res.data.feed.entry;

				let contactsData = [];
				data.forEach( datum => {
					let name, email, tel, initials = "";
					if(datum.title.$t)
						name = datum.title.$t;
					else
						name = '-';
					if(datum["gd$email"])
						email = datum["gd$email"][0].address;
					else
						email = "-";

					if(datum["gd$phoneNumber"])
						tel = datum["gd$phoneNumber"][0].$t;
					else
						tel = "-";

					if(Object.keys(tel).length === 0) {
						tel = null;
					}

					if(name !== '-')
					{
						let nameArr = name.split(' ');
						if(nameArr[0])
							initials += nameArr[0][0];
						if(nameArr[1])
							initials += nameArr[1][0];
					}

					let background = getRandomColor();

					contactsData.push({name, email, tel, initials, background});
				});
				return contactsData;
			})
			.then( contacts => {
				this.setState({contacts: contacts,
								numberOfContacts: contacts.length});
			})

	}

	render() {
		
		let blueColor = { color: 'blue' };
		let smallerFont = { fontSize: '2rem', fontWeight: 200 };
		let greyFont = { color: 'gray'};
		return(
			<div>

				<TopBar />
				<div className="container">

					<div style={blueColor}>
						<h1>Contacts
						<span style={smallerFont}> ( {this.state.numberOfContacts} )</span>
						</h1>
						<br />
					</div>

					    <ul style={{'listStyleType':'none', 'paddingLeft': '0'}}>
					    	<li style={{'border':'0px', 'height': '2rem'}}>
					    		<Container fluid="md">
						    		<Row>
					    				<Col md={1} lg={1}></Col>
						    			<Col md={4} lg={4} style={greyFont}>
						    				Name
						    			</Col>
						    			<Col md={4} lg={4} style={greyFont}>Email</Col>
						    			<Col md={2} lg={2} style={greyFont}>Phone Number</Col>
						    			<Col md={1} lg={1}></Col>
					    			</Row>
					    		</Container>
					    	</li>
					    	{this.state.contacts.map((item, i) => {
						        return (
						        	<li className="contactsList" key={i}>
						        		<Container fluid="md" style={{'height':'100%'}}>
							            	<Row className="middle">
							            		<Col md={1} lg={1}></Col>
							            		<Col md={4} lg={4}>
							            			<div className="middle">
														<div className="circleAvatar" style={{'backgroundColor': item.background}}>
															<span style={{'color' : 'white'}}>
																<b>{item.initials}</b>
															</span>
														</div>
							            				<div style={{'paddingTop' : '0.6rem'}}><b>{item.name}</b></div>
							            			</div>
							            		</Col>
							              		<Col md={4} lg={4}>{item.email}</Col>
							              		<Col md={2} lg={2}><b>{item.tel}</b></Col>
							              		<Col md={1} lg={1}></Col>
							            	</Row>
						            	</Container>
						            </li>
						        );
						      })}
					    </ul>
				</div>
			   
			</div>
		)
	}
}

export default Contacts;