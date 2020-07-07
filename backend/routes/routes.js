const express = require('express');
const router = express.Router();
const { oauth, tokens } = require('../oauth');
const axios = require('axios').default;

function timeoutPromise(ms, promise) {
	return new Promise((resolve, reject) => {
	  const timeoutId = setTimeout(() => {
		reject(new Error("promise timeout"))
	  }, ms);
	  promise.then(
		(res) => {
		  clearTimeout(timeoutId);
		  resolve(res);
		},
		(err) => {
		  clearTimeout(timeoutId);
		  reject(err);
		}
	  );
	})
  }

router.get('/', (req, res) => {
	res.send('API Version 1');
});

let baseURL = 'https://api.twitter.com/1.1';
router.post('/deleteTweets/', (req, res) => {
	const id = req.body.data;
	let idArr = id.split(',');
	console.log(idArr.length);
	let numSuccesses = 0;
	for(let i = 0; i < idArr.length; i++) {
		const requestData = {
			url: 'https://api.twitter.com/1.1/statuses/destroy/'+idArr[i]+'.json',
			method: 'POST'
		};
		let authorization = oauth.toHeader(oauth.authorize(requestData, tokens));

		timeoutPromise(5000,
			axios({
			baseURL: baseURL,
			url: 'statuses/destroy/' + idArr[i] + '.json',
			method: 'post',
			headers: authorization
		}))
		.then(response => {
			console.log(response.statusText);
			numSuccesses++
		})
		.catch(err => {
			console.log(err.response.statusText);
		})
	}
	res.send({successfulDeletions: numSuccesses, unsuccessfulDeletions: idArr.length - numSuccesses})
});

module.exports = router;
