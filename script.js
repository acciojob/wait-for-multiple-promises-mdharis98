const outputElement = document.getElementById("output");
const loadingrow = document.createElement("tr");
loadingrow.id = "loading";
loadingrow.innerHTML = '<td colspan="2">Loading...</td>';
outputElement.appendChild(loadingrow);
const createPromise = (name) => {
	const startTime = performance.now();
	return new Promise((resolve) => {
		const timeTaken = Math.random() * 2 + 1;
		setTimeout(() => {
			const endTime = performance.now();
			const timeInSeconds = ((endTime - startTime) / 1000).toFixed(3);
			resolve({ name, time: timeInSeconds });
		}, timeTaken * 1000);
	})
}
const promise1 = createPromise("Promise 1");
const promise2 = createPromise("Promise 2");
const promise3 = createPromise("Promise 3");
const startTime = performance.now();
Promise.all([promise1, promise2, promise3]).then((results) => {
	outputElement.removeChild(loadingrow);
	results.forEach((result) => {
		const row = document.createElement("tr");
		row.innerHTML = `<td>${result.name}</td><td>${result.time}</td>`;
		outputElement.appendChild(row);
	})
	const endTime = performance.now();
	const totalTimeInSeconds = ((endTime - startTime) / 1000).toFixed(3);
	const totalRow = document.createElement('tr');
	totalRow.innerHTML = `<td>Total</td><td>${totalTimeInSeconds}</td>`;
	outputElement.appendChild(totalRow);
})