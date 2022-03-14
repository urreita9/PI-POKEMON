import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../../redux/actions/actions';
import Card from '../Card/Card';

const Cards = ({ windowWidth }) => {
	const dispatch = useDispatch();
	const pokemons = useSelector((state) => state.filteredPokemons);
	useEffect(() => {
		dispatch(getPokemons());
	}, [dispatch]);

	return (
		<div className='cards_container'>
			{pokemons.map((pokemon, i) => (
				<Card key={i} {...pokemon} windowWidth={windowWidth} />
			))}
		</div>
	);
};

export default Cards;
