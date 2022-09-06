const readline = require("readline")

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function getUserInput() {
	return new Promise((resolve) => {
		let num = 0;
		let counter = 0;
		let dataCounter = 0;
		let data = [];

		rl.on('line', (line) => {

			if (counter === 0) {
				num = Number(line.trim())
				counter++;
				return;
			}

			if (counter > 0 && line.indexOf('.') === -1) {
				dataCounter = Number(line.split(' ')[0]);
			}

			if (line.indexOf('.') !== -1) {
				data.push(line.split(''));
				dataCounter--;
			}

			if (dataCounter === 0) {
				run(data);
				data = [];
				num--;
			}

			if (num === 0) {
				rl.close();
				resolve(true);
			}
		})
	});
}

function makeRegions(rawData) {
	const regions = {};

	for (let i = 0; i < rawData.length; i++) {
		for (let j = 0; j < rawData[i].length; j++) {
			const data = rawData[i][j]
			if (!regions[data]) {
				if (data !== '.') regions[data] = [[i, j]]
			} else {
				regions[data].push([i, j])
			}
		}
	}

	return regions;
}

function makeGraph(data) {
	const graph = {};
	let i = 0;
	let j = 1;

	while (i < data.length) {

		const point = data[j];
		const pivot = data[i];

		const distance = Math.sqrt(
			Math.pow(point[0] - pivot[0], 2) + Math.pow(point[1] - pivot[1], 2)
		);

		if (!graph[pivot.join(',')]) {
			graph[pivot.join(',')] = [];
		}

		if (distance > 0) {
			if (distance < 2 || (distance === 2 && point[0] === pivot[0])) {
				graph[pivot.join(',')].push(point.join(','))
			}

		}

		if (j === data.length - 1) {
			i++;
			j = 0;
			continue;
		}

		j++;

	}

	return graph
}

function dfs(adj, v, t) {

	if (v === t) return true;

	if (adj[v].visited) {
		return false;
	}

	adj[v].visited = true;

	for (const neighbor of adj[v]) {
		if (!neighbor.visited) {
			let reached = dfs(adj, neighbor, t);
			if (reached) return true;
		}
	}
	return false
}

function run(rawData = []) {
	const regions = makeRegions(rawData);

	for (const region in regions) {
		const data = regions[region].sort();

		const minPoint = data[0];

		if (data.length === 1) {
			continue;
		}

		const graph = makeGraph(data);

		const graphCopy = JSON.stringify(graph);

		for (const point of data) {
			if (minPoint.toString() == point.toString()) continue;

			const canGo = dfs(JSON.parse(graphCopy), minPoint.join(','), point.join(','));

			if (!canGo) {
				console.log('NO');
				return;
			}
		}
	}

	console.log('YES')

}

getUserInput()