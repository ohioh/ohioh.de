import { h, Component } from 'preact';
import CommentsList from '../components/CommentsList';

describe('<CommentsList />', () => {
	it('should render a list of comments', () => {
		const comments = [
			{
				level: 0,
				time_ago: '3 days ago',
				user: 'vutran',
				comments: [],
				content: 'Test body',
			},
			{
				level: 0,
				time_ago: '5 days ago',
				user: 'vutran',
				comments: [
					{
						level: 0,
						time_ago: '4 days ago',
						user: 'tranvu',
						comments: [],
						content: 'Test reply body',
					},
				],
				content: 'Test body',
			},
		];
		expect(<CommentsList comments={comments} />).toMatchSnapshot();
	});
});


