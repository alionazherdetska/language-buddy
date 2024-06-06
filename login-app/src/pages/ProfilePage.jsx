import { useEffect, useState } from 'react';
import '../styles.css';
import { userService } from '../services/userService';
import { usePageError } from '../hooks/usePageError';
import { languageMapping } from '../utils/languageMapping';
import { getRandomImage } from '../utils/getRandomAvatarImage.js';

export const ProfilePage = () => {
	const email = localStorage.getItem('userEmail');
	const [error, setError] = usePageError('');
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [learningGoals, setLearningGoals] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [buddyList, setBuddyList] = useState([]);


	useEffect(() => {
		setLoading(true);
		userService
			.getAll()
			.then((fetchedUsers) => {
				const foundUser = fetchedUsers.find((user) => user.email === email);
				setUser(foundUser);
				setLearningGoals(
					foundUser.learningGoals ||
						'Learn and use 50 essential German words and 20 basic phrases for everyday interactions (e.g., greetings, asking for directions, shopping). Form and understand simple sentences and questions, such as introducing oneself, talking about family, and asking basic questions. Understand basic spoken German in everyday contexts, such as greetings, simple instructions, and common phrases.'
				);
				const buddyTypeToFetch = foundUser.buddyType === 'teacher' ? 'student' : 'teacher';
				const filteredBuddies = fetchedUsers.filter(user => user.buddyType === buddyTypeToFetch);
				setBuddyList(filteredBuddies);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	}, [email, setError]);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
		localStorage.setItem('learningGoals', learningGoals);
	};

	const handleChange = (event) => {
		setLearningGoals(event.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSaveClick();
		}
	};

	const handleBlur = () => {
		handleSaveClick();
	};

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
						<div className='user_image-section'>
							<img
								className='user_avatar'
								src='../images/user_photo.jpg'
								alt='User Avatar'
							/>
							<button>Upload an image</button>
						</div>
					</section>
					<section  id="user_extra">
						{user.buddyType === 'student' ? (
							<section>
								<h2>Student Information</h2>
								<ul>
									<li><strong>Name:</strong> {user.name}</li>
									<li><strong>Surname:</strong> {user.surname}</li>
									<li><strong>Country of origin:</strong> {user.countryOfOrigin}</li>
									<li><strong>Canton:</strong> {user.canton}</li>
									<li><strong>Mother tongue:</strong> {user.motherTongue}</li>
									<li><strong>Bio:</strong> {user.bio}</li>
								</ul>
							</section>
						) : (
							<section>
								<h2>Teacher Information</h2>
								<ul>
									<li><strong>Name:</strong> {user.name}</li>
									<li><strong>Surname:</strong> {user.surname}</li>
									<li><strong>Country of origin:</strong> {user.countryOfOrigin}</li>
									<li><strong>Canton:</strong> {user.canton}</li>
									<li><strong>Mother tongue:</strong> {user.motherTongue}</li>
									<li><strong>Email:</strong> {user.email}</li>
									<li><strong>Bio:</strong> {user.bio}</li>
								</ul>
							</section>
						)}
						{user.buddyType === 'teacher' ? (
						<section class="resources">
						<h2>List of resources</h2>
							<ul>
								<li>Daily Vocabulary and Phrases: Learn and practice 5 new words and essential phrases.</li>
								<li>Pronunciation Drills: Focus on difficult sounds and simple conversations.</li>
								<li>Listening Practice: Listen to short dialogues and watch simple German videos.</li>
								<li>Cultural Exchange: Share cultural stories in German.</li>
								<li>Homework Support: Assist with German language homework and exercises.</li>
							</ul>
						</section>
						) : (
							<section>
							{isEditing ? (
								<>
									<article>
										<h2>Learning Goals</h2>
										<img
											onClick={handleSaveClick}
											src='../images/save.png'
											alt='Edit'
										/>
									</article>
									<textarea
										value={learningGoals}
										onChange={handleChange}
										onKeyDown={handleKeyDown}
										onBlur={handleBlur}
										rows='5'
										cols='50'
									/>
								</>
							) : (
								<>
									<article>
										<h2>Learning Goals</h2>
										<img
											onClick={handleEditClick}
											src='../images/edit.svg'
											alt='Edit'
										/>
									</article>
									<ul>
										{learningGoals.split('\n').map((goal, index) => (
											<li key={index}>{goal.trim()}</li>
										))}
									</ul>
								</>
							)}
						</section>
						)}
					</section>
					{user.buddyType === 'student' ? (
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
						) : ("")}
						<section id='user_teachers'>
							<h2>List of {user.buddyType === 'student' ? 'Teachers' : 'Students'}</h2>
							<ul>
								{buddyList.map(buddy => (
									<li key={buddy.email}>
										<img
											src={getRandomImage()}
											alt={buddy.name}
										/>
										<ul>
											<li><strong>Name:&nbsp;</strong> {buddy.name}</li>
											<li><strong>Surname:&nbsp;</strong> {buddy.surname}</li>
											<li><strong>Country of origin:&nbsp;</strong> {buddy.countryOfOrigin}</li>
											<li><strong>Canton:&nbsp;</strong> {buddy.canton}</li>
											<li><strong>Mother tongue:&nbsp;</strong> {buddy.motherTongue}</li>
										</ul>
									</li>
								))}
							</ul>
						</section>
				</div>
			</main>
		</div>
	);
};
