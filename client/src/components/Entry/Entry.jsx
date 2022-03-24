import React from 'react';
import { Link } from 'react-router-dom';

const Entry = () => {
	return (
		<div
			className='entry_wrapper'
			//  style={{ backgroundImage: imageUrl }}
		>
			<div
				className='logo_wrapper'
				style={{ backgroundImage: 'url(/assets/dc.png)' }}
			>
				<img
					src='/assets/pokemon_logo.png'
					alt=''
					style={{ maxHeight: '300px' }}
				/>
				{/* <img src='/assets/dc.png' alt='' style={{ maxHeight: '100px' }} /> */}
			</div>
			<img src='/assets/gif_pikachu_animated.gif' className='pikachuAnimated' />
			<img
				src='/assets/gif_charizard_animated.gif'
				className='charizardAnimated'
			/>
			<img
				src='/assets/gif_squirtle_animated.gif'
				className='squirtleAnimated'
			/>
			<img src='/assets/gif_poke_animated.gif' className='pokeAnimated' />
			<img src='/assets/gif_poke1_animated.gif' className='poke1Animated' />
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
							<p>Home sweet home!</p>
						</div>
					</Link>
				</div>
			</div>
			{/* <img src='/assets/gif.png' />
			<img src='/assets/bubble.png' />
			<div className='entry_container'>
				<Link to='/home'>
					<div
						className='entry_button_container'
						style={{ backgroundImage: 'url(/assets/boom2.png)' }}
					>
						<button className='entry_btn'>Home</button>{' '}
					</div>
				</Link>
			</div> */}
		</div>
	);
};

export default Entry;
