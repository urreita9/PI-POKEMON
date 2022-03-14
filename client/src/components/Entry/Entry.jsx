import React, { useEffect, useState } from 'react';
import './Entry.css';
import { Link } from 'react-router-dom';

const Entry = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const desktopImage = 'url(/assets/desktop.jpg)';
	const mobileImage = 'url(/assets/mobile.jpg)';
	const imageUrl = windowWidth >= 750 ? desktopImage : mobileImage;
	useEffect(() => {
		const handleWindowResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleWindowResize);
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, [windowWidth]);
	return (
		<div className='entry_wrapper' style={{ backgroundImage: imageUrl }}>
			<Link to='/home'>
				<button className='entry_btn'>Home</button>
			</Link>
		</div>
	);
};

export default Entry;
