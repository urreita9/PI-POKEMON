import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../../redux/actions/actions';
import Cards from '../Cards/Cards';

const Home = () => {
	return (
		<>
			<div>Home</div>
			<Cards />
		</>
	);
};

export default Home;
