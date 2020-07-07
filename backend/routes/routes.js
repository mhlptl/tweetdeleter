const express = require('express');
const router = express.Router();
const OAuth = require('oauth-1.0a');
const { enc, HmacSHA1 } = require('crypto-js');
const axios = require('axios').default;

let tokens = {
	key: process.env.access_token_key,
	secret: process.env.access_token_secret
};

let hash_function = (base_string, key) => {
	return HmacSHA1(base_string, key).toString(enc.Base64);
}

const oauth = new OAuth({
	consumer: {
		key: process.env.consumer_key,
		secret: process.env.consumer_secret
	},
	signature_method: 'HMAC-SHA1',
	hash_function: hash_function
});

router.get('/', (req, res) => {
	res.send('API Version 1');
});

let baseURL = 'https://api.twitter.com/1.1';

router.post('/deleteTweets/', (req, res) => {
	const id = req.body.data;
	let idArr = id.split(',');

	let numErrs = 0;
	for(let i = 0; i < idArr.length; i++) {
		const requestData = {
			url: 'https://api.twitter.com/1.1/statuses/destroy/'+idArr[i]+'.json',
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
			console.log(response);
		})
		.catch(numErrs++)
		.finally(res.send({successfulDeletions: idArr.length - numErrs, unsuccessfulDeletions: numErrs}));
	}
});

module.exports = router;
