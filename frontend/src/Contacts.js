import React, {Component , Fragment } from 'react';
import axios from "axios";
import queryString from 'query-string';
import { useTable } from 'react-table';
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

		axios.get('https://www.google.com/m8/feeds/contacts/default/full?alt=json&oauth_token='+token+'&max-results=10000')
			.then( res => {
				let data = res.data.feed.entry;
				console.log(data);

				let contactsData = [];
				data.forEach( datum => {
					let name, email, tel = {};
					name = datum.title.$t;
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

					contactsData.push({name, email, tel});
				});
				return contactsData;
			})
			.then( contacts => {
				console.log(contacts);
				this.setState({contacts: contacts,
								numberOfContacts: contacts.length});
			})

	}

	render() {
		
		let contacts = this.state.contacts;
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
														<div className="circleAvatar"></div>
							            				<div><b>{item.name}</b></div>
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