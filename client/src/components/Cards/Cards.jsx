import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { filterAllAll, cleanPokemon } from '../../redux/actions/actions';
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
	setFiltered,
}) => {
	// newSearch - TRUE shows only one card - FALSE shows all cards
	// askForMore - TRUE shows button "Get more" in last page - FALSE hides button
	// handleOffset - When askForMore is TRUE, on button click sets askForMore to FALSE and newOffset to TRUE. Triggers a get with offset + 40.
	const dispatch = useDispatch();
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
						<button
							onClick={() => {
								setNewSearch(false);
								dispatch(cleanPokemon());
							}}
							className='form_button'
						>
							Show All
						</button>
					</>
				)
			) : (
				<div className='cards_container'>
					{showThisPoks.length ? (
						showThisPoks.map((pokemon) => (
							<Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
								<Card {...pokemon} />
							</Link>
						))
					) : (
						<div className='no_pokemons_container'>
							<h1 className='no_pokemons_text'>
								No pokemons under this filters
							</h1>
							<button
								className='form_button show_all'
								onClick={() => {
									dispatch(filterAllAll());
									setFiltered(false);
								}}
							>
								Show All
							</button>
						</div>
					)}
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
