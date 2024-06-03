import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { emailService } from '../services/emailService.js';
import { ApiError } from '../exceptions/ApiError.js';
import { User } from '../models/User.js';

function getAllActive() {
	return User.findAll({
		where: { activationToken: null },
		order: ['id'],
	});
}

function getByEmail(email) {
	return User.findOne({
		where: { email },
	});
}

function normalize({
	id,
	email,
	name,
  surname,
	canton,
  gender,
	languagesToLearn,
	buddyType,
	motherTongue,
  hobbies,
  countryOfOrigin,
}) {
	return {
		id,
		email,
		name,
    surname,
		canton,
    gender,
		languagesToLearn,
		buddyType,
		motherTongue,
    hobbies,
    countryOfOrigin,
	};
}

async function register({
	email,
	password,
	name,
	surname,
  gender,
	countryOfOrigin,
	buddyType,
	motherTongue,
	hobbies,
	languagesToLearn,
	canton,
}) {
	const existingUser = await getByEmail(email);

	if (existingUser) {
		throw ApiError.BadRequest('Validation error', {
			email: 'Email is already taken',
		});
	}

	const activationToken = uuidv4();
	const hash = await bcrypt.hash(password, 10);

	await User.create({
		email,
		password: hash,
		activationToken,
		name,
    gender,
		surname,
		countryOfOrigin,
		buddyType,
		motherTongue,
		hobbies,
		languagesToLearn,
		canton,
	});

	await emailService.sendActivationLink(email, activationToken);
}

export const userService = {
	getAllActive,
	normalize,
	getByEmail,
	register,
};

uuidv4();
