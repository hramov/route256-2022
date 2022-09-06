const readline = require("readline")

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const dict = [];

async function getUserInput() {
	return new Promise((resolve) => {
		let n = 2;
		let m = 0;
		rl.on('line', (line) => {
			if (m === 0) {
				m = Number(line.trim())
				return;
			}
			if (n === 2) {
				dict.push(line.split('').reverse().join(''));
			} else if (n === 1) {
				run(line.split('').reverse().join(''));
			}
			m--;
			if (m === 0) {
				n--;
			}
			if (n === 0) {
				resolve(true)
			}
		})
	});
}

async function run(q) {

	let i = 0;
	let j = 0;
	let counter = 0;
	let maxCounter = 0;
	let word = dict[0].split('').reverse().join('');

	while (j < dict.length) {

		if (q === dict[j]) {
			counter = 0;
			maxCounter = 0;
			j++;
			i = 0;
			continue;
		}

		if (q[i] === dict[j][i]) {
			counter++;
			i++;
		} else {
			if (counter > maxCounter) {
				maxCounter = counter;
				word = dict[j].split('').reverse().join('');
			}
			counter = 0;
			j++;
			i = 0;
			continue;
		}

	}

	maxCounter = 0;

	console.log(word)
}

getUserInput()