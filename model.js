const jwt = require('jsonwebtoken');

const secretKey = 'SOME SECRET';

const clients = [
	{
		clientId: '1',
		clientSecret: '123abc',
		redirectUri: '',
		grants: ['client_credentials', 'password']
	}
];

const users = [
	{
		id: '123',
		username: 'AndrewEvans',
		password: '12345'
	}
];

const tokens = [
	{
		accessToken: 'uhflsuhflusfhwsy249yoh0834h',
		accessTokenExpiresAt: new Date(2018, 9, 20),
		scope: 'READ',
		client: { id: '1' },
		user: { id: '123' }
	}
];

const generateAccessToken = (client, user, scope) => {
	let token = jwt.sign({ user: user.id, scope }, secretKey, {
		expiresIn: 3600,
		subject: client.id
	});
	return token;
};

const getClient = (clientId, clientSecret) => {
	let client = clients.filter(client => client.clientId === clientId && client.clientSecret === clientSecret);

	return {
		id: client[0].clientId,
		redirectUris: client[0].redirectUri,
		grants: client[0].grants,
		clientSecret: client[0].clientSecret
	};
};

const getUserFromClient = client => {
	if (client) {
		return users[0];
	}
};

const saveToken = (token, client, user) => {
	tokens.push({
		accessToken: token.accessToken,
		accessTokenExpiresAt: token.accessTokenExpiresAt,
		scope: token.scope,
		client: { id: client.id },
		user: { id: user.id }
	});
	return tokens[tokens.length - 1];
};

//Checks if the scope is valid for the client/user combination
const validateScope = (user, client, scope) => {
	return scope;
};

const getAccessToken = accessToken => {
	let tokenRes = tokens.filter(token => token.accessToken === accessToken);
	let clientRes = clients.filter(client => client.clientId === tokenRes[0].client.id);
	let userRes = users.filter(user => user.id === tokenRes[0].user.id);
	return {
		accessToken: tokenRes[0].accessToken,
		accessTokenExpiresAt: tokenRes[0].accessTokenExpiresAt,
		scope: tokenRes[0].scope,
		client: clientRes[0],
		user: userRes[0]
	};
};

//Checks if access token was authorized the requested scopes
const verifyScope = (accessToken, scope) => {
	return true;
};


const generateRefreshToken = (client, user, scope) => {
    let token = jwt.sign({ user: user.id, scope }, secretKey, {
		subject: client.id
	});
	return token;
}
const getUser = (username, password) => {
    let userRes = users.filter(user => user.username === username && user.password === password);

	return {
        id: userRes[0].id,
        username: userRes[0].username,
        password: userRes[0].password
	};
}

module.exports = {
	generateAccessToken,
	getClient,
	getUserFromClient,
	saveToken,
	validateScope,
	getAccessToken,
    verifyScope,
    generateRefreshToken,
    getUser
};
