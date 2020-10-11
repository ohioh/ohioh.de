import { h, Component } from 'preact';
import hn from '../../hn';
import Item from '../Item';

export default class HNList extends Component {
	state = {
		items: [],
	};

	load = page => {
		hn(`${this.props.endpoint}?page=${page}`)
			.then(items => {
				this.setState({ items }, this.props.onLoad);
			})
			.catch(console.error);
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.page !== nextProps.page) {
			this.load(nextProps.page);
		}
	}

	componentDidMount() {
		this.load(this.props.page);
	}

	render() {
		return (
			this.state.items.length > 0 && (
				<ol>
					{this.state.items.map((item, idx) => <Item index={idx + 1} item={item} />)}
				</ol>
			)
		);
	}
}
