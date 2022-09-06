const readline = require("readline")

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function validateTime(time) {
	const timeReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/
	return time.match(timeReg)
}

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

			if (counter > 0 && line.indexOf('-') === -1) {
				dataCounter = Number(line);
			}

			if (line.indexOf('-') !== -1) {
				data.push(line);
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

	for (let i = 0; i < rawData.length; i++) {
		const start = rawData[i].split('-')[0];
		const end = rawData[i].split('-')[1];

		if (!validateTime(start)
			|| !validateTime(end)
			|| start > end
		) {
			console.log('NO');
			return;
		}
	}

	const data = rawData.map(item => item.split('-').join(',')).sort().join(',').split(',');

	let i = 1;
	let j = 2;

	while (j < data.length - 1) {

		if (data[i] >= data[j]) {
			console.log('NO')
			return;
		}

		i += 2;
		j = i + 1;
	}

	console.log('YES')
}

getUserInput()