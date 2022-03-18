import React from 'react';
import { Link } from 'react-router-dom';
import Socials from '../Socials/Socials';

const Nav = () => {
	return (
		<nav className='nav_container'>
			<div className='nav_logo_container'>
				<Link to='/home'>
					<img src='/assets/pokemon_icon.svg' alt='' className='logo' />
				</Link>
			</div>
			<Link to='/create'>
				<img
					src='/assets/plus-icon.png'
					alt='Create Pokemon'
					className='logo'
				/>
			</Link>
			<Socials className='desktop' />
		</nav>
	);
};

export default Nav;

//href='https://wa.me/5491126435107?text=Hola%20Francisco,%20me%20gustaria%20que%20te%20sumes%20a%20nuestro%20equipo'
