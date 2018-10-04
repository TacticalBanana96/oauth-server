const express = require('express');
const bodyParser = require('body-parser');
const oauthserver = require('oauth2-server');
const AccessDeniedError = require('oauth2-server/lib/errors/access-denied-error');

const authenticate = require('./middlewares/authenticate');
const token = require('./middlewares/token');
const oauth = require('./oauth');

const port = 8080;

const app = express();
const Request = oauthserver.Request;
const Response = oauthserver.Response;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.all('/oauth/authenticate', authenticate, (req, res) => {});
app.post('/oauth/token', token, (req, res) => {});


app.listen(port, () => {
	console.log(`app has started on port ${port}`);
});


