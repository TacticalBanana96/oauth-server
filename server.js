const express = require('express');
const bodyParser = require('body-parser');
const oauthserver = require('oauth2-server');
const AccessDeniedError = require('oauth2-server/lib/errors/access-denied-error');

const port = 3000;

const app = express();
const Request = oauthserver.Request;
const Response = oauthserver.Response;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const oauth = new oauthserver({
    model: require('./model'),
    grants: ['client_credentials']
});

app.all('/oauth/authenticate', (req, res, next)=> {
	let request = new Request(req);
	let response = new Response(res);

	oauth.authenticate(request, response)
	.then((token) => {
		res.locals.oauth = {token};
		res.send(token);
		next();
	}).catch((err) => {
		res.status(401).send();
		console.log(err);
	});
});

app.post('/oauth/token', (req, res, next) => {
	let request = new Request(req);
	let response = new Response(res);

	oauth.token(request, response)
	.then((token)=> {
		//res.locals.oauth = {token};
		res.json(token)
		next();
	})
	.catch((err)=> {
		res.status(err.statusCode).send();
		console.log(err);
	});
});

app.listen(port, ()=>{
  console.log(`app has started on port ${port}`);
});