import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Create from './components/Create/Create';
import Detail from './components/Detail/Detail';
import Entry from './components/Entry/Entry';
import Home from './components/Home/Home';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Entry} />
				<Route exact path='/home' component={Home} />
				<Route exact path='/pokemon/:id' component={Detail} />
				<Route exact path='/create' component={Create} />
			</Switch>
		</Router>
	);
}

export default App;
