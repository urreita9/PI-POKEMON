import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	filterAllAll,
	filterAllType,
	filterOriginalsCreatedAll,
	filterOriginalsCreatedByType,
} from '../../redux/actions/actions';
import Button from '../Button/Button';

const FilterForm = ({ types, setCurrentPage, setFiltered }) => {
	const [form, setForm] = useState({
		created: 'All',
		type: 'All',
	});
	const dispatch = useDispatch();
	const creation = ['All', 'Originals', 'Custom'];
	const handleSubmit = (e) => {
		e.preventDefault();
		const { created, type } = form;

		if (created === 'All' && type === 'All') {
			dispatch(filterAllAll());
			setFiltered(false);
		} else if (created === 'All') {
			dispatch(filterAllType(type));
			setFiltered(true);
		} else if (created === 'Originals' && type === 'All') {
			dispatch(filterOriginalsCreatedAll(false));
			setFiltered(true);
		} else if (created === 'Originals') {
			dispatch(filterOriginalsCreatedByType({ createdDb: false, type }));
			setFiltered(true);
		} else if (created === 'Custom' && type === 'All') {
			dispatch(filterOriginalsCreatedAll(true));
			setFiltered(true);
		} else if (created === 'Custom') {
			dispatch(filterOriginalsCreatedByType({ createdDb: true, type }));
			setFiltered(true);
		}
		setCurrentPage(1);
	};
	const handleInputChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<form onSubmit={handleSubmit} className='form-flex'>
			{creation.map((element, i) => (
				<label key={i}>
					{element}
					<input
						type='radio'
						name='created'
						value={element}
						onChange={handleInputChange}
					/>
				</label>
			))}
			<select value={form.type} onChange={handleInputChange} name='type'>
				{types.map((type, i) => (
					<option key={i} value={type} className='option'>
						{type}
					</option>
				))}
			</select>
			<Button type='submit' text='Filter' className='form_button' />
		</form>
	);
};

export default FilterForm;
