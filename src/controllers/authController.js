import bcrypt from 'bcrypt';
import { ApiError } from '../exceptions/ApiError.js';
import { User } from '../models/User.js';
import { jwtService } from '../services/jwtService.js';
import { tokenService } from '../services/tokenService.js';
import { userService } from '../services/userService.js';

function validateEmail(value) {
	if (!value) {
		return 'Email is required';
	}

	const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

	if (!emailPattern.test(value)) {
		return 'Email is not valid';
	}
}

function validatePassword(value) {
	if (!value) {
		return 'Password is required';
	}

	if (value.length < 6) {
		return 'At least 6 characters';
	}
}

function validateName(value) {
	if (!value) {
		return 'Name is required';
	}

	if (value.length < 3) {
		return 'At least 3 characters';
	}
}

function validateSurname(value) {
	if (!value) {
		return 'Surname is required';
	}

	if (value.length < 3) {
		return 'At least 3 characters';
	}
}

function validateGender(value) {
	const validGenders = ['male', 'female', 'other'];
	if (!validGenders.includes(value)) {
		return 'Invalid gender';
	}
}

function validateBuddyType(value) {
	if (!value) {
		return 'Buddy type is required';
	}

	if (value !== 'student' && value !== 'teacher') {
		return 'Invalid buddy type';
	}
}

function validateCanton(value) {
	const validCantons = [
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
		'ZH',
	];
	if (!validCantons.includes(value)) {
		return 'Invalid canton';
	}
}

function validateCountryOfOrigin(value) {
	if (value && value.length < 3) {
		return 'Country of origin should be at least 3 characters';
	}
}

function validateMotherTongue(value) {
	if (value && value.length < 3) {
		return 'Country of origin should be at least 3 characters';
	}
}

function validateHobbies(value) {
	if (value && value.length < 3) {
		return 'Hobbies should be at least 3 characters';
	}
}

function validateLanguagesToLearn(value) {
	const validLanguages = [
		'German',
		'French',
		'Italian',
		'English',
		'Swiss German',
	];
	if (!validLanguages.includes(value)) {
		return 'Invalid language to learn';
	}
}

async function register(req, res, next) {
	const {
		email,
		password,
		name,
    hobbies,
    gender,
		surname,
    motherTongue,
		buddyType,
		countryOfOrigin,
		canton,
		languagesToLearn,
	} = req.body;

	const errors = {
		email: validateEmail(email),
		password: validatePassword(password),
		name: validateName(name),
		surname: validateSurname(surname),
		buddyType: validateBuddyType(buddyType),
		countryOfOrigin: validateCountryOfOrigin(countryOfOrigin),
		languagesToLearn: validateLanguagesToLearn(languagesToLearn),
		canton: validateCanton(canton),
    motherTongue: validateMotherTongue(motherTongue),
    hobbies: validateHobbies(hobbies),
    gender: validateGender(gender),
	};

	if (
		errors.email ||
		errors.password ||
		errors.name ||
		errors.surname ||
    errors.gender ||
		errors.buddyType ||
		errors.canton ||
    errors.hobbies ||
		errors.languagesToLearn ||
    errors.motherTongue ||
		errors.countryOfOrigin
	) {
		throw ApiError.BadRequest('Validation error', errors);
	}

	await userService.register({
		email,
		password,
		name,
    gender,
		surname,
    hobbies,
		countryOfOrigin,
		buddyType,
    motherTongue,
		languagesToLearn,
		canton,
	});

	res.send({ message: 'OK' });
}

async function activate(req, res, next) {
	const { activationToken } = req.params;

	const user = await User.findOne({
		where: { activationToken },
	});

	if (!user) {
		res.sendStatus(404);
		return;
	}

	user.activationToken = null;
	await user.save();

	await sendAuthentication(res, user);
}

async function login(req, res, next) {
	const { email, password } = req.body;
	const user = await userService.getByEmail(email);

	if (!user) {
		throw ApiError.BadRequest('User with this email does not exist');
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		throw ApiError.BadRequest('Password is wrong');
	}

	await sendAuthentication(res, user);
}

async function refresh(req, res, next) {
	const { refreshToken } = req.cookies;
	const userData = jwtService.validateRefreshToken(refreshToken);

	if (!userData) {
		throw ApiError.Unauthorized();
	}

	const token = await tokenService.getByToken(refreshToken);

	if (!token) {
		throw ApiError.Unauthorized();
	}

	const user = await userService.getByEmail(userData.email);

	await sendAuthentication(res, user);
}

async function logout(req, res, next) {
	const { refreshToken } = req.cookies;
	const userData = jwtService.validateRefreshToken(refreshToken);

	res.clearCookie('refreshToken');

	if (userData) {
		await tokenService.remove(userData.id);
	}

	res.sendStatus(204);
}

async function sendAuthentication(res, user) {
	const userData = userService.normalize(user);
	const accessToken = jwtService.generateAccessToken(userData);
	const refreshToken = jwtService.generateRefreshToken(userData);

	await tokenService.save(user.id, refreshToken);

	res.cookie('refreshToken', refreshToken, {
		maxAge: 30 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: 'none',
		secure: true,
	});

	res.send({
		user: userData,
		accessToken,
	});
}

export const authController = {
	register,
	activate,
	login,
	logout,
	refresh,
};
