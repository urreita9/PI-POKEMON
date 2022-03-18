import React from 'react';

const Socials = ({ className }) => {
	return (
		<ul className={`nav_socials_container ${className}`}>
			<li className='nav_social'>
				<a href='https://github.com/urreita9' target='_blank'>
					<img src='/assets/github-icon.svg' alt='' className='social' />
				</a>
			</li>
			<li className='nav_social'>
				<a href='https://www.linkedin.com/in/francisco-urrea/' target='_blank'>
					<img src='/assets/linkedin-icon.svg' alt='' className='social' />
				</a>
			</li>
			<li className='nav_social'>
				<a
					href='https://wa.me/5491126435107?text=Hola%20Francisco,%20me%20gustaria%20que%20te%20sumes%20a%20nuestro%20equipo'
					target='_blank'
				>
					<img src='/assets/whatsapp-icon.png' alt='' className='social' />
				</a>
			</li>
		</ul>
	);
};

export default Socials;
