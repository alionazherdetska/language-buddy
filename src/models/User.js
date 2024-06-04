import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/db.js';

export const User = sequelize.define('user', {
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	surname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	activationToken: {
		type: DataTypes.STRING,
	},
	countryOfOrigin: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	buddyType: {
		type: DataTypes.ENUM('student', 'teacher'),
		allowNull: false,
	},
	canton: {
		type: DataTypes.ENUM(
			'AG',
			'AI',
			'AR',
			'BE',
			'BL',
			'BS',
			'FR',
			'GE',
			'GL',
			'GR',
			'JU',
			'LU',
			'NE',
			'NW',
			'OW',
			'SG',
			'SH',
			'SO',
			'SZ',
			'TG',
			'TI',
			'UR',
			'VD',
			'VS',
			'ZG',
			'ZH'
		),
		allowNull: false,
	},
	languagesToLearn: {
		type: DataTypes.ENUM(
			'German',
			'French',
			'Italian',
			'English',
			'Swiss German'
		),
		allowNull: true,
	},
	motherTongue: {
		type: DataTypes.ENUM(
			'German',
			'French',
			'Italian',
			'English',
			'Swiss German'
		),
		allowNull: true,
	},
	bio: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: true,
},
});
