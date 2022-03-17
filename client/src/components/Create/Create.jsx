import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Create = ({ types }) => {
	const [form, setForm] = useState({
		name: '',
		attack: '',
		defense: '',
		strength: '',
		speed: '',
		height: '',
		weight: '',
		types: [],
		imgDesktop: '',
		imgMobile: '',
	});
	const [myTypes, setMyTypes] = useState([]);

	// useEffect(() => {
	// 	console.log(pokemons);
	// }, []);
	const pokemons = useSelector((state) => state.pokemons);
	const images = pokemons.map((pokemon) => ({
		imgDesktop: pokemon.imgDesktop,
		imgMobile: pokemon.imgMobile,
	}));

	const handleInputChange = (e) => {
		if (e.target.name === 'types') {
			if (myTypes.length === 2) return;
			setMyTypes([...myTypes, e.target.value]);
			return;
		}
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	const handleDeleteTypes = (type) => {
		setMyTypes(myTypes.filter((t) => t !== type));
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>Name: </label>
				<input
					type='text'
					name='name'
					value={form.name}
					onChange={handleInputChange}
				/>
				<br />
				<label>Attack: </label>
				<input
					type='text'
					name='attack'
					value={form.attack}
					onChange={handleInputChange}
				/>
				<br />
				<label>Defense: </label>
				<input
					type='text'
					name='defense'
					value={form.defense}
					onChange={handleInputChange}
				/>
				<br />
				<label>Strength: </label>
				<input
					type='text'
					name='strength'
					value={form.strength}
					onChange={handleInputChange}
				/>
				<br />
				<label>Speed: </label>
				<input
					type='text'
					name='speed'
					value={form.speed}
					onChange={handleInputChange}
				/>
				<br />
				<label>Height: </label>
				<input
					type='text'
					name='height'
					value={form.height}
					onChange={handleInputChange}
				/>
				<br />
				<label>Weight: </label>
				<input
					type='text'
					name='weight'
					value={form.weight}
					onChange={handleInputChange}
				/>
				<br />
				<label>Types (2 max): </label>
				<select
					// value={myTypes[myTypes.length - 1]}
					onChange={handleInputChange}
					name='types'
				>
					{types.map((type, i) => (
						<option key={i} value={type}>
							{type}
						</option>
					))}
				</select>
				{myTypes.length &&
					myTypes.map((type) => (
						<div key={type}>
							<p>{type}</p>
							<button onClick={() => handleDeleteTypes(type)}>Delete</button>
						</div>
					))}
				{form.imgDesktop && (
					<img className='pokeImgSelected' src={form.imgDesktop}></img>
				)}
				<br />
				{images.length &&
					images.map((image, i) => (
						<img
							className='pokeImg'
							key={i}
							src={image.imgDesktop}
							onClick={() =>
								setForm({
									...form,
									imgDesktop: image.imgDesktop,
									imgMobile: image.imgMobile,
								})
							}
						></img>
					))}

				<button type='submit'>Create Pokemon!</button>
			</form>
		</div>
	);
};

export default Create;
