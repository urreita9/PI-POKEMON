import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Entry from './components/Entry/Entry';
import Home from './components/Home/Home';

function App() {
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
