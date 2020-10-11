import { h, Component } from 'preact';
import style from './style';
import CommentsList from '../CommentsList';

export default class CommentsItem extends Component {
	render() {
		const { level, time_ago, user, comments, content } = this.props.comment;
		return (
			<li class={style.item}>
				<div class={style.meta}>posted by {user} {time_ago}</div>
				<div class={style.content} dangerouslySetInnerHTML={{ __html: content }} />
				{comments.length > 0 && <CommentsList comments={comments} level={level} />}
			</li>
		);
	}
}

