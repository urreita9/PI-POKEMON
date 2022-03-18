import React, { useEffect } from 'react';
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
	const comic = 'url(/assets/comic_cloud.png)';

	return (
		<div className='detail_container'>
			<h2>{pokemon.name && capitalName}!!</h2>
			<div className='detail_content' style={{ backgroundImage: comic }}>
				<div
					style={{ backgroundImage: `url(${pokemon.imgMobile})` }}
					className='pokemon_image'
				></div>
				{/* <img src={pokemon.imgMobile} alt='pokemon' className='pokemon_image' /> */}
			</div>
			{/* <div>
					<img src={pokemon.imgDesktop} alt='' />
				</div> */}
			<div className='detail_stats_container'>
				<div className='detail_stats_numbers'>
					<p>⚔️ {pokemon.attack}</p>
					<p>🛡️ {pokemon.defense}</p>
					<p>🦾 {pokemon.hp}</p>
					<p>🏃 {pokemon.speed}</p>
				</div>
				<div className='detail_stats_numbers'>
					<span>Height {pokemon.height}</span>
					<span>Weight {pokemon.weight}</span>
				</div>
			</div>
		</div>
	);
};

export default Detail;
