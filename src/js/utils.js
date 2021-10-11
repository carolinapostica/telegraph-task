const FETCH_URL = 'https://my-json-server.typicode.com/telegraph/frontend-exercise/comments';

class Utils {
	async fetchData() {
		try {
			let response = await fetch(FETCH_URL);

			return response.json();
		} catch (e) {
			return e;
		}
	}

	sortData(data = []) {
		return data.sort((a, b) => b.likes - a.likes);
	}
}

module.exports = { Utils, FETCH_URL };
