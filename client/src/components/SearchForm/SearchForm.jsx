import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getPokemonByNameFromApi,
	getPokemonByNameFromState,
} from '../../redux/actions/actions';
import { searchFromState } from '../../utils/utils';
import Button from '../Button/Button';

const SearchForm = ({ setNewSearch }) => {
	const dispatch = useDispatch();
	const pokemons = useSelector((state) => state.pokemons);
	const [name, setName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name) return;
		if (searchFromState('name', name.toLowerCase(), pokemons)) {
			dispatch(getPokemonByNameFromState(name.toLowerCase()));
			setName('');
			setNewSearch(true);
			return;
		}
		dispatch(getPokemonByNameFromApi(name.toLowerCase()));
		setNewSearch(true);
		setName('');
	};
	const handleInputChange = (e) => {
		setName(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit} className='form-flex'>
			<input
				type='text'
				placeholder='Search a Pokemon'
				value={name}
				onChange={handleInputChange}
			/>
			<Button type={'submit'} className='form_button' text='Search' />
		</form>
	);
};

export default SearchForm;
