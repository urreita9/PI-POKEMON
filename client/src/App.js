import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { myFetch } from './redux/actions/actions';
import Entry from './components/Entry/Entry';
import Home from './components/Home/Home';

function App() {
	// const dispatch = useDispatch();
	// const pokemones = useSelector((state) => state.pokemones);
	// useEffect(() => {
	// 	dispatch(myFetch());
	// }, [dispatch]);
	// console.log('state', pokemones);

	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Entry} />
				<Route exact path='/home' component={Home} />
			</Switch>
		</Router>
	);
}

export default App;
