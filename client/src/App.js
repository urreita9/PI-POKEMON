import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import './App.css';
import Create from './components/Create/Create';
import Detail from './components/Detail/Detail';
import Entry from './components/Entry/Entry';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Socials from './components/Socials/Socials';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Entry} />
				<Route>
					<Nav />
					<Switch>
						<Route exact path='/home' component={Home} />
						<Route exact path='/pokemon/:id' component={Detail} />
						<Route exact path='/create' component={Create} />
						<Redirect to='/home' />
					</Switch>
				</Route>
			</Switch>
			<Socials className='mobile' />
		</Router>
	);
}

export default App;
