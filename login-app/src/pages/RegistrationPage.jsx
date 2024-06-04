import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';

import { authService } from '../services/authService.js';
import { usePageError } from '../hooks/usePageError.js';

function validateEmail(value) {
	if (!value) {
		return 'Email is required';
	}

	const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

	if (!emailPattern.test(value)) {
		return 'Email is not valid';
	}
}

const validatePassword = (value) => {
	if (!value) {
		return 'Password is required';
	}

	if (value.length < 6) {
		return 'At least 6 characters';
	}
};

const validateName = (value) => {
	if (!value) {
		return 'Name is required';
	}

	if (value.length < 3) {
		return 'At least 3 characters';
	}
};

const validateSurname = (value) => {
	if (!value) {
		return 'Surname is required';
	}

	if (value.length < 3) {
		return 'At least 3 characters';
	}
};

export const RegistrationPage = () => {
	const [error, setError] = usePageError('');
	const [registered, setRegistered] = useState(false);
	const [shown, setShown] = useState(false);
	const [buddyType, setBuddyType] = useState('');

	if (registered) {
		return (
			<section className='content'>
				<h1 className='title'>Check your email</h1>
				<p>We have sent you an email with the activation link</p>
			</section>
		);
	}

	return (
		<>
			<Formik
				initialValues={{
					email: '',
					motherTongue: '',
					password: '',
					name: '',
					surname: '',
					buddyType: '',
					bio: '',
					countryOfOrigin: '',
					languagesToLearn: '',
					canton: '',
					gender: '',
				}}
				validate={(values) => {
					const errors = {};

					const emailError = validateEmail(values.email);
					if (emailError) errors.email = emailError;

					const passwordError = validatePassword(values.password);
					if (passwordError) errors.password = passwordError;

					const nameError = validateName(values.name);
					if (nameError) errors.name = nameError;

					const surnameError = validateSurname(values.surname);
					if (surnameError) errors.surname = surnameError;

					if (!values.buddyType) {
						errors.buddyType = 'Buddy Type is required';
					}

					if (values.buddyType === 'teacher') {
						if (!values.motherTongue) {
							errors.motherTongue = 'Mother Tongue is required';
						}
					}

					if (values.buddyType === 'student') {
						if (!values.languagesToLearn) {
							errors.languagesToLearn = 'Languages to Learn';
						}
					}

					if (!values.canton) {
						errors.canton = 'Canton is required';
					}

					return errors;
				}}
				validateOnMount={true}
				onSubmit={(
					{
						email,
						password,
						name,
						surname,
						motherTongue,
						buddyType,
						bio,
						countryOfOrigin,
						languagesToLearn,
						canton,
						gender,
					},
					formikHelpers
				) => {
					formikHelpers.setSubmitting(true);

					const payload = {
						email,
						password,
						name,
						surname,
						buddyType,
						bio,
						motherTongue: buddyType === 'teacher' ? motherTongue : 'German',
						languagesToLearn:
							buddyType === 'student' ? languagesToLearn : 'German',
						countryOfOrigin,
						canton,
						gender,
					};

					authService
						.register(payload)
						.then(() => {
							setRegistered(true);
						})
						.catch((error) => {
							if (error.message) {
								setError(error.message);
							}

							if (!error.response?.data) {
								return;
							}

							const { errors, message } = error.response.data;

							formikHelpers.setFieldError('email', errors?.email);
							formikHelpers.setFieldError('password', errors?.password);
							formikHelpers.setFieldError('name', errors?.name);
							formikHelpers.setFieldError('surname', errors?.surname);

							if (message) {
								setError(message);
							}
						})
						.finally(() => {
							formikHelpers.setSubmitting(false);
						});
				}}
			>
				{({ touched, errors, isSubmitting, setFieldValue }) => (
					<Form className='registrationForm'>
						<h1 className='title'>Sign up</h1>
						<p>Sign up in two steps</p>
						<section
							id='step1'
							className='step active'
						>
							<h2>Step 1</h2>
							<label
								htmlFor='name'
								className='label'
							>
								Name
							</label>

							<div className='control has-icons-left has-icons-right'>
								<Field
									validate={validateName}
									name='name'
									type='text'
									id='name'
									placeholder='e.g. Bob'
									className={cn('input', {
										'is-danger': touched.name && errors.name,
									})}
								/>

								<span className='icon is-small is-left'>
									<i className='fa fa-user'></i>
								</span>

								{touched.name && errors.name && (
									<span className='icon is-small is-right has-text-danger'>
										<i className='fas fa-exclamation-triangle'></i>
									</span>
								)}
							</div>

							{touched.name && errors.name && (
								<p className='help is-danger'>{errors.name}</p>
							)}

							<div className='field'>
								<label
									htmlFor='surname'
									className='label'
								>
									Surname
								</label>

								<div className='control has-icons-left has-icons-right'>
									<Field
										validate={validateSurname}
										name='surname'
										type='text'
										id='surname'
										placeholder='e.g. Smith'
										className={cn('input', {
											'is-danger': touched.surname && errors.surname,
										})}
									/>

									<span className='icon is-small is-left'>
										<i className='fa fa-user'></i>
									</span>

									{touched.surname && errors.surname && (
										<span className='icon is-small is-right has-text-danger'>
											<i className='fas fa-exclamation-triangle'></i>
										</span>
									)}
								</div>

								{touched.surname && errors.surname && (
									<p className='help is-danger'>{errors.surname}</p>
								)}
							</div>
							<div className='field'>
								<label
									htmlFor='gender'
									className='label'
								>
									Gender
								</label>
								<div className='control'>
									<Field
										as='select'
										name='gender'
										id='gender'
										className='select'
									>
										<option value=''>Select Gender</option>
										<option value='male'>Male</option>
										<option value='female'>Female</option>
										<option value='other'>Other</option>
									</Field>
								</div>
								{touched.gender && errors.gender && (
									<p className='help is-danger'>{errors.gender}</p>
								)}
							</div>
							<div className='field'>
								<label
									htmlFor='email'
									className='label'
								>
									Email
								</label>

								<div className='control has-icons-left has-icons-right'>
									<Field
										validate={validateEmail}
										name='email'
										type='email'
										id='email'
										placeholder='e.g. bobsmith@gmail.com'
										className={cn('input', {
											'is-danger': touched.email && errors.email,
										})}
									/>

									<span className='icon is-small is-left'>
										<i className='fa fa-envelope'></i>
									</span>

									{touched.email && errors.email && (
										<span className='icon is-small is-right has-text-danger'>
											<i className='fas fa-exclamation-triangle'></i>
										</span>
									)}
								</div>

								{touched.email && errors.email && (
									<p className='help is-danger'>{errors.email}</p>
								)}
							</div>
							<div className='field'>
								<label
									htmlFor='password'
									className='label'
								>
									Password
								</label>

								<div className='control has-icons-left has-icons-right'>
									<Field
										validate={validatePassword}
										name='password'
										type='password'
										id='password'
										placeholder='*******'
										className={cn('input', {
											'is-danger': touched.password && errors.password,
										})}
									/>
									{touched.password && errors.password ? (
										<p className='help is-danger'>{errors.password}</p>
									) : (
										<p className='help'>At least 6 characters</p>
									)}

									<span className='icon is-small is-left'>
										<i className='fa fa-lock'></i>
									</span>

									{touched.password && errors.password && (
										<span className='icon is-small is-right has-text-danger'>
											<i className='fas fa-exclamation-triangle'></i>
										</span>
									)}
								</div>
							</div>
						</section>
						<div class='btn-container'>
							<button
								type='button'
								onClick={() => setShown(!shown)}
							>
								Next
							</button>
						</div>

						<section
							id='step2'
							className={shown ? 'step.active' : 'step'}
						>
							<h2 className='formh'>Step 2</h2>
							<div className='field'>
								<label
									htmlFor='buddyType'
									className='label'
								>
									Buddy Type
								</label>
								<div className='control'>
									<Field
										as='select'
										name='buddyType'
										id='buddyType'
										className='select'
										onChange={(e) => {
											setFieldValue('buddyType', e.target.value);
											setBuddyType(e.target.value);
											console.log(e.target.value);
										}}
									>
										<option value=''>Select Buddy Type</option>
										<option value='student'>Student</option>
										<option value='teacher'>Teacher</option>
									</Field>
								</div>
								{touched.buddyType && errors.buddyType && (
									<p className='help is-danger'>{errors.buddyType}</p>
								)}
							</div>

							{buddyType === 'student' && (
								<div className='field'>
									<label
										htmlFor='languagesToLearn'
										className='label'
									>
										Languages to learn
									</label>
									<div className='control'>
										<Field
											as='select'
											name='languagesToLearn'
											id='languagesToLearn'
											required
											className={cn('select', {
												'is-danger':
													touched.languagesToLearn && errors.languagesToLearn,
											})}
										>
											<option value=''>Select Languages to Learn</option>
											<option value='German'>German</option>
											<option value='French'>French</option>
											<option value='Italian'>Italian</option>
											<option value='English'>English</option>
											<option value='Swiss German'>Swiss German</option>
										</Field>
									</div>
									{touched.languagesToLearn && errors.languagesToLearn && (
										<p className='help is-danger'>{errors.languagesToLearn}</p>
									)}
								</div>
							)}

							{buddyType === 'teacher' && (
								<div className='field'>
									<label
										htmlFor='motherTongue'
										className='label'
									>
										Mother Tongue
									</label>
									<div className='control'>
										<Field
											as='select'
											name='motherTongue'
											id='motherTongue'
											required
											className={cn('select', {
												'is-danger':
													touched.motherTongue && errors.motherTongue,
											})}
										>
											<option value=''>Select your Mother Tongue</option>
											<option value='German'>German</option>
											<option value='French'>French</option>
											<option value='Italian'>Italian</option>
											<option value='English'>English</option>
											<option value='Swiss German'>Swiss German</option>
										</Field>
									</div>
									{touched.motherTongue && errors.motherTongue && (
										<p className='help is-danger'>{errors.motherTongue}</p>
									)}
								</div>
							)}

							<div className='field'>
								<label
									htmlFor='countryOfOrigin'
									className='label'
								>
									Country of Origin
								</label>
								<div className='control'>
									<Field
										name='countryOfOrigin'
										type='text'
										id='countryOfOrigin'
										placeholder='e.g. USA'
										className={cn('input', {
											'is-danger':
												touched.countryOfOrigin && errors.countryOfOrigin,
										})}
									/>
								</div>
								{touched.countryOfOrigin && errors.countryOfOrigin && (
									<p className='help is-danger'>{errors.countryOfOrigin}</p>
								)}
							</div>

							<div className='field'>
								<label
									htmlFor='canton'
									className='label'
								>
									Canton
								</label>
								<div className='control'>
									<Field
										as='select'
										name='canton'
										id='canton'
										required
										className={cn('select', {
											'is-danger': touched.canton && errors.canton,
										})}
									>
										<option value=''>Select Canton</option>
										<option value='AG'>Aargau (AG)</option>
										<option value='AI'>Appenzell Innerrhoden (AI)</option>
										<option value='AR'>Appenzell Ausserrhoden (AR)</option>
										<option value='BE'>Bern (BE)</option>
										<option value='BL'>Basel-Landschaft (BL)</option>
										<option value='BS'>Basel-Stadt (BS)</option>
										<option value='FR'>Fribourg (FR)</option>
										<option value='GE'>Geneva (GE)</option>
										<option value='GL'>Glarus (GL)</option>
										<option value='GR'>Graubünden (GR)</option>
										<option value='JU'>Jura (JU)</option>
										<option value='LU'>Lucerne (LU)</option>
										<option value='NE'>Neuchâtel (NE)</option>
										<option value='NW'>Nidwalden (NW)</option>
										<option value='OW'>Obwalden (OW)</option>
										<option value='SG'>St. Gallen (SG)</option>
										<option value='SH'>Schaffhausen (SH)</option>
										<option value='SO'>Solothurn (SO)</option>
										<option value='SZ'>Schwyz (SZ)</option>
										<option value='TG'>Thurgau (TG)</option>
										<option value='TI'>Ticino (TI)</option>
										<option value='UR'>Uri (UR)</option>
										<option value='VD'>Vaud (VD)</option>
										<option value='VS'>Valais (VS)</option>
										<option value='ZG'>Zug (ZG)</option>
										<option value='ZH'>Zurich (ZH)</option>
									</Field>
								</div>
								{touched.canton && errors.canton && (
									<p className='help is-danger'>{errors.canton}</p>
								)}
							</div>

							<div className='field'>
								<label
									htmlFor='bio'
									className='label'
								>
									Bio
								</label>
								<div className='control'>
									<Field
										as='textarea'
										name='bio'
										cols='5'
										rows='5'
										id='bio'
										placeholder='I am...'
										className={cn('textarea', {
											'is-danger': touched.bio && errors.bio,
										})}
									/>
								</div>
								{touched.bio && errors.bio && (
									<p className='help is-danger'>{errors.bio}</p>
								)}
							</div>

							<div class='btn-container'>
								<div className='field'>
									<button
										type='submit'
										className={cn('button is-success has-text-weight-bold', {
											'is-loading': isSubmitting,
										})}
										disabled={
											isSubmitting ||
											errors.email ||
											errors.password ||
											errors.name ||
											errors.surname
										}
									>
										Sign up
									</button>
								</div>
							</div>
						</section>
						<p>
							Already have an account? <Link to='/login'>Log in</Link>{' '}
						</p>
					</Form>
				)}
			</Formik>

			{error && <p className='notification is-danger is-light'>{error}</p>}
		</>
	);
};
