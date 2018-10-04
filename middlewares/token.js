const oauthserver = require('oauth2-server');

const oauth = require('./../oauth');

const Request = oauthserver.Request;
const Response = oauthserver.Response;

module.exports = (req, res, next) => {
	let request = new Request(req);
	let response = new Response(res);

	oauth
		.token(request, response)
		.then(token => {
			//res.locals.oauth = {token};
			res.json(token);
			next();
		})
		.catch(err => {
			res.status(err.statusCode).send();
			console.log(err);
		});
};
