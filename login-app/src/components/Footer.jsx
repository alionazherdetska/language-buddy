import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const Footer = () => {
	const { user } = useContext(AuthContext);

	return (
		<footer>
			<div className='content'>
				<section>
					<Link
						className='logo'
						to='/'
					>
						<img
							src='../images/buddy-logo.svg'
							alt='Buddy Logo'
						/>
					</Link>
					<p>The only website you need to learn language in Switzerland</p>
					<button>
						<Link to='/sign-up'>Join today</Link>
					</button>
				</section>
				<section>
					<nav className='bottom'>
						<ul>
							<li>
								<Link to='/'>Home</Link>
							</li>
							<li>
								<Link to={user ? '/student-matching' : '/sign-up'}>
									Find your Buddy
								</Link>
							</li>
							<li>
								<Link to={user ? '/profile' : '/sign-up'}>Profile</Link>
							</li>
						</ul>
					</nav>
				</section>
				<section>
					<p>Follow us</p>
					<p className='icons'>
						<Link to='#'>
							<img
								src='../images/icons/facebook.svg'
								alt=''
							/>
						</Link>
						<Link to='#'>
							<img
								src='../images/icons/instagram.svg'
								alt=''
							/>
						</Link>
						<Link to='#'>
							<img
								src='../images/icons/twitter-x.svg'
								alt=''
							/>
						</Link>
					</p>
				</section>
				<p>&copy; 2024 Buddly - Your Language Buddy</p>
			</div>
		</footer>
	);
};

export default Footer;
