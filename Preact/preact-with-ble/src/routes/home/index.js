import { h } from 'preact';
import style from './style.css';

const Home = () => (
	<div class={style.home}>
		<h1>Home</h1>
		<button type="">Device List</button>
		<button type="">Request Bluetooth Device</button>
	</div>
);

export default Home;
