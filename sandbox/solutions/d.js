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
	let i = 0;
	let j = 1;
	let isChange = false;

	while (true) {

		if (data[j] !== data[i]) {
			isChange = true;
		} else {
			if (isChange && j - i > 1) {
				console.log('NO');
				break;
			}
		}

		if (j === data.length - 1) {
			i++;
			j = i + 1;
			isChange = false;
			continue;
		}

		if (i === data.length - 1) {
			console.log('YES');
			break;
		}

		j++;
	}
}

getUserInput();