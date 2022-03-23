import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postPokemons } from '../../redux/actions/actions';
import { fetchTypes, getPokemons } from '../../utils/utils';
const initialState = {
	name: '',
	attack: 50,
	defense: 50,
	hp: 50,
	speed: 50,
	height: null,
	weight: null,
	types: [],
	imgDesktop: null,
	imgMobile: null,
};

const Create = () => {
	const dispatch = useDispatch();
	const pokemon = useSelector((state) => state.pokemon);
	const [form, setForm] = useState(initialState);
	const [errors, setErrors] = useState(initialState);
	const [types, setTypes] = useState([]);
	const [myTypes, setMyTypes] = useState([]);
	const [offset, setOffset] = useState(0);
	const [images, setImages] = useState([]);
	const created = useRef(false);
	const clickOnCreate = useRef(false);
	const history = useHistory();

	useEffect(() => {
		// console.log('CREATE Use effect');
		// types array
		if (!types.length) {
			fetchTypes().then((data) => {
				setTypes(data.map((type) => type.name).concat(['All']));
			});
		}

		// images array
		getPokemons(offset).then((data) => {
			setImages(
				data
					.filter((pokemon) => pokemon.createdDb === false)
					.map((pokemon) => ({
						imgDesktop: pokemon.imgDesktop,
						imgMobile: pokemon.imgMobile,
					}))
			);
		});
	}, [offset, types.length]);

	useEffect(() => {
		if (created.current) {
			created.current = false;
			history.push(`/pokemon/${pokemon.id}`);
		}
	}, [pokemon, history]);

	const handleInputChange = (e) => {
		if (e.target.name === 'name') {
			setErrors({
				...errors,
				[e.target.name]: null,
			});
			setForm({
				...form,
				[e.target.name]: e.target.value,
			});
			return;
		} else if (e.target.name === 'types') {
			if (myTypes.length === 2) return;
			setMyTypes([...myTypes, e.target.value]);
			return;
		} else {
			if (e.target.value === '') {
				setErrors({
					...errors,
					[e.target.name]: null,
				});
				setForm({
					...form,
					[e.target.name]: null,
				});
				return;
			}
			const number = Number(e.target.value);
			if (!number || number < 1 || number > 300) {
				setErrors({
					...errors,
					[e.target.name]: 'Must be a number between 1 and 300',
				});
			} else {
				setErrors({
					...errors,
					[e.target.name]: null,
				});
				setForm({
					...form,
					[e.target.name]: number,
				});
			}
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (clickOnCreate.current) {
			dispatch(postPokemons({ ...form, types: myTypes }));
			created.current = true;
		}
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
						value={form.name || ''}
						onChange={handleInputChange}
						placeholder='Pikachu'
					/>
					{errors.name && <span>Name is mandatory</span>}
				</div>

				<div className='input_container'>
					<label>Attack: </label>
					<input
						type='range'
						name='attack'
						min={1}
						max={300}
						value={form.attack}
						onChange={handleInputChange}
						placeholder='53'
					/>
					{<span>{form.attack}</span>}
				</div>

				<div className='input_container'>
					<label>Defense: </label>
					<input
						type='range'
						name='defense'
						min={1}
						max={300}
						value={form.defense}
						onChange={handleInputChange}
						placeholder='67'
					/>
					{<span>{form.defense}</span>}
				</div>

				<div className='input_container'>
					<label>Strength: </label>
					<input
						type='range'
						name='hp'
						min={1}
						max={300}
						value={form.hp}
						onChange={handleInputChange}
						placeholder='75'
					/>
					{<span>{form.hp}</span>}
				</div>

				<div className='input_container'>
					<label>Speed: </label>
					<input
						type='range'
						name='speed'
						min={1}
						max={300}
						value={form.speed}
						onChange={handleInputChange}
						placeholder='21'
					/>
					{<span>{form.speed}</span>}
				</div>

				<div className='input_container'>
					<label>Height: </label>
					<input
						type='text'
						name='height'
						value={form.height || ''}
						onChange={handleInputChange}
						placeholder='210'
					/>
					{errors.height && <span>{errors.height}</span>}
				</div>

				<div className='input_container'>
					<label>Weight: </label>
					<input
						type='text'
						name='weight'
						value={form.weight || ''}
						onChange={handleInputChange}
						placeholder='18'
					/>

					{errors.weight && <span>{errors.weight}</span>}
				</div>

				<div className='input_container'>
					<label>Types (2 max): </label>
					<select onChange={handleInputChange} name='types'>
						{types.map((type, i) => (
							<option key={i} value={type}>
								{type}
							</option>
						))}
					</select>
				</div>
				{
					// myTypes.length &&
					myTypes.map((type) => (
						<div key={type} className='input_container'>
							<span className={`${type} stroke`}>{type}</span>
							<button
								onClick={() => handleDeleteTypes(type)}
								className='form_button cross stroke'
							>
								X
							</button>
						</div>
					))
				}
				{form.imgDesktop && (
					<div className='imgSelected_container'>
						<img
							className='pokeImgSelected'
							src={form.imgDesktop}
							alt='pokemon selected'
						/>
					</div>
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

				<div className='create_buttons'>
					<button
						onClick={() => {
							setOffset(offset + 40);
							clickOnCreate.current = false;
						}}
						className='form_button getMore'
					>
						Get More Pics
					</button>

					<button
						type='submit'
						className='form_button create'
						onClick={() => {
							if (!form.name.length) {
								setErrors({
									...errors,
									name: 'Name is Mandatory',
								});
								return;
							}
							if (errors.weight || errors.height) {
								return;
							}
							// console.log('click');
							clickOnCreate.current = true;
						}}
						// disabled={!form.name.length ? true : false}
					>
						Create Pokemon!
					</button>
				</div>
			</form>
		</div>
	);
};

export default Create;
