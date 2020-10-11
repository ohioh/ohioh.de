import { h, Component } from 'preact';
import Item from '../components/Item';

describe('<Item />', () => {
	it('should render a list item', () => {
		expect(
			<Item item={{
				title: 'Test Title',
				time_ago: '3 days ago',
			}} />
		).toMatchSnapshot();
	});
});

