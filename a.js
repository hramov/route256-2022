const readline = require("readline")

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

async function run() {
	const data = await new Promise((resolve) => {
		const data = [];

		rl.on('line', (line) => {
			data.push(line.trim())
			if (data.length >= Number(data[0]) + 1) {
				rl.close();
				resolve(data)
			}
		})

	});

	for (let i = 1; i < data.length; i++) {
		const nums = data[i].split(' ')
		console.log(Number(nums[0]) + Number(nums[1]))
	}

}

run()
