const readline = require("readline")

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

async function getUserInput() {
	return new Promise((resolve) => {
		let num = 0;
		let counter = 0;

		rl.on('line', (line) => {
			if (counter === 0) num = Number(line.trim())
			if (counter > 0 && counter % 2 === 0) run(line)
			counter++;
			if (counter >= num * 2 + 1) {
				rl.close();
				resolve(true)
			}
		})
	});
}

function reduceStr(str) {
	const arr = str.split(' ');
	let i = 0;
	let j = i;
	const result = [];

	while (true) {
		if (arr[i] !== arr[j]) {
			result.push(arr[i]);
			i = j;
		}
		if (j >= arr.length - 1) {
			result.push(arr[i]);
			break;
		}
		j++
	}
	return result;
}

function run(rawData) {
	let data = reduceStr(rawData);
	const map = {};
	for (const d of data) {
		if (map[d]) {
			console.log('NO');
			return;
		}
		map[d] = true;
	}
	console.log('YES')
}

getUserInput();