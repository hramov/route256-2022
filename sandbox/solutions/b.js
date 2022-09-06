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

function sortString(str) {
	return str.split(' ').sort()
}

async function run() {
	const data = await getUserInput();
	const prices = data.filter((_, index) => index !== 0 && index % 2 === 0);

	for (let i = 0; i < prices.length; i++) {
		const price = sortString(prices[i])

		let lastPrice = null;
		let lastCount = 0;
		let sum = 0;

		for (let j = 0; j < price.length; j++) {

			if (price[j] === lastPrice) {

				lastCount++;
				if (lastCount === 3) {
					lastCount = 0;
					continue;
				}

			} else {

				lastPrice = price[j];
				lastCount = 1;

			}

			sum += Number(price[j]);
		}

		console.log(sum);
	}
}

run()