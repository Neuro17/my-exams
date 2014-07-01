'use strict';

// config/auth.js

// expose our config directly to our application using module.exports

module.exports = {

	'facebookAuth' : {
		'clientID' 		: 'your-secret-clientID-here', // your App ID
		'clientSecret' 	: 'your-client-secret-here', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: '853797576472-774irk8peaqkjq6013a593jbf6934iv2.apps.googleusercontent.com',
		'clientSecret' 	: '2TnNNdas2rlVbU9avh6hHHrq',
		'callbackURL' 	: 'http://127.0.0.1:9000/oauth2callback'
	}

};