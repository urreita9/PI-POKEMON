import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getPokemonByNameFromApi,
	getPokemonByNameFromState,
} from '../../redux/actions/actions';

const SearchForm = ({ searchFromState, setNewSearch }) => {
	const dispatch = useDispatch();

	const [form, setForm] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchFromState(form.toLowerCase())) {
			dispatch(getPokemonByNameFromState(form.toLowerCase()));
			setForm('');
			setNewSearch(true);
			return;
		}
		dispatch(getPokemonByNameFromApi(form.toLowerCase()));
		setNewSearch(true);
		setForm('');
	};
	const handleInputChange = (e) => {
		setForm(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Search a Pokemon'
				value={form}
				onChange={handleInputChange}
			/>
			<button type='submit'>Search</button>
		</form>
	);
};

export default SearchForm;
