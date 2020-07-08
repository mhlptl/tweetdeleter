const express = require('express');
const router = express.Router();
const { oauth, tokens } = require('../oauth');
const axios = require('axios').default;

router.get('/', (req, res) => {
	res.send('API Version 1');
});

let baseURL = 'https://api.twitter.com/1.1';


router.post('/deleteTweets/', (req, res) => {
	const data = [];
	const id = req.body.data;
	let idArr = id.split(',');

	for(let i = 0; i < idArr.length; i++) {

		const requestData = {
			url: baseURL + '/statuses/destroy/' +idArr[i] + '.json',
			method: 'POST'
		};

		let authorization = oauth.toHeader(oauth.authorize(requestData, tokens));

		axios({
			baseURL: baseURL,
			url: 'statuses/destroy/' + idArr[i] + '.json',
			method: 'post',
			headers: authorization
		})
		.then(response => {
			data.push({tweetID: idArr[i], statusText: response.statusText});
		})
		.catch(err => {
			data.push({tweetID: idArr[i], statusText: err.response.statusText});
		})
		.finally(() => {
			if(data.length === idArr.length) res.json({data: data});
		});
		
	}
});

module.exports = router;
