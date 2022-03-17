import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonByIdFromState } from '../../redux/actions/actions';

const Detail = (props) => {
	// const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPokemonByIdFromState(props.match.params.id));
	}, [dispatch]);
	const pokemon = useSelector((state) => state.pokemon);

	const capitalName =
		pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1);
	return (
		<div>
			<div>
				<h3>{pokemon.name && capitalName}</h3>
				<img src={pokemon.imgMobile} alt='' />
			</div>
			<div>
				<img src={pokemon.imgDesktop} alt='' />
			</div>
			<div></div>
			<div>
				<p>⚔️ {pokemon.attack}</p>
				<p>🛡️ {pokemon.defense}</p>
				<p>💪 {pokemon.hp}</p>
				<p>🏃 {pokemon.speed}</p>
				<p>Height {pokemon.height}</p>
				<p>Weight {pokemon.weight}</p>
			</div>
		</div>
	);
};

export default Detail;
