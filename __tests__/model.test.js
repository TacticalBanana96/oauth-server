const model = require('./../model');

const clients = [
	{
		id: '1',
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
const tokenObj = {
	accessToken: 'uhflsuhflusfhwsy249yoh0834h',
	accessTokenExpiresAt: new Date(2018, 9, 20).getTime(),
	scope: 'READ'
};

describe('generateAccessToken', () => {
	test('Should return an access token for the data passed', () => {
		token = model.generateAccessToken(clients[0], users[0], 'READ');
		expect(typeof token).toBe('string');
	});
});

describe('getClient', () => {
	test('Should return client matching parameters passed', () => {
		expect(model.getClient(clients[0].id, clients[0].clientSecret)).toEqual(expect.objectContaining({ id: clients[0].id }));
	});

	//   test('Should not return client for invalid parameters', () => {
	//     expect(model.getClient('989', 'fdosi')).catch((err)=> {
	//         expect(err).toBeTruthy();
	//     })
	//   });
});

describe('getUserFromClient', () => {
	test('Should return a user for the client object passed', () => {
		expect(typeof model.getUserFromClient(clients[0])).toBe('object');
	});
});

describe('saveToken', () => {
	test('Should return token object', () => {
		let res = model.saveToken(tokenObj, clients[0], users[0]);
		//console.log(res);
		expect(typeof res).toBe('object');
	});
});

describe('getAccessToken', () => {
	test('Should return accessToken object for the token passed', () => {
		let res = model.getAccessToken(tokenObj.accessToken);
		// console.log('getAccessToken:', res);
		expect(res).toEqual(expect.objectContaining({ accessToken: tokenObj.accessToken }));
	});
});

describe('generateRefreshToken', () => {
  test('Should generate a refresh token of type string', () => {
    expect(typeof model.generateRefreshToken(clients[0], users[0], 'READ')).toBe('string');
  });
});

describe('getUser', () => {
  test('Should return a user matching the parameters passed', () => {
    expect(model.getUser(users[0].username, users[0].password)).toEqual(expect.objectContaining({username :users[0].username, password: users[0].password}))
  });
});
describe('validateScope', () => {});
describe('verifyScope', () => {});
