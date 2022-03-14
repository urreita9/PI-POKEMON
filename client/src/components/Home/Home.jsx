import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	filterAllAll,
	filterAllType,
	filterOriginalsCreatedAll,
	filterOriginalsCreatedByType,
} from '../../redux/actions/actions';
import { fetchTypes } from '../../utils/utils';

import Cards from '../Cards/Cards';

const Home = () => {
	const dispatch = useDispatch();
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [types, setTypes] = useState([]);
	const [form, setForm] = useState({
		created: 'All',
		type: 'All',
	});
	const creation = ['All', 'Originals', 'Custom'];
	useEffect(() => {
		// setTypes(fetchTypes().map((type) => type.name));
		fetchTypes().then((data) => {
			setTypes(data.map((type) => type.name).concat(['All']));
		});
		const handleWindowResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleWindowResize);
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, [windowWidth]);

	const handleSubmit = (e) => {
		const { created, type } = form;
		e.preventDefault();
		if (created === 'All' && type === 'All') {
			dispatch(filterAllAll());
		} else if (created === 'All') {
			dispatch(filterAllType(type));
		} else if (created === 'Originals' && type === 'All') {
			dispatch(filterOriginalsCreatedAll(false));
		} else if (created === 'Originals') {
			dispatch(filterOriginalsCreatedByType({ createdDb: false, type }));
		} else if (created === 'Custom' && type === 'All') {
			dispatch(filterOriginalsCreatedAll(true));
		} else if (created === 'Custom') {
			dispatch(filterOriginalsCreatedByType({ createdDb: true, type }));
		}
	};
	const handleInputChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	console.log(form);
	return (
		<div className='home_container'>
			<div>Home</div>
			<form onSubmit={handleSubmit}>
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
						<option key={i} value={type}>
							{type}
						</option>
					))}
				</select>
				<button type='submit'>Filter</button>
			</form>
			<Cards windowWidth={windowWidth} />
		</div>
	);
};

export default Home;
