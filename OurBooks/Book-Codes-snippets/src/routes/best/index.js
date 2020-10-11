import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import HNList from '../../components/HNList';

export default class Best extends Component {
	state = {
		showMore: false,
	};

	showMore = () => {
		this.setState({ showMore: true });
	};

	render() {
		const page = parseInt(this.props.page, 10) || 1;
		const next = `/best/${page + 1}`;
		return (
			<div class={style.home}>
				<h1>Best</h1>
				<HNList page={page} endpoint="/best" onLoad={this.showMore} />
				{this.state.showMore && <Link href={next}>More</Link>}
			</div>
		);
	}
}
