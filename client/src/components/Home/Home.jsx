import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../../redux/actions/actions';
import { fetchTypes } from '../../utils/utils';
import Cards from '../Cards/Cards';
import FilterForm from '../FilterForm/FilterForm';
import OrderForm from '../OrderForm/OrderForm';
import Pagination from '../Pagination/Pagination';
import SearchForm from '../SearchForm/SearchForm';

const Home = ({ types }) => {
	const dispatch = useDispatch();
	const allPokemons = useSelector((state) => state.pokemons);
	const pokemons = useSelector((state) => state.filteredPokemons);

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [offset, setOffset] = useState(0);
	const [newOffset, setNewOffset] = useState(false);
	const [newSearch, setNewSearch] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [askForMore, setAskForMore] = useState(false);
	const [filtered, setFiltered] = useState(false);

	useEffect(() => {
		if (newOffset) {
			dispatch(getPokemons(offset)); // offset = 0
			setNewOffset(false);
		}
	}, [dispatch, offset]);

	useEffect(() => {
		//LISTEN TO WINDOW SIZE
		const handleWindowResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleWindowResize);

		//UNSUBSCRIBE
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, [windowWidth]);

	const handlePaginationNext = (currentPage) => {
		setCurrentPage(currentPage);
	};
	const handleOffset = () => {
		setAskForMore(false);
		setOffset(offset + 40);
		setNewOffset(true);
	};
	const searchFromState = (name) => {
		const findMyPokemon = allPokemons.find((pokemon) => pokemon.name === name);
		if (findMyPokemon) return true;
		return false;
	};

	return (
		<div className='home_container'>
			<div>Home</div>
			<SearchForm
				searchFromState={searchFromState}
				setNewSearch={setNewSearch}
			/>
			{/* FILTER FORM */}
			<FilterForm
				setCurrentPage={setCurrentPage}
				types={types}
				setFiltered={setFiltered}
			/>

			{/* ORDER FORM */}
			<OrderForm setCurrentPage={setCurrentPage} />

			<Cards
				pokemons={pokemons}
				windowWidth={windowWidth}
				limitPerPage={12}
				currentPage={currentPage}
				handleOffset={handleOffset}
				setAskForMore={setAskForMore}
				askForMore={askForMore}
				newSearch={newSearch}
				setNewSearch={setNewSearch}
			/>
			{!newSearch && (
				<Pagination
					currentPage={currentPage}
					handlePaginationNext={handlePaginationNext}
					limitPerPage={12}
					setAskForMore={setAskForMore}
					filtered={filtered}
				/>
			)}
		</div>
	);
};

export default Home;
