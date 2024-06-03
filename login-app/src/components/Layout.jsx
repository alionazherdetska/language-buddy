import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer.jsx';
import { Header } from './Header.jsx';

export const Layout = () => {
	return (
		<div>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};
