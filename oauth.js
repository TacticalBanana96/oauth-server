const oauthserver = require('oauth2-server');

const oauth = new oauthserver({
	model: require('./model'),
	grants: ['client_credentials']
});

module.exports = oauth;
