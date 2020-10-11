import { h, Component } from 'preact';
import CommentItem from '../CommentItem';
import style from './style';

export default class CommentsList extends Component {
	render() {
		const cls = this.props.level > 0
			? style.pad
			: style.list

		return (
			<ol class={cls}>
				{this.props.comments.map(comment =>
					<CommentItem comment={comment} />
				)}
			</ol>
		);
	}
}
