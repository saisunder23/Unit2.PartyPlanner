// Get references to DOM elements
const partyList = document.getElementById('party-list'); // Container to display parties
const partyForm = document.getElementById('party-form'); // Form for adding new parties

// Fetches and renders the list of parties from the API
async function fetchParties() {
    try {
        // Fetching party data from the API
        const response = await fetch('/events');
        const parties = await response.json(); // Parsing the response to JSON
        renderParties(parties); // Calling the function to render parties on the page
    } catch (error) {
        // Logs any errors encountered during the fetch
        console.error('Error fetching parties:', error);
    }
}

// Renders the list of parties on the page
function renderParties(parties) {
    partyList.innerHTML = ''; // Clear existing parties from the DOM

    // Iterate through each party in the fetched data
    parties.forEach(party => {
        // Create a new div element for each party
        const partyItem = document.createElement('div');

        // Set the inner HTML of the party item with party details and delete button
        partyItem.innerHTML = `
            <h2>${party.name}</h2>
            <p>Date: ${party.date}</p>
            <p>Time: ${party.time}</p>
            <p>Location: ${party.location}</p>
            <p>${party.description}</p>
            <button onclick="deleteParty('${party.id}')">Delete</button> <!-- Delete button with onclick event -->
        `;

        // Append the party item to the party list container
        partyList.appendChild(partyItem);
    });
}

// Call fetchParties on page load to display the initial list of parties
fetchParties();

// Event listener for the form submission to add a new party
partyForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Create a new party object with values from form inputs
    const newParty = {
        name: document.getElementById('party-name').value,
        date: document.getElementById('party-date').value,
        time: document.getElementById('party-time').value,
        location: document.getElementById('party-location').value,
        description: document.getElementById('party-description').value,
    };

    try {
        // Send a POST request to the API to add the new party
        await fetch('/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the request headers to JSON
            },
            body: JSON.stringify(newParty), // Convert new party data to JSON string
        });

        fetchParties(); // Refresh the party list to include the new party
        partyForm.reset(); // Clear the form inputs after submission
    } catch (error) {
        // Logs any errors encountered during the POST request
        console.error('Error adding party:', error);
    }
});

// Function to delete a party by ID
async function deleteParty(id) {
    tr
