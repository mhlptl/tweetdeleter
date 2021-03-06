import React, { Component } from 'react';
import Display from './Display';

class Main extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			ids: '',
			error: '',
			data: []
		}
	}

	componentWillUnmount() {
		this.apiCall();
	}

	apiCall = (data) => {

		let init = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};

		fetch('/deleteTweets', init)
		.then(response => {
			return response.json()
		})
		.then(result => {
			this.setState({data: result.data});
		});
	}
	
	handleChange = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		this.setState({[name]: value, error: ''});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let ids = this.state.ids;
		let regex = /^([0-9]{18}[\n]?)+/;
		if(!ids.match(regex)) {
			this.setState({error: 'Invalid Input'});
			return false;
		}
		let numIds = ids.split('\n').length;
		if(numIds > 25) {
			this.setState({error: 'Please do not input more than 25 IDs'});
			return false;
		}

		this.apiCall({data: ids});
	}

	deleteMore = () => {
		this.setState({data: [], ids: ''});
	}

	render() {

		const { ids, error, data } = this.state;

		return (
			<Display 
			ids={ids} 
			error={error} 
			data={data} 
			handleChange={this.handleChange} 
			handleSubmit={this.handleSubmit}
			deleteMore={this.deleteMore}
			/>
		)
	}
}

export default Main;