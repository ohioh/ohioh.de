// https://github.com/cheeaun/node-hnapi/
const HN_API_URI = 'https://node-hnapi.herokuapp.com';

export default function hn(endpoint) {
	return fetch(`${HN_API_URI}${endpoint}`).then(resp => resp.json());
}
