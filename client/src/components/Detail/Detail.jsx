import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	cleanPokemon,
	getPokemonByIdFromApi,
	getPokemonByIdFromState,
} from '../../redux/actions/actions';
import { searchFromState } from '../../utils/utils';

const Detail = (props) => {
	// const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const pokemon = useSelector((state) => state.pokemon);
	const pokemons = useSelector((state) => state.pokemons);

	useEffect(() => {
		if (searchFromState('id', props.match.params.id, pokemons)) {
			dispatch(getPokemonByIdFromState(props.match.params.id));
			return;
		} else {
			dispatch(getPokemonByIdFromApi(props.match.params.id));
		}
		return dispatch(cleanPokemon());
	}, [dispatch]);

	const capitalName =
		pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1);
	return (
		<div className='detail_container'>
			<div className='detail_content'>
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
		</div>
	);
};

export default Detail;
