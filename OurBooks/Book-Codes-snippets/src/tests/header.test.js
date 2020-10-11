import { h, Component } from 'preact';
import Header from '../components/Header';

describe('<Header />', () => {
	it('should render a title and nav', () => {
		expect(<Header />).toMatchSnapshot();
	});
});
