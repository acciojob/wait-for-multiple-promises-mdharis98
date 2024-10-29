// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(promiseName) {
  return new Promise((resolve) => {
    const timeToResolve = Math.floor(Math.random() * 3) + 1; // Random time between 1 and 3 seconds
    setTimeout(() => {
      resolve({ name: promiseName, time: timeToResolve });
    }, timeToResolve * 1000);
  });
}

// Create three promises
const promises = [
  createRandomPromise("Promise 1"),
  createRandomPromise("Promise 2"),
  createRandomPromise("Promise 3"),
];

// Function to populate the table
function populateTable(results, totalTime) {
  const output = document.getElementById("output");
  output.innerHTML = ""; // Clear previous content

  results.forEach(result => {
    const row = document.createElement("tr");
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");

    cell1.textContent = result.name;
    cell2.textContent = result.time;

    row.appendChild(cell1);
    row.appendChild(cell2);
    output.appendChild(row);
  });

  // Add the total row
  const totalRow = document.createElement("tr");
  const totalCell1 = document.createElement("td");
  const totalCell2 = document.createElement("td");

  totalCell1.textContent = "Total";
  totalCell2.textContent = totalTime.toFixed(3); // Format to three decimal places

  totalRow.appendChild(totalCell1);
  totalRow.appendChild(totalCell2);
  output.appendChild(totalRow);
}

// Show loading text while promises are resolving
document.getElementById("output").innerHTML = "<tr><td colspan='2'>Loading...</td></tr>";

// Use Promise.all to wait for all promises to resolve
Promise.all(promises).then((results) => {
  // Calculate total time taken
  const totalTime = results.reduce((acc, curr) => acc + curr.time, 0);

  // Populate the table with results
  populateTable(results, totalTime);
});
