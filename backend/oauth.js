const OAuth = require('oauth-1.0a');
const { enc, HmacSHA1 } = require('crypto-js');

class oauthHelperClass {
	static tokens = {
		key: process.env.access_token_key,
		secret: process.env.access_token_secret
	};

	static hash_function = (base_string, key) => {
		return HmacSHA1(base_string, key).toString(enc.Base64);
	};

	static oauth = new OAuth({
		consumer: {
			key: process.env.consumer_key,
			secret: process.env.consumer_secret
		},
		signature_method: 'HMAC-SHA1',
		hash_function: this.hash_function
	});
}

module.exports = oauthHelperClass;