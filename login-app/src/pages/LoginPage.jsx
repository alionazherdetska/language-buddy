import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';

import { AuthContext } from '../components/AuthContext.jsx';
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

function validatePassword(value) {
	if (!value) {
		return 'Password is required';
	}

	if (value.length < 6) {
		return 'At least 6 characters';
	}
}

export const LoginPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [error, setError] = usePageError('');
	const { login } = useContext(AuthContext);

	return (
		<>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validateOnMount={true}
				onSubmit={({ email, password }) => {
					return login({ email, password })
						.then(() => {
							navigate(location.state?.from?.pathname || '/student-matching');
						})
						.catch((error) => {
							setError(error.response?.data?.message);
						});
				}}
			>
				{({ touched, errors, isSubmitting }) => (
					<Form className='registrationForm'>
						<h1 className='title'>Log in</h1>
						<div className='field control has-icons-left'>
							<label
								htmlFor='email'
								className='label is-small'
							>
								Email
							</label>

							<div className='input-field control'>
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
						<div className='control has-icons-left input-field'>
							<label
								htmlFor='password'
								className='label is-small'
							>
								Password
							</label>

							<div className='input-field control'>
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

								<span className='icon is-small is-left'>
									<i className='fa fa-lock'></i>
								</span>
								{touched.password && errors.password && (
									<span className='icon is-small is-right has-text-danger'>
										<i className='fas fa-exclamation-triangle'></i>
									</span>
								)}
							</div>
							{touched.password && errors.password && (
								<p className='help is-danger'>{errors.password}</p>
							)}
						</div>
						<div className='field'>
							<button
								type='submit'
								disabled={isSubmitting || errors.email || errors.password}
							>
								Log in
							</button>
						</div>
						Do not have an account?
						<Link
							className='activation-link'
							to='/sign-up'
						>
							Sign up
						</Link>
					</Form>
				)}
			</Formik>

			{error && <p className='notification is-danger is-light'>{error}</p>}
		</>
	);
};
