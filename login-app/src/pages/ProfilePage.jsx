import { useEffect, useState } from 'react';
import '../styles.css';
import { userService } from '../services/userService';
import { usePageError } from '../hooks/usePageError';
import { languageMapping } from '../utils/languageMapping';

export const ProfilePage = () => {
	const email = localStorage.getItem('userEmail');
	const [error, setError] = usePageError('');
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

console.log(email)
	useEffect(() => {
		userService
			.getAll()
			.then((fetchedUsers) => {
        console.log(fetchedUsers)
				const foundUser = fetchedUsers.find((user) => user.email === email);
				setUser(foundUser);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	}, [email, setError]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!user) {
		return <div>User not found</div>;
	}

	const languageToLearn = user.languagesToLearn;
	const languageCode = languageMapping[languageToLearn] || languageToLearn;
	const flagSrc = `../images/flags/${languageCode}.svg`;

	return (
		<div>
			<main>
				<div className='content'>
					<section id='user'>
						<h1 className='username'>
							{user.name} {user.surname}
						</h1>
						<img
							className='user_avatar'
							src='../images/user_photo.jpg'
							alt='User Avatar'
						/>
					</section>
					<section id='user_info'>
						<section>
							<h2>Personal information</h2>
							<ul>
								<li>
									<strong>Name:</strong>
									{user.name}
								</li>
								<li>
									<strong>Surname:</strong> {user.surname}
								</li>
								<li>
									<strong>Country of origin:</strong> {user.countryOfOrigin}
								</li>
								<li>
									<strong>Canton:</strong> {user.canton}
								</li>
								<li>
									<strong>Mother tongue:</strong> {user.motherTongue}
								</li>
								<li>
									<strong>Bio:</strong> {user.bio}
								</li>
							</ul>
						</section>
						<section>
							<h2>Learning Goals</h2>
							<ul>
								<li>
									Learn and use 50 essential German words and 20 basic phrases
									for everyday interactions (e.g., greetings, asking for
									directions, shopping).
								</li>
								<li>
									Form and understand simple sentences and questions, such as
									introducing oneself, talking about family, and asking basic
									questions.
								</li>
								<li>
									Understand basic spoken German in everyday contexts, such as
									greetings, simple instructions, and common phrases.
								</li>
							</ul>
						</section>
					</section>
					<section id='user_languages'>
						<h2>My Languages</h2>
						<ul>
							<li>
								<img
									src={flagSrc}
									alt={languageToLearn}
								/>
							</li>
						</ul>
					</section>
					<section id='user_teachers'>
						<h2>List of Teachers</h2>
						<ul>
							<li>
								<img
									src='../images/teacher-1.jpg'
									alt='Dan'
								/>
								<ul>
									<li>
										<strong>Name:</strong> Dan
									</li>
									<li>
										<strong>Surname:</strong> Bauer
									</li>
									<li>
										<strong>Country of origin:</strong> Switzerland
									</li>
									<li>
										<strong>Canton:</strong> Luzern
									</li>
									<li>
										<strong>Mother tongue:</strong> German
									</li>
									<li>
										<strong>Phone:</strong> +41 88 678 54 32
									</li>
									<li>
										<strong>Email:</strong> dan@danov.cvp
									</li>
									<li>
										<strong>Bio:</strong> I am an outgoing person
									</li>
								</ul>
							</li>
							<li>
								<img
									src='../images/teacher-2.jpg'
									alt='Olivia'
								/>
								<ul>
									<li>
										<strong>Name:</strong> Olivia
									</li>
									<li>
										<strong>Surname:</strong> Muller
									</li>
									<li>
										<strong>Country of origin:</strong> Switzerland
									</li>
									<li>
										<strong>Canton:</strong> Geneva
									</li>
									<li>
										<strong>Mother tongue:</strong> German
									</li>
									<li>
										<strong>Phone:</strong> +41 88 648 52 22
									</li>
									<li>
										<strong>Email:</strong> olivia@example.cvp
									</li>
									<li>
										<strong>Bio:</strong> I like 
									</li>
								</ul>
							</li>
							<li>
								<img
									src='../images/teacher-3.jpg'
									alt='Stefan'
								/>
								<ul>
									<li>
										<strong>Name:</strong> Stefan
									</li>
									<li>
										<strong>Surname:</strong> Buzecki
									</li>
									<li>
										<strong>Country of origin:</strong> Albania
									</li>
									<li>
										<strong>Canton:</strong> Aargau
									</li>
									<li>
										<strong>Mother tongue:</strong> German
									</li>
									<li>
										<strong>Phone:</strong> +41 88 748 35 95
									</li>
									<li>
										<strong>Email:</strong> stefan@liber.cvp
									</li>
									<li>
										<strong>Bio:</strong> I love languages
									</li>
								</ul>
							</li>
							<li>
								<img
									src='../images/teacher-4.jpg'
									alt='Melanie'
								/>
								<ul>
									<li>
										<strong>Name:</strong> Melanie
									</li>
									<li>
										<strong>Surname:</strong> Stoff
									</li>
									<li>
										<strong>Country of origin:</strong> Switzerland
									</li>
									<li>
										<strong>Canton:</strong> Tessin
									</li>
									<li>
										<strong>Mother tongue:</strong> German
									</li>
									<li>
										<strong>Phone:</strong> +41 88 256 14 09
									</li>
									<li>
										<strong>Email:</strong> melanie@oko.cvp
									</li>
									<li>
										<strong>Bio:</strong> Hiking
									</li>
								</ul>
							</li>
						</ul>
					</section>
				</div>
			</main>
			<script>
				{`const navToggle = document.querySelector('.nav-toggle');
                const navList = document.querySelector('.nav-list');
                navToggle.addEventListener('click', () => {
                    navList.classList.toggle('open');
                });`}
			</script>
		</div>
	);
};
