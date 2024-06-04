import { authClient } from '../http/authClient.js';

function register({
	email,
	password,
	name,
	surname,
	gender,
	motherTongue,
	hobbies,
	buddyType,
	languagesToLearn,
	countryOfOrigin,
	canton,
}) {
	return authClient.post('/registration', {
		email,
		password,
		motherTongue,
		name,
		gender,
		surname,
		hobbies,
		buddyType,
		countryOfOrigin,
		languagesToLearn,
		canton,
	});
}

async function login({ email, password }) {
  const response = await authClient.post('/login', { email, password });
  localStorage.setItem('userEmail', email);
  console.log(localStorage)
  
  return response;
}

function logout() {
  localStorage.removeItem('userEmail');
	return authClient.post('/logout');
}

function activate(activationToken) {
	return authClient.get(`/activation/${activationToken}`);
}

function refresh() {
	return authClient.get('/refresh');
}

export const authService = { register, login, logout, activate, refresh };
