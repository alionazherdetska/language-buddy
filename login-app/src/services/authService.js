import { authClient } from '../http/authClient.js';

function register({
	email,
	password,
	name,
	surname,
  motherTongue,
  hobbies,
	buddyType,
  languagesToLearn,
	countryOfOrigin,
  canton
}) {
	return authClient.post('/registration', {
		email,
		password,
    motherTongue,
		name,
		surname,
    hobbies,
		buddyType,
		countryOfOrigin,
    languagesToLearn,
    canton
	});
}

function login({ email, password }) {
	return authClient.post('/login', { email, password });
}

function logout() {
	return authClient.post('/logout');
}

function activate(activationToken) {
	return authClient.get(`/activation/${activationToken}`);
}

function refresh() {
	return authClient.get('/refresh');
}

export const authService = { register, login, logout, activate, refresh };
