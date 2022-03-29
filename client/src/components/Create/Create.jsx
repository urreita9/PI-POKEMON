import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postPokemons } from '../../redux/actions/actions';
import { fetchTypes, getPokemons } from '../../utils/utils';
import Input from '../input/Input';
import Modal from '../Modal/Modal';
import Socials from '../Socials/Socials';
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
	const [form, setForm] = useState(initialState); //form state
	const [errors, setErrors] = useState(initialState); // errors
	const [types, setTypes] = useState([]); //display all types for select
	const [offset, setOffset] = useState(0); //offset for fetching images
	const [images, setImages] = useState([]); // array of images
	const [loading, setLoading] = useState(true); // boolean for modal display

	const created = useRef(false);
	const clickOnCreate = useRef(false);
	const pokeNames = useRef([]);
	const history = useHistory();

	useEffect(() => {
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
			pokeNames.current = [
				...pokeNames.current,
				...data.map((poke) => poke.name),
			];
			setLoading(false);
		});
	}, [offset, types.length]);

	useEffect(() => {
		if (created.current) {
			created.current = false;
			history.push(`/pokemon/${pokemon.id}`);
		}
	}, [pokemon, history]);

	const handleInputChange = (e) => {
		const letters = /^[A-Za-z]+$/;
		if (e.target.name === 'name') {
			if (e.target.value.match(letters)) {
				setErrors({
					...errors,
					[e.target.name]: null,
				});
				setForm({
					...form,
					[e.target.name]: e.target.value,
				});
				return;
			}
			setErrors({
				...errors,
				[e.target.name]: 'Only letters',
			});
			setForm({
				...form,
				[e.target.name]: e.target.value,
			});
			return;
		} else if (e.target.name === 'types') {
			if (e.target.value === form.types[0]) return;
			if (form.types.length === 2) return;
			setForm({ ...form, types: [...form.types, e.target.value] });
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
				setForm({
					...form,
					[e.target.name]: number,
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

		if (form.name === '' || !form.name || !form.name.trim().length) {
			setErrors({
				...errors,
				name: 'Name is Mandatory',
			});
			setForm({ ...form, name: '' });
			return;
		}

		if (searchForName(form.name)) {
			setErrors({
				...errors,
				name: 'Pokemon already exists. Try with another name.',
			});
			return;
		}
		if (clickOnCreate.current) {
			dispatch(postPokemons(form));
			created.current = true;
		}
	};
	const handleDeleteTypes = (type) => {
		setForm({
			...form,
			types: form.types.filter((t) => t !== type),
		});
	};

	const searchForName = (name) => {
		const findName = pokeNames.current.find((poke) => poke === name);
		if (findName) return true;
		return false;
	};

	return (
		<div className='create'>
			<h2 className='create_title'>Create your own Pokemons!</h2>
			{loading && <Modal text='Hang in there...' loading={true} />}
			<form onSubmit={handleSubmit} className='form-create'>
				<Input
					label='Name: '
					type='text'
					name='name'
					value={form.name}
					handleInputChange={handleInputChange}
					placeholder='Pikachu'
					error={errors.name}
				/>

				<Input
					label='Attack: '
					type='range'
					name='attack'
					min={1}
					max={300}
					value={form.attack}
					handleInputChange={handleInputChange}
					placeholder='53'
					showValue={true}
				/>

				<Input
					label='Defense: '
					type='range'
					name='defense'
					min={1}
					max={300}
					value={form.defense}
					handleInputChange={handleInputChange}
					placeholder='67'
					showValue={true}
				/>

				<Input
					label='Strength: '
					type='range'
					name='hp'
					min={1}
					max={300}
					value={form.hp}
					handleInputChange={handleInputChange}
					placeholder='67'
					showValue={true}
				/>

				<Input
					label='Speed: '
					type='range'
					name='speed'
					min={1}
					max={300}
					value={form.speed}
					handleInputChange={handleInputChange}
					placeholder='67'
					showValue={true}
				/>

				<Input
					label='Height: '
					type='text'
					name='height'
					min={1}
					max={300}
					value={form.height}
					handleInputChange={handleInputChange}
					placeholder='170'
					error={errors.height}
				/>

				<Input
					label='Weight: '
					type='text'
					name='weight'
					min={1}
					max={300}
					value={form.weight}
					handleInputChange={handleInputChange}
					placeholder='170'
					error={errors.weight}
				/>

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

				{form.types.map((type) => (
					<div key={type} className='input_container'>
						<span className={`${type} stroke`}>{type}</span>
						<button
							onClick={() => handleDeleteTypes(type)}
							className='form_button cross stroke'
						>
							X
						</button>
					</div>
				))}

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
							setLoading(true);
						}}
						className='form_button getMore'
					>
						Get More Pics
					</button>

					<button
						type='submit'
						className='form_button create'
						onClick={() => {
							if (errors.name || errors.height || errors.weight) {
								return;
							} else {
								clickOnCreate.current = true;
							}
						}}
					>
						Create Pokemon!
					</button>
				</div>
			</form>
			<Socials className='mobile' />
		</div>
	);
};

export default Create;
