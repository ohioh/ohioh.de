import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Header from './header';
import Home from '../routes/home';
import New from '../routes/new';
import Best from '../routes/best';
import Item from '../routes/item';

if (module.hot) {
	require('preact/debug');
}

export default class App extends Component {
	render() {
		return (
			<div id="app">
				<Header />
				<Router>
					<Home path="/:page?" />
					<New path="/new/:page?" />
					<Best path="/best/:page?" />
					<Item path="/item/:id" />
				</Router>
			</div>
		);
	}
}
