//your JS code here. If required.
// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(promiseName) {
    return new Promise((resolve) => {
        const randomTime = Math.floor(Math.random() * 3) + 1; // Random time between 1 and 3 seconds
        setTimeout(() => {
            resolve({ name: promiseName, time: randomTime });
        }, randomTime * 1000);
    });
}

// Create an array of promises
const promises = [
    createRandomPromise('Promise 1'),
    createRandomPromise('Promise 2'),
    createRandomPromise('Promise 3'),
];

// Insert loading text into the table
const output = document.getElementById('output');
const loadingRow = document.createElement('tr');
loadingRow.innerHTML = '<td colspan="2">Loading...</td>';
output.appendChild(loadingRow);

// Use Promise.all to wait for all promises to resolve
Promise.all(promises)
    .then((results) => {
        // Remove loading text
        output.removeChild(loadingRow);

        // Calculate total time taken
        const totalTime = results.reduce((acc, result) => acc + result.time, 0);

        // Populate the table with results
        results.forEach((result) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${result.name}</td><td>${result.time}</td>`;
            output.appendChild(row);
        });

        // Add the total time row
        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `<td>Total</td><td>${totalTime.toFixed(3)}</td>`; // Fixed to 3 decimal places
        output.appendChild(totalRow);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
