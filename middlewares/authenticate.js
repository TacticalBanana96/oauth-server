const oauthserver = require('oauth2-server');

const oauth = require('./../oauth');

const Request = oauthserver.Request;
const Response = oauthserver.Response;

module.exports = (req, res, next) => {
	let request = new Request(req);
	let response = new Response(res);

	oauth
		.authenticate(request, response)
		.then(token => {
			res.locals.oauth = { token };
			res.send(token);
			next();
		})
		.catch(err => {
			res.status(401).send();
			console.log(err);
		});
};
