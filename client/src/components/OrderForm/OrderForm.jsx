import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	orderNameAZ,
	orderNameZA,
	orderStrengthSF,
	orderStrengthWF,
} from '../../redux/actions/actions';

const OrderForm = ({ setCurrentPage }) => {
	const [order, setOrder] = useState('Name: from A to Z');
	const dispatch = useDispatch();
	const handleOrderSubmit = (e) => {
		e.preventDefault();
		if (order === 'Name: from A to Z') {
			dispatch(orderNameAZ());
		} else if (order === 'Name: from Z to A') {
			dispatch(orderNameZA());
		} else if (order === 'Strength: weakest first') {
			dispatch(orderStrengthWF());
		} else {
			dispatch(orderStrengthSF());
		}
		// setCurrentPage(1);
	};
	const orders = [
		'Name: from A to Z',
		'Name: from Z to A',
		'Strength: weakest first',
		'Strength: strongest first',
	];
	const handleOrderChange = (e) => {
		setOrder(e.target.value);
	};
	return (
		<form onSubmit={handleOrderSubmit}>
			<select value={order} onChange={handleOrderChange} name='order'>
				{orders.map((order, i) => (
					<option key={i} value={order}>
						{order}
					</option>
				))}
			</select>
			<button type='submit'>Order</button>
		</form>
	);
};

export default OrderForm;
