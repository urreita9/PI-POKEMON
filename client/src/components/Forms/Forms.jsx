import React from 'react';
import FilterForm from '../FilterForm/FilterForm';
import OrderForm from '../OrderForm/OrderForm';
import SearchForm from '../SearchForm/SearchForm';

const Forms = ({
	searchFromState,
	setNewSearch,
	setCurrentPage,
	setFiltered,
}) => {
	return (
		<div className='forms_container'>
			<SearchForm
				searchFromState={searchFromState}
				setNewSearch={setNewSearch}
			/>
			<FilterForm setCurrentPage={setCurrentPage} setFiltered={setFiltered} />
			<OrderForm setCurrentPage={setCurrentPage} />
		</div>
	);
};

export default Forms;
