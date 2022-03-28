import React from 'react';
import { Link } from 'react-router-dom';

const Entry = () => {
	return (
		<div className='entry_wrapper'>
			<div
				className='logo_wrapper'
				style={{ backgroundImage: 'url(/assets/dc.png)' }}
			>
				<img
					src='/assets/pokemon_logo.png'
					alt='logo'
					style={{ maxHeight: '300px' }}
				/>
			</div>
			<img
				src='/assets/gif_pikachu_animated.gif'
				className='pikachuAnimated'
				alt='pikachu'
			/>
			<img
				src='/assets/gif_charizard_animated.gif'
				className='charizardAnimated'
				alt='charizard'
			/>
			<img
				src='/assets/gif_squirtle_animated.gif'
				className='squirtleAnimated'
				alt='squirtle'
			/>
			<img
				src='/assets/gif_poke_animated.gif'
				className='pokeAnimated'
				alt='pokemon'
			/>
			<img
				src='/assets/gif_poke1_animated.gif'
				className='poke1Animated'
				alt='pokemon'
			/>
			<div className='pikachu_container'>
				<div className='pikachu_gif_container'>
					<div
						className='pikachu'
						style={{ backgroundImage: 'url(/assets/gif.png)' }}
					></div>
				</div>
				<div className='bubble_container'>
					<Link to='/home'>
						<div
							className='bubble'
							style={{ backgroundImage: 'url(/assets/bubble.png)' }}
						>
							<p>Home!</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Entry;
