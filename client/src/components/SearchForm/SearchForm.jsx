import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	cleanPokemon,
	getPokemonByNameFromApi,
	getPokemonByNameFromState,
} from '../../redux/actions/actions';
import { searchFromState } from '../../utils/utils';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

const SearchForm = ({ setNewSearch }) => {
	const dispatch = useDispatch();
	const pokemons = useSelector((state) => state.pokemons);
	const pokemon = useSelector((state) => state.pokemon);
	const [name, setName] = useState('');
	const [errors, setErrors] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (errors) {
			setNewSearch(false);
		}
	}, [errors]);
	useEffect(() => {
		if (pokemon.id) setLoading(false);
	}, [pokemon.id]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name || name === '' || !name.trim().length) {
			setName('');
			return;
		}
		setLoading(true);
		if (searchFromState('name', name.toLowerCase(), pokemons)) {
			dispatch(getPokemonByNameFromState(name.toLowerCase()));
			setName('');
			setNewSearch(true);
			setLoading(false);
			return;
		}
		dispatch(getPokemonByNameFromApi(name.toLowerCase())).then((data) => {
			if (data) {
				setErrors(true);
				setLoading(false);
			}
		});
		setNewSearch(true);
		setName('');
		dispatch(cleanPokemon());
	};
	const handleInputChange = (e) => {
		setErrors(false);
		setName(e.target.value);
	};

	const handleError = () => {
		setErrors(false);
	};
	return (
		<form onSubmit={handleSubmit} className='form-flex'>
			<input
				type='text'
				placeholder='Search a Pokemon'
				value={name}
				onChange={handleInputChange}
			/>
			{loading && (
				<Modal
					text='Searching...'
					handleError={handleError}
					loading={loading}
				/>
			)}
			{errors && (
				<Modal
					text='Pokemon doesnt exist'
					handleError={handleError}
					loading={loading}
				/>
			)}
			<Button type={'submit'} className='form_button' text='Search' />
		</form>
	);
};

export default SearchForm;
