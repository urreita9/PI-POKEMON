import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Pagination = ({
	currentPage,
	handlePaginationNext,
	limitPerPage,
	setAskForMore,
	filtered,
}) => {
	const state = useSelector((state) => state);

	let maxAmountOfPages = filtered
		? Math.ceil(state.filteredPokemons.length / limitPerPage)
		: Math.ceil(state.pokemons.length / limitPerPage);

	const pages = [];
	for (let i = 1; i <= maxAmountOfPages; i++) {
		pages.push(i);
	}
	useEffect(() => {
		if (
			currentPage === pages.length &&
			state.pokemons.length === state.filteredPokemons.length
		) {
			setAskForMore(true);
		} else {
			setAskForMore(false);
		}
	}, [currentPage]);

	return (
		<div className='pagination'>
			<button
				onClick={() => {
					if (currentPage === 1) return;
					handlePaginationNext(currentPage - 1);
				}}
				className='form_button pag'
			>
				Prev
			</button>
			{pages.map((page) => (
				<button
					key={page}
					onClick={() => {
						handlePaginationNext(page);
					}}
					className={`form_button pag ${page === currentPage ? 'active' : ''}`}
				>
					{page}
				</button>
			))}

			<button
				onClick={() => {
					if (currentPage === pages.length) return;
					handlePaginationNext(currentPage + 1);
				}}
				className='form_button pag'
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
