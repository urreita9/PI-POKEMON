import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemons } from '../../redux/actions/actions';
import { fetchTypes, getPokemons } from '../../utils/utils';
const initialState = {
	name: '',
	attack: null,
	defense: null,
	strength: null,
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
				data.map((pokemon) => ({
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
					type='number'
					name='attack'
					value={form.attack}
					onChange={handleInputChange}
				/>
				<br />
				<label>Defense: </label>
				<input
					type='number'
					name='defense'
					value={form.defense}
					onChange={handleInputChange}
				/>
				<br />
				<label>Strength: </label>
				<input
					type='number'
					name='strength'
					value={form.strength}
					onChange={handleInputChange}
				/>
				<br />
				<label>Speed: </label>
				<input
					type='number'
					name='speed'
					value={form.speed}
					onChange={handleInputChange}
				/>
				<br />
				<label>Height: </label>
				<input
					type='number'
					name='height'
					value={form.height}
					onChange={handleInputChange}
				/>
				<br />
				<label>Weight: </label>
				<input
					type='number'
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
				<button
					onClick={() => {
						setOffset(offset + 40);
					}}
				>
					Get More Pics
				</button>

				<button type='submit'>Create Pokemon!</button>
			</form>
		</div>
	);
};

export default Create;
