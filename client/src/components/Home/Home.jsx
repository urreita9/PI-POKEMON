import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterAllAll, getPokemons } from '../../redux/actions/actions';
import Cards from '../Cards/Cards';
import Forms from '../Forms/Forms';
import Modal from '../Modal/Modal';
import Pagination from '../Pagination/Pagination';

const Home = () => {
	const dispatch = useDispatch();
	const allPokemons = useSelector((state) => state.pokemons);
	const pokemons = useSelector((state) => state.filteredPokemons);
	const [error, setError] = useState({ active: false, msg: '' });
	const [newOffset, setNewOffset] = useState(false);
	const [newSearch, setNewSearch] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [filtered, setFiltered] = useState(false);
	const [askForMore, setAskForMore] = useState(false);
	const offset = useRef(0);

	useEffect(() => {
		if (!allPokemons.length || newOffset) {
			dispatch(getPokemons(offset.current)).then((data) => {
				if (data) {
					setError({ active: true, msg: data.msg });
				}
			}); // offset = 0
			setNewOffset(false);
		}
	}, [dispatch, newOffset, allPokemons.length]);

	useEffect(() => {
		if (pokemons.length) {
			dispatch(filterAllAll());
		}
	}, []);

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
	const handleError = () => {
		setError({
			active: false,
			msg: '',
		});
	};

	return (
		<div className='home_container'>
			{error.active && (
				<Modal text={error.msg} handleError={handleError} loading={false} />
			)}
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
				setFiltered={setFiltered}
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
