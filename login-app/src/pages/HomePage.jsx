import React from 'react';
import '../styles.css'; 
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
      <div className="content">
        <section id="hero">
          <section>
            <h1>Connect, Communicate, Change Lives: Find Your Language Buddy in Switzerland Today!</h1>
            <p>Join a community where learning and teaching languages bridges cultures and transforms lives.</p>
            <p><Link to='/sign-up'><button>Find a Language Buddy</button></Link></p>
          </section>
          <section>
            <img src="../images/hero.png" alt="people" />
          </section>
        </section>
        <section id="about">
          <h2>What is Buddly?</h2>
          <p>Whether you're a student eager to learn German or a volunteer ready to make a difference, 
            our platform connects you with the perfect language partner. 
            Together, we can overcome language barriers and create a more inclusive world.
          </p>
          <section className="figures">
            <figure>
              <img src="../images/student.png" alt="Student" />
              <figcaption>Igor is native Ukrainian speaker. He wants to work on his Swiss German.</figcaption>
            </figure>
            <figure>
              <img src="../images/teacher.png" alt="Teacher" />
              <figcaption>Luca is a native Swiss German speaker. He wants to meet new people and help with their language skills.</figcaption>
            </figure>
          </section>                                           
        </section>
        <section id="how_it_works">
          <h2>How does Buddly work</h2>
          <div className="timeline">
            <div className="timecontainer left">
              <div className="content">
                <h3>1. Create profile</h3>
                <p>Register in our website for free. In just 2 steps.</p>
              </div>
            </div>
            <div className="timecontainer right">
              <div className="content">
                <h3>2. Pick your language </h3>
                <p>After signing in, you can select one or multiple official languages in Switzerland.</p>
              </div>
            </div>
            <div className="timecontainer left">
              <div className="content">
                <h3>3. Pick your teacher</h3>
                <p>In the matching page you can filter the teachers based on gender and canton. Now you have to wait for the teacher to accept.</p>
              </div>
            </div>
            <div className="timecontainer right">
              <div className="content">
                <h3>4. Teacher accepts</h3>
                <p>The teacher will see your profile and will decide if he has time to be your buddly.</p>
              </div>
            </div>
            <div className="timecontainer left">
              <div className="content">
                <h3>5. You have now a language buddy</h3>
                <p>If he accepts you will be abel to see his profile in your personal profile. You can now connect and learn your prefer language.</p>
              </div>
            </div>
            <div className="timecontainer right">
              <div className="content">
                <h3>Congrats!</h3>
                <p>You will have access to teacher email and then can write, video chat or just meet up for a coffee.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default HomePage;
