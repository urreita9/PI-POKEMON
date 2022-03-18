import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { postPokemons } from '../../redux/actions/actions';
import { fetchTypes, getPokemons } from '../../utils/utils';
const initialState = {
	name: '',
	attack: null,
	defense: null,
	hp: null,
	speed: null,
	height: null,
	weight: null,
	types: [],
	imgDesktop: null,
	imgMobile: null,
};

const Create = () => {
	const dispatch = useDispatch();
	const [form, setForm] = useState(initialState);
	const [types, setTypes] = useState([]);
	const [myTypes, setMyTypes] = useState([]);
	const [offset, setOffset] = useState(0);
	const [images, setImages] = useState([]);
	useEffect(() => {
		fetchTypes().then((data) => {
			setTypes(data.map((type) => type.name).concat(['All']));
		});
		getPokemons(offset).then((data) => {
			// console.log(data);
			setImages(
				data
					.filter((pokemon) => pokemon.createdDb === false)
					.map((pokemon) => ({
						imgDesktop: pokemon.imgDesktop,
						imgMobile: pokemon.imgMobile,
					}))
			);
		});
	}, [offset]);

	console.log(images);
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

		dispatch(postPokemons({ ...form, types: myTypes }));
		setForm(initialState);
	};
	const handleDeleteTypes = (type) => {
		setMyTypes(myTypes.filter((t) => t !== type));
	};

	return (
		<div className='create'>
			<form onSubmit={handleSubmit} className='form-create'>
				<div className='input_container'>
					<label>Name: </label>
					<input
						type='text'
						name='name'
						value={form.name}
						onChange={handleInputChange}
						placeholder='Pikachu'
					/>
				</div>

				<div className='input_container'>
					<label>Attack: </label>
					<input
						type='number'
						name='attack'
						value={form.attack}
						onChange={handleInputChange}
						placeholder='53'
					/>
				</div>

				<div className='input_container'>
					<label>Defense: </label>
					<input
						type='number'
						name='defense'
						value={form.defense}
						onChange={handleInputChange}
						placeholder='67'
					/>
				</div>

				<div className='input_container'>
					<label>Strength: </label>
					<input
						type='number'
						name='strength'
						value={form.hp}
						onChange={handleInputChange}
						placeholder='75'
					/>
				</div>

				<div className='input_container'>
					<label>Speed: </label>
					<input
						type='number'
						name='speed'
						value={form.speed}
						onChange={handleInputChange}
						placeholder='21'
					/>
				</div>

				<div className='input_container'>
					<label>Height: </label>
					<input
						type='number'
						name='height'
						value={form.height}
						onChange={handleInputChange}
						placeholder='210'
					/>
				</div>

				<div className='input_container'>
					<label>Weight: </label>
					<input
						type='number'
						name='weight'
						value={form.weight}
						onChange={handleInputChange}
						placeholder='18'
					/>
				</div>

				<label>Types (2 max): </label>
				<select onChange={handleInputChange} name='types'>
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
					<img
						className='pokeImgSelected'
						src={form.imgDesktop}
						alt='pokemon selected'
					></img>
				)}
				<br />
				<div className='form_imgs'>
					{images.length &&
						images.map((image, i) => (
							<img
								className='pokeImg'
								key={i}
								src={image.imgDesktop}
								alt='pokemon'
								onClick={() =>
									setForm({
										...form,
										imgDesktop: image.imgDesktop,
										imgMobile: image.imgMobile,
									})
								}
							></img>
						))}
				</div>

				<button
					onClick={() => {
						setOffset(offset + 40);
					}}
					className='form_button'
				>
					Get More Pics
				</button>

				<button type='submit' className='form_button'>
					Create Pokemon!
				</button>
			</form>
		</div>
	);
};

export default Create;
