import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService.js';

import '../styles.css';
import { usePageError } from '../hooks/usePageError.js';

const LanguageSelector = ({ changeCanton }) => {
  const handleCantonChange = (event) => {
    changeCanton(event.target.value);
  };

  return (
    <section id='user_languages'>
      <h2>Select your language</h2>
      <ul>
        <li>
          <img src='../images/flags/de.svg' alt='German' />
        </li>
        <li>
          <img src='../images/flags/it.svg' alt='Italian' />
        </li>
        <li>
          <img src='../images/flags/fr.svg' alt='French' />
        </li>
        <li>
          <img src='../images/flags/ua.svg' alt='Ukrainian' />
        </li>
      </ul>
      <form action='#' method='post'>
        <div className='form-group'>
          <label htmlFor='gender'>Gender:</label>
          <select id='gender' name='gender'>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='canton'>Canton:</label>
          <select id='canton' name='canton' onChange={handleCantonChange}>
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

const TeacherList = ({ selectedCanton }) => {
  const [error, setError] = usePageError('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService
      .getAll()
      .then((data) => {
        const teachers = data.filter((user) => user.buddyType === 'teacher');
        setUsers(teachers);
        console.log(teachers);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }, []);

  const filteredTeachers = selectedCanton
    ? users.filter((teacher) => teacher.canton === selectedCanton)
    : users;

  return (
    <section id='user_teachers'>
      <h2>List of Teachers</h2>
      <ul>
        {filteredTeachers.map((teacher, index) => (
          <li key={index}>
            <img src='../images/teacher-1.jpg' alt={teacher.name} />
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
                <strong>Hobbies:</strong> {teacher.hobbies}
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

  return (
    <div>
      <main>
        <div className='content'>
          <h1>Matching page</h1>
          <LanguageSelector changeCanton={setSelectedCanton} />
          <TeacherList selectedCanton={selectedCanton} />
        </div>
      </main>
    </div>
  );
};

export default StudentMatchingPage;
