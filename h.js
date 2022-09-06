const readline = require("readline")

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function getUserInput() {
	return new Promise((resolve) => {
		let n = 0;
		let m = 0;
		let counter = 0;
		const tasks = {};
		let processors = []

		rl.on('line', (line) => {
			if (n === 0) {
				line = line.trim().split(' ')
				n = line[0];
				m = line[1];

				if (m == 0) {
					rl.close();
					resolve({
						processors,
						tasks
					});
				}

				return;
			}

			if (counter === 0) {
				processors = line.split(' ').map(item => ({
					energy: Number(item),
					status: true
				}));
				counter++;
			} else {
				m--;

				const lineData = line.split(' ');
				tasks[Number(lineData[0])] = Number(lineData[1])

				if (m <= 0) {
					rl.close();
					resolve({
						processors,
						tasks
					});
				}
			}

		})
	});
}

async function run() {
	let { processors, tasks } = await getUserInput()

	processors = processors.sort((a, b) => a.energy > b.energy ? 1 : -1);

	const tasksTimes = Object.keys(tasks);
	let result = 0;

	for (const time of tasksTimes) {
		const task = tasks[time];
		let proc = null;
		if (!task) continue;

		for (let i = 0; i < processors.length; i++) {
			if (!processors[i].status) {
				processors[i].status = processors[i].freeAt <= time ? true : false
			}

			if (processors[i].status) {
				proc = processors[i];
				break;
			}
		}

		if (!proc) continue;

		proc.status = false;
		proc.freeAt = Number(time) + Number(task);

		result += proc.energy * Number(task);
	}

	console.log(result)

}

run();