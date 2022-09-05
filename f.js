const readline = require("readline")

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function getUserInput() {
	return new Promise((resolve) => {
		let n = 0;
		let m = 0;
		let data = [];
		rl.on('line', (line) => {
			if (n === 0) {
				line = line.trim().split(' ')
				n = line[0];
				m = line[1];

				if (m == 0) {
					rl.close();
					resolve({
						n,
						data
					});
				}

				return;
			}

			m--;
			data.push(line.trim());
			if (m <= 0) {
				rl.close();
				resolve({
					n,
					data
				});
			}

		})
	});
}

function createGraph(n, data) {
	let i = 0;
	let j = 1;

	const graph = {}

	while (j < data.length) {

		if (graph[data[i]]) {
			graph[data[i]].push(data[j])
		} else {
			graph[data[i]] = [data[j]]
		}

		if (graph[data[j]]) {
			graph[data[j]].push(data[i])
		} else {
			graph[data[j]] = [data[i]]
		}

		i += 2;
		j = i + 1;
	}

	for (let i = 1; i <= n; i++) {
		if (!graph[i]) graph[i] = []
	}

	return graph;
}

function findFriendsOfFriends(graph) {
	const map = {};
	for (const person of Object.keys(graph)) {
		const friends = graph[person];
		if (friends.length === 0) map[person] = [];
		for (let i = 0; i < friends.length; i++) {
			if (!map[person]) map[person] = [];
			map[person].push(...graph[friends[i]].filter(item => item != person && !graph[person].includes(item)))
			map[person] = map[person].sort()
		}
	}
	return map
}

function getPredictList(map) {
	Object.keys(map).forEach((key) => {
		const entries = map[key].reduce((acc, el) => {
			acc[el] = (acc[el] || 0) + 1;
			return acc;
		}, {});

		const pers = Object.keys(entries);
		if (pers.length === 0) {
			console.log(0)
		} else if (pers.length === 1) {
			console.log(pers[0]);
			return;
		} else {
			const max = Math.max(...Object.values(entries));
			const data = [];
			for (const key in entries) {
				if (entries[key] === max) {
					data.push(key);
				}
			}
			console.log(data.join(' '));
		}
	})
}

async function run() {
	let { n, data } = await getUserInput();
	data = data.map(item => item.split(' ').sort()).sort().join(',').split(',')
	const graph = createGraph(n, data);
	const map = findFriendsOfFriends(graph);
	getPredictList(map);

}

run()