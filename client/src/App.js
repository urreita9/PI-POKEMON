import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Create from './components/Create/Create';
import Detail from './components/Detail/Detail';
import Entry from './components/Entry/Entry';
import Home from './components/Home/Home';
import { getPokemons } from './redux/actions/actions';
import { fetchTypes } from './utils/utils';

function App() {
	const dispatch = useDispatch();
	const allPokemons = useSelector((state) => state.pokemons);
	const [types, setTypes] = useState([]);
	useEffect(() => {
		fetchTypes().then((data) => {
			setTypes(data.map((type) => type.name).concat(['All']));
		});
	}, []);
	useEffect(() => {
		if (!allPokemons.length) {
			dispatch(getPokemons(0)); // offset = 0
		}
	}, [dispatch]);
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Entry} />
				<Route exact path='/home'>
					<Home types={types} />
				</Route>
				<Route exact path='/pokemon/:id' component={Detail} />
				<Route exact path='/create'>
					<Create types={types} />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
