import { h, Component } from 'preact';
import HNList from '../components/HNList';
import { shallow } from 'preact-render-spy';

describe.only('<HNList />', () => {
	const fetchMock = jest.fn(() => Promise.resolve({
		json: () => ([]),
	}));

	global.fetch = fetchMock;

	it('should a HNList of articles', () => {
		expect(<HNList endpoint="/news" page="1" />).toMatchSnapshot();
	});

	it('should have called fetch()', () => {
		const context = shallow(<HNList endpoint="/news" page="1" />);
		expect(fetchMock).toHaveBeenCalledWith("https://node-hnapi.herokuapp.com/news?page=1");
	});
});

