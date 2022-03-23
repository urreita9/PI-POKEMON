import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../../redux/actions/actions';
import Cards from '../Cards/Cards';
import Forms from '../Forms/Forms';
import Pagination from '../Pagination/Pagination';

const Home = () => {
	const dispatch = useDispatch();
	const allPokemons = useSelector((state) => state.pokemons);
	const pokemons = useSelector((state) => state.filteredPokemons);

	const [newOffset, setNewOffset] = useState(false);
	const [newSearch, setNewSearch] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [askForMore, setAskForMore] = useState(false);
	const [filtered, setFiltered] = useState(false);
	const offset = useRef(0);

	useEffect(() => {
		if (!allPokemons.length || allPokemons.length === 1 || newOffset) {
			dispatch(getPokemons(offset.current)); // offset = 0
			setNewOffset(false);
		}
		console.log('Home rerender');
	}, [dispatch, newOffset, allPokemons.length]);

	const handlePaginationNext = (currentPage) => {
		setCurrentPage(currentPage);
	};
	const handleOffset = () => {
		setAskForMore(false);
		setNewOffset(true);
		offset.current = offset.current + 40;
		if (offset.current > 600) {
			offset.current = 0;
		}
	};

	return (
		<div className='home_container'>
			<Forms
				setNewSearch={setNewSearch}
				setCurrentPage={setCurrentPage}
				setFiltered={setFiltered}
			/>

			<Cards
				pokemons={pokemons}
				limitPerPage={12}
				currentPage={currentPage}
				handleOffset={handleOffset}
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
