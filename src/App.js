import React, {Component} from 'react';

class App extends Component {

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
		ids = ids.split('\n').join('');
		let regex = /^([0-9]{18}[,]?)+/;
		if(!ids.match(regex)) {
			this.setState({error: 'Invalid Input'});
			return false;
		}
		let numIds = ids.split(',').length;
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

		if(data.length === 0) {
			return (
				<form onSubmit={this.handleSubmit}>
					<textarea 
					placeholder={'Tweet Ids (Separated by comma)'} 
					value={ids} 
					name={'ids'} 
					onChange={this.handleChange}
					id={'id-input'}
					/><br/>
					{error && <p id={'error'}>{error}</p>}
					<input
					type={'submit'} 
					value={'Delete'}
					id={'button'}
					/>
				</form>
			)
		}
		else {
			return (
				<React.Fragment>
					<ul id={'deletion-data'}>
						{data.map((status, index) => {
							return <li key={index}>{status.tweetID + '\t' + status.statusText}</li>
						})}
					</ul>
					<input type={'button'}
					value={'Delete More'}
					id={'button'}
					onClick={this.deleteMore}
					/>
				</React.Fragment>
			)
		}
	}
}

export default App;
