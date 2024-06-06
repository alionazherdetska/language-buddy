import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { AuthContext } from '../components/AuthContext.jsx';
import { Loader } from '../components/Loader.jsx';

export const AccountActivationPage = () => {
	const [error, setError] = useState('');
	const [done, setDone] = useState(false);

	const { activate } = useContext(AuthContext);
	const { activationToken } = useParams();

	useEffect(() => {
		activate(activationToken)
			.catch((error) => {
				setError(error.response?.data?.message || `Wrong activation link`);
			})
			.finally(() => {
				setDone(true);
			});
	}, []);

	if (!done) {
		return <Loader />;
	}

	return (
		<section className='succesfulRegistration'>
			<h1>Account activation</h1>

			{error ? (
				<p className='notification is-danger is-light'>{error}</p>
			) : (
				<>
					<p className='notification is-success is-light'>
						Your account is now active
					</p>
						<Link className='activation-link' to='/login'>Log in</Link>
				</>
			)}
		</section>
	);
};
