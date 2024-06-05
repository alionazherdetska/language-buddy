import { Sequelize } from 'sequelize';

// Get the password from the environment variables
const password = 'test' || '';

// Modify the password if it's empty
const modifiedPassword = password.length === 0 ? ' ' : password;

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  username: 'postgres',
  password: modifiedPassword,
});