import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService.js';
import '../styles.css';
import { usePageError } from '../hooks/usePageError.js';
import { cantonMap } from '../utils/cantonMap.js';

const LanguageSelector = ({ changeCanton, changeGender, changeLanguage }) => {
	const handleCantonChange = (event) => {
		const selectedFullCanton = event.target.value;
		const selectedCantonAbbreviation =
			cantonMap[selectedFullCanton.toLowerCase()];
		changeCanton(selectedCantonAbbreviation);
	};

	const handleGenderChange = (event) => {
		const selectedGender = event.target.value;
		changeGender(selectedGender);
	};

	const handleLanguageChange = (lang) => {
		changeLanguage(lang);
	};

	return (
		<section id='user_languages'>
			<h2>First select your language</h2>
			<ul>
				<li onClick={() => handleLanguageChange(null)}>
					<img
						src='../images/flags/chall.svg'
						alt='All four languages'
					/>
				</li>
				<li onClick={() => handleLanguageChange('German')}>
					<img
						src='../images/flags/de.svg'
						alt='Flag of Germany'
					/>
				</li>
				<li onClick={() => handleLanguageChange('Italian')}>
					<img
						src='../images/flags/it.svg'
						alt='Flag of Italy'
					/>
				</li>
				<li onClick={() => handleLanguageChange('French')}>
					<img
						src='../images/flags/fr.svg'
						alt='Flag of France'
					/>
				</li>
				<li onClick={() => handleLanguageChange('English')}>
					<img
						src='../images/flags/gb.svg'
						alt='Flag of Uk'
					/>
				</li>
				<li onClick={() => handleLanguageChange('Swiss German')}>
					<img
						src='../images/flags/ch.svg'
						alt='Flag of Uk'
					/>
				</li>
			</ul>
			<form
				action='#'
				method='post'
			>
				<div className='form-group'>
					<label htmlFor='gender'>Gender:</label>
					<select
						id='gender'
						name='gender'
						onChange={handleGenderChange}
					>
						<option value=''>Select the gender</option>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
						<option value='other'>Other</option>
					</select>
				</div>
				<div className='form-group'>
					<label htmlFor='canton'>Canton:</label>
					<select
						id='canton'
						name='canton'
						onChange={handleCantonChange}
					>
						<option value=''>Select a canton</option>
						<option value='zurich'>Zurich</option>
						<option value='bern'>Bern</option>
						<option value='lucerne'>Lucerne</option>
						<option value='uri'>Uri</option>
						<option value='schwyz'>Schwyz</option>
						<option value='obwalden'>Obwalden</option>
						<option value='nidwalden'>Nidwalden</option>
						<option value='glarus'>Glarus</option>
						<option value='zug'>Zug</option>
						<option value='fribourg'>Fribourg</option>
						<option value='solothurn'>Solothurn</option>
						<option value='baselstadt'>Basel-Stadt</option>
						<option value='baselland'>Basel-Landschaft</option>
						<option value='shaffhausen'>Schaffhausen</option>
						<option value='appenzell'>Appenzell</option>
						<option value='stgallen'>St. Gallen</option>
						<option value='graubunden'>Graubünden</option>
						<option value='argau'>Aargau</option>
						<option value='thurgau'>Thurgau</option>
						<option value='ticino'>Ticino</option>
						<option value='vaud'>Vaud</option>
						<option value='valais'>Valais</option>
						<option value='neuchatel'>Neuchâtel</option>
						<option value='geneva'>Geneva</option>
						<option value='jura'>Jura</option>
					</select>
				</div>
			</form>
		</section>
	);
};

const TeacherList = ({ selectedCanton, gender, language }) => {
	const [error, setError] = usePageError('');
	const [users, setUsers] = useState([]);
	const [filteredTeachers, setFilteredTeachers] = useState([]);

	useEffect(() => {
		userService
			.getAll()
			.then((data) => {
				const teachers = data.filter((user) => user.buddyType === 'teacher');
				setUsers(teachers);
				setFilteredTeachers(teachers);
				console.log(teachers);
			})
			.catch((error) => {
				setError(error.message);
				console.log(error);
			});
	}, []);

	useEffect(() => {
		const filtered = users.filter((teacher) => {
			// Filter by selected canton if it's not empty
			const filterByCanton =
				!selectedCanton || teacher.canton === selectedCanton;
			// Filter by gender if it's not empty
			const filterByGender = !gender || teacher.gender === gender;
			const filterByLanguage =
				language === null || teacher.motherTongue === language;
			return filterByCanton && filterByGender && filterByLanguage;
		});
		setFilteredTeachers(filtered);
	}, [selectedCanton, gender, users, language]);

	return (
		<section id='user_teachers'>
			<ul>
				<h2>List of Teachers</h2>
				{filteredTeachers.map((teacher, index) => (
					<li key={index}>
						<img
							src='../images/teacher-1.jpg'
							alt={teacher.name}
						/>
						<ul>
							<li>
								<strong>Name:</strong> {teacher.name}
							</li>
							<li>
								<strong>Surname:</strong> {teacher.surname}
							</li>
							<li>
								<strong>Country of origin:</strong> {teacher.countryOfOrigin}
							</li>
							<li>
								<strong>Canton:</strong> {teacher.canton}
							</li>
							<li>
								<strong>Mother tongue:</strong> {teacher.motherTongue}
							</li>
							<li>
								<strong>Email:</strong> {teacher.email}
							</li>
							<li>
								<strong>Bio:</strong> {teacher.bio}
							</li>
						</ul>
					</li>
				))}
			</ul>
			{error && <p className='notification is-danger is-light'>{error}</p>}
		</section>
	);
};

const StudentMatchingPage = () => {
	const [selectedCanton, setSelectedCanton] = useState('');
	const [gender, setGender] = useState('');
	const [language, setLanguage] = useState('');

	return (
		<div>
			<main>
				<div className='content'>
					<h1>Matching page</h1>
					<LanguageSelector
						changeCanton={setSelectedCanton}
						changeGender={setGender}
						changeLanguage={setLanguage}
					/>
					<TeacherList
						selectedCanton={selectedCanton}
						gender={gender}
						language={language}
					/>
				</div>
			</main>
		</div>
	);
};

export default StudentMatchingPage;
