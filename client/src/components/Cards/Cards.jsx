import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Skeleton from '../Skeleton/Skeleton';

const Cards = ({
	limitPerPage,
	currentPage,
	pokemons,
	askForMore,
	handleOffset,
	newSearch,
	setNewSearch,
}) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (pokemons.length) {
			setLoading(false);
		}
	}, [loading, pokemons]);
	const searchedPokemon = useSelector((state) => state.pokemon);

	let lastPokemon = currentPage * limitPerPage;
	let firstPokemon = lastPokemon - limitPerPage;
	let showThisPoks = pokemons.slice(firstPokemon, lastPokemon);

	const skeletonArr = new Array(limitPerPage).fill(null);

	return (
		<>
			{loading ? (
				<div className='cards_container'>
					{skeletonArr.map((item, i) => (
						<Skeleton key={i} />
					))}
				</div>
			) : newSearch ? (
				searchedPokemon.id && (
					<>
						<div className='cards_container'>
							<Link
								key={searchedPokemon.id}
								to={`/pokemon/${searchedPokemon.id}`}
							>
								<Card {...searchedPokemon} />
							</Link>
						</div>
						<button onClick={() => setNewSearch(false)} className='form_button'>
							Show All
						</button>
					</>
				)
			) : (
				<div className='cards_container'>
					{showThisPoks.map((pokemon) => (
						<Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
							<Card {...pokemon} newSearch={newSearch} />
						</Link>
					))}
					{askForMore && (
						<button onClick={handleOffset} className='form_button'>
							Get More Pokemons!
						</button>
					)}
				</div>
			)}
		</>
	);
};

export default Cards;
