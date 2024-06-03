import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/db.js';
import { User } from './User.js';
import { config } from 'dotenv';

config();

export const Token = sequelize.define('token', {
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Token.belongsTo(User);
User.hasOne(Token);
