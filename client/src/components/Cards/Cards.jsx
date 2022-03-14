import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../../redux/actions/actions';

const Cards = () => {
	const dispatch = useDispatch();
	const pokemons = useSelector((state) => state.pokemons);
	useEffect(() => {
		dispatch(getPokemons());
	}, [dispatch]);
	console.log(pokemons);
	return (
		<div>
			{pokemons.map((pokemon, i) => (
				<img key={i} src={pokemon.img} />
			))}
		</div>
	);
};

export default Cards;
