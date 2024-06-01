import '../styles.css';

const LanguageSelector = () => (
  <section id="user_languages">
    <h2>Select your language</h2>
    <ul>
      <li><img src="../images/flags/de.svg" alt="German" /></li>
      <li><img src="../images/flags/it.svg" alt="Italian" /></li>
      <li><img src="../images/flags/fr.svg" alt="French" /></li>
      <li><img src="../images/flags/ua.svg" alt="Ukraine" /></li>
    </ul>
    <form action="#" method="post">
      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="canton">Canton:</label>
        <select id="canton" name="canton">
          <option value="zurich">Zurich</option>
          <option value="bern">Bern</option>
          <option value="lucerne">Lucerne</option>
          <option value="uri">Uri</option>
          <option value="schwyz">Schwyz</option>
          <option value="obwalden">Obwalden</option>
          <option value="nidwalden">Nidwalden</option>
          <option value="glarus">Glarus</option>
          <option value="zug">Zug</option>
          <option value="fribourg">Fribourg</option>
          <option value="solothurn">Solothurn</option>
          <option value="baselstadt">Basel-Stadt</option>
          <option value="baselland">Basel-Landschaft</option>
          <option value="shaffhausen">Schaffhausen</option>
          <option value="appenzell">Appenzell</option>
          <option value="stgallen">St. Gallen</option>
          <option value="graubunden">Graubünden</option>
          <option value="argau">Aargau</option>
          <option value="thurgau">Thurgau</option>
          <option value="ticino">Ticino</option>
          <option value="vaud">Vaud</option>
          <option value="valais">Valais</option>
          <option value="neuchatel">Neuchâtel</option>
          <option value="geneva">Geneva</option>
          <option value="jura">Jura</option>
        </select>
      </div>
    </form>
  </section>
);

const TeacherList = () => (
  <section id="user_teachers">
    <h2>List of Teachers</h2>
    <ul>
      {[
        {
          img: "../images/teacher-1.jpg",
          name: "Dan",
          surname: "Bauer",
          origin: "Switzerland",
          canton: "Luzern",
          language: "German",
          phone: "+41 88 678 54 32",
          email: "dan@danov.cvp",
          hobbies: "Skiing"
        },
        {
          img: "../images/teacher-2.jpg",
          name: "Olivia",
          surname: "Muller",
          origin: "Switzerland",
          canton: "Geneva",
          language: "German",
          phone: "+41 88 648 52 22",
          email: "olivia@example.cvp",
          hobbies: "Diving"
        },
        {
          img: "../images/teacher-3.jpg",
          name: "Stefan",
          surname: "Buzecki",
          origin: "Albania",
          canton: "Aargau",
          language: "German",
          phone: "+41 88 748 35 95",
          email: "stefan@liber.cvp",
          hobbies: "Food"
        },
        {
          img: "../images/teacher-4.jpg",
          name: "Melanie",
          surname: "Stoff",
          origin: "Switzerland",
          canton: "Tessin",
          language: "German",
          phone: "+41 88 256 14 09",
          email: "melanie@oko.cvp",
          hobbies: "Hiking"
        },
      ].map((teacher, index) => (
        <li key={index}>
          <img src={teacher.img} alt={teacher.name} />
          <ul>
            <li><strong>Name:</strong> {teacher.name}</li>
            <li><strong>Surname:</strong> {teacher.surname}</li>
            <li><strong>Country of origin:</strong> {teacher.origin}</li>
            <li><strong>Canton:</strong> {teacher.canton}</li>
            <li><strong>Mother tongue:</strong> {teacher.language}</li>
            <li><strong>Phone:</strong> {teacher.phone}</li>
            <li><strong>Email:</strong> {teacher.email}</li>
            <li><strong>Hobbies:</strong> {teacher.hobbies}</li>
          </ul>
        </li>
      ))}
    </ul>
  </section>
);

const StudentMatchingPage = () => (
  <div>
    <main>
      <div className="content">
        <h1>Matching page</h1>
        <LanguageSelector />
        <TeacherList />
      </div>
    </main>
  </div>
);

export default StudentMatchingPage;
