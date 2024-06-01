import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer> 
            <div className="content">
                <section>
                    <Link className="logo" to="/"><img src="../images/buddy-logo.svg" alt="Buddy Logo" /></Link>
                    <p>The only website you need to learn language in Switzerland</p>
                    <button>Join today</button>
                </section>
                <section>
                    <nav className="bottom">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/find-buddy">Find your Buddy</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                        </ul>
                    </nav>
                </section>
                <section>
                    <p>Follow us</p>
                    <p className="icons">
                        <Link to="#"><img src="../images/icons/facebook.svg" alt="" /></Link>
                        <Link to="#"><img src="../images/icons/instagram.svg" alt="" /></Link>
                        <Link to="#"><img src="../images/icons/twitter-x.svg" alt="" /></Link>
                    </p>
                </section>
                <p>&copy; 2024 Buddly - Your Language Buddy</p>
            </div>
        </footer>
    );
};

export default Footer;
