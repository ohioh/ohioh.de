import { h, Component } from 'preact';
import CommentItem from '../components/CommentItem';

describe('<CommentItem />', () => {
	it('should render a comment item', () => {
		expect(
			<CommentItem comment={{
				level: 0,
				time_ago: '3 days ago',
				user: 'vutran',
				comments: [],
				content: 'Test body',
			}} />
		).toMatchSnapshot();
	});

	it('should render a comment replies', () => {
		expect(
			<CommentItem comment={{
				level: 0,
				time_ago: '3 days ago',
				user: 'vutran',
				comments: [
					{
						level: 1,
						time_ago: '2 days ago',
						user: 'tranvu',
						comments: [],
						content: 'Test reply body',
					},
				],
				content: 'Test body',
			}} />
		).toMatchSnapshot();
	});
});


