import { h, Component } from 'preact';
import style from './style';
import hn from '../../hn';
import CommentsList from '../../components/CommentsList';

export default class Item extends Component {
	state = {
		item: null,
	};

	componentDidMount() {
		hn(`/item/${this.props.id}`)
			.then(item => {
				this.setState({ item });
			})
			.catch(console.error);
	}

	render() {
		if (!this.state.item) {
			return false;
		}

		return (
			<div class={style.home}>
				<h1 class={style.title}>
					<a href={this.state.item.url}>
						{this.state.item.title}
						<span>({this.state.item.domain})</span>
					</a>
				</h1>
				<h2 class={style.meta}>{this.state.item.time_ago} by {this.state.item.user}</h2>
				<CommentsList comments={this.state.item.comments} />
			</div>
		);
	}
}
