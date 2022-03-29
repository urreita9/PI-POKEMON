import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	cleanPokemon,
	getPokemonByIdFromApi,
	getPokemonByIdFromState,
} from '../../redux/actions/actions';
import { searchFromState } from '../../utils/utils';
import ImageDeco from '../ImageDeco/ImageDeco';
import Modal from '../Modal/Modal';
import Socials from '../Socials/Socials';

const Detail = (props) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const history = useHistory();
	const { pokemon, pokemons } = state;

	useEffect(() => {
		if (searchFromState('id', props.match.params.id, pokemons)) {
			dispatch(getPokemonByIdFromState(props.match.params.id));
			setLoading(false);
		} else {
			dispatch(getPokemonByIdFromApi(props.match.params.id)).then((data) => {
				if (data) {
					setError(true);
					setLoading(false);
				}
			});
		}

		return () => {
			dispatch(cleanPokemon());
		};
	}, [dispatch]);
	useEffect(() => {
		if (pokemon.id) {
			setLoading(false);
		}
	}, [pokemon.id]);

	const handleError = () => {
		setError(false);
		history.push('/home');
	};
	const capitalName =
		pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1);
	const comic = 'url(/assets/comic_cloud.png)';

	return (
		<>
			{loading && (
				<Modal text='Searching' handleError={handleError} loading={loading} />
			)}
			{error ? (
				<Modal text='Pokemon doesnt exist' handleError={handleError} />
			) : (
				<div className='detail_socials_grid'>
					<div className='detail_container'>
						<div className='deco_container'>
							<ImageDeco image='/assets/bam.png' className='deco_left_top' />
							<ImageDeco
								image='/assets/boom3.png'
								className='deco_left_bottom'
							/>
						</div>
						<div>
							<h2>{pokemon.name && capitalName}!!</h2>

							<ul>
								{pokemon.types?.length &&
									pokemon.types.map((type) => (
										<li key={type} className={`${type}`}>
											{type}
										</li>
									))}
							</ul>
							<div
								className='detail_content'
								style={{ backgroundImage: comic }}
							>
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
									<span>Height {pokemon.height} </span>
									<span>/Weight {pokemon.weight}</span>
								</div>
							</div>
						</div>
						<div className='deco_container'>
							<ImageDeco image='/assets/pow.png' className='deco_right_top' />
							<ImageDeco
								image='/assets/wham.png'
								className='deco_right_bottom'
							/>
						</div>
					</div>
					<Socials className='mobile' />
				</div>
			)}
		</>
	);
};

export default Detail;
