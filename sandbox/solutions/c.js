const readline = require("readline")

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

async function getUserInput() {
	return new Promise((resolve) => {
		const data = [];

		rl.on('line', (line) => {
			data.push(line.trim())
			if (data.length >= Number(data[0]) * 2 + 1) {
				rl.close();
				resolve(data)
			}
		})

	});
}

async function run() {
	const data = await getUserInput();
	const set = data.filter((_, index) => index !== 0 && index % 2 === 0);

	for (let k = 0; k < set.length; k++) {
		const devs = set[k].split(' ');

		let i = 0;
		let j = 1;
		let modA = Number.MAX_VALUE;
		let index = j;
		let devsCount = devs.length;

		while (devsCount > 0) {

			if (Number(devs[i]) === Number.MAX_VALUE) {
				i++;
				j++;
				continue;
			};

			const a = Math.abs(Number(devs[i]) - Number(devs[j]));

			if (a < modA) {
				modA = a;
				index = j;
			}

			if (j === devs.length - 1) {
				console.log(i + 1, index + 1);
				devsCount -= 2;
				devs[i] = Number.MAX_VALUE;
				devs[index] = Number.MAX_VALUE;
				modA = Number.MAX_VALUE;
				i++;
				j = i + 1;
				continue;
			}

			j++;
		}
		console.log()
	}
}

run()