import { httpClient } from '../http/httpClient.js';

function getAll() {
  return httpClient.get('/users');
}

function getByEmail(email) {
  return getAll().then(response => {
    const users = response.data;
    return users.find(user => user.email === email);
  });
}

export const userService = { getAll, getByEmail };
