import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, NavLink } from 'react-router-dom';

import './styles.css';

import { AccountActivationPage } from './pages/AccountActivationPage';
import { AuthContext } from './components/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { RequireAuth } from './components/RequireAuth';
import { UsersPage } from './pages/UsersPage';
import { Loader } from './components/Loader.jsx';
import { usePageError } from './hooks/usePageError.js';
import HomePage from './pages/HomePage.jsx';
import Footer from './components/Footer.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import StudentMatchingPage from './pages/StudentMatchingPage.jsx';

function App() {
	const navigate = useNavigate();
	const [error, setError] = usePageError();
	const { isChecked, user, logout, checkAuth } = useContext(AuthContext);
	const [isNavOpen, setIsNavOpen] = useState(false);

	const handleNavToggle = () => {
		setIsNavOpen(!isNavOpen);
	};

	useEffect(() => {
		checkAuth();
	}, []);

	if (!isChecked) {
		return <Loader />;
	}

	return (
		<>
			<header>
				<div class='header-content'>
					<a href='/'>
						<img
							src='../images/buddy-logo.svg'
							alt='Buddy Logo'
						/>
					</a>
          
					<nav class='mobile-nav'>
						<button
							className='nav-toggle'
							aria-label='Open Navigation Menu'
							onClick={handleNavToggle}
						>
							☰
						</button>
						<ul class='nav-list'>
							<li>
								<NavLink to='#'>Home</NavLink>
							</li>
							{user && (
								<>
									<li>
										<NavLink to='#'>Find your Buddy</NavLink>
									</li>
									<li>
										<NavLink to='#'>Profile</NavLink>
									</li>
								</>
							)}
							{user ? (
								<li>
									<button
										onClick={() => {
											logout()
												.then(() => {
													navigate('/');
												})
												.catch((error) => {
													setError(error.response?.data?.message);
												});
										}}
									>
										Log out
									</button>
								</li>
							) : (
								<>
									<li>
										<button>
											<Link to='/sign-up'>Sign up</Link>
										</button>
									</li>
									<li>
										<button>
											<Link to='/login'>Log in</Link>
										</button>
									</li>
								</>
							)}
						</ul>
					</nav>
				</div>
			</header>

			<main>
				<section className='section'>
					<Routes>
						<Route
							path='/'
							element={<HomePage />}
						/>
						<Route
							path='sign-up'
							element={<RegistrationPage />}
						/>
						<Route
							path='activate/:activationToken'
							element={<AccountActivationPage />}
						/>
						<Route
							path='login'
							element={<LoginPage />}
						/>

						<Route
							path='/'
							element={<RequireAuth />}
						>
							<Route
								path='users'
								element={<UsersPage />}
							/>
              <Route
								path='profile'
								element={<ProfilePage />}
							/>
              <Route
								path='student-matching'
								element={<StudentMatchingPage />}
							/>
						</Route>
					</Routes>
				</section>

				{error && <p className='notification is-danger is-light'>{error}</p>}
			</main>
      <Footer />
		</>
	);
}

export default App;
