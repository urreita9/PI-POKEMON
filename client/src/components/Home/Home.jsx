import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../../redux/actions/actions';
import { fetchTypes } from '../../utils/utils';
import Cards from '../Cards/Cards';
import Forms from '../Forms/Forms';
import Pagination from '../Pagination/Pagination';

const Home = () => {
	const dispatch = useDispatch();
	const allPokemons = useSelector((state) => state.pokemons);
	const pokemons = useSelector((state) => state.filteredPokemons);

	const [types, setTypes] = useState([]);
	const [offset, setOffset] = useState(0);
	const [newOffset, setNewOffset] = useState(false);
	const [newSearch, setNewSearch] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [askForMore, setAskForMore] = useState(false);
	const [filtered, setFiltered] = useState(false);

	useEffect(() => {
		fetchTypes().then((data) => {
			setTypes(data.map((type) => type.name).concat(['All']));
		});
	}, []);

	useEffect(() => {
		if (!allPokemons.length || newOffset) {
			dispatch(getPokemons(offset)); // offset = 0
			setNewOffset(false);
		}
	}, [dispatch, offset]);

	const handlePaginationNext = (currentPage) => {
		setCurrentPage(currentPage);
	};
	const handleOffset = () => {
		setAskForMore(false);
		setOffset(offset + 40);
		setNewOffset(true);
	};

	return (
		<div className='home_container'>
			<div>Home</div>
			<Forms
				setNewSearch={setNewSearch}
				setCurrentPage={setCurrentPage}
				types={types}
				setFiltered={setFiltered}
			/>

			<Cards
				pokemons={pokemons}
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
