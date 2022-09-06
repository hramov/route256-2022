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

function run(rawData = []) {

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

	for (const region in regions) {
		const data = regions[region].sort();

		if (data.length === 1) {
			continue;
		}

		let i = 0;
		let j = 1;

		let minItem = null;
		let minDistance = Number.MAX_VALUE;

		let neig = new Array(data.length);

		neig[0] = data[i].join(',');

		while (i < data.length - 1) {

			const point = data[j];
			const pivot = neig[i].split(',');

			const distance = Math.sqrt(
				Math.pow(point[0] - pivot[0], 2) + Math.pow(point[1] - pivot[1], 2)
			);

			if (minDistance > distance) {
				minDistance = distance;

				if (!neig.includes(point.join(','))) {
					minItem = point;
				} else {
					minDistance = Number.MAX_VALUE;
				}
			}

			if (j === data.length - 1 || (!neig.includes(minItem.join(',')) && minDistance <= 2)) {
				i++;
				neig[i] = minItem.join(',');
				j = 0;
				minDistance = Number.MAX_VALUE;
				continue;
			}

			j++;

		}

		for (let i = 0; i < neig.length - 1; i++) {
			const point = neig[i + 1].split(',');
			const pivot = neig[i].split(',')
			const distance = Math.sqrt(
				Math.pow(point[0] - pivot[0], 2) + Math.pow(point[1] - pivot[1], 2)
			);

			if (distance > 2) {
				console.log('NO')
				return;
			}
		}
	}

	console.log('YES');

}

getUserInput()