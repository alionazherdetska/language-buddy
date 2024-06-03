import { Sequelize } from 'sequelize';

// Get the password from the environment variables
const password = process.env.POSTGRES_PASSWORD || '';

// Modify the password if it's empty
const modifiedPassword = password.length === 0 ? ' ' : password;

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: modifiedPassword,
});
