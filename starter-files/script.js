/**
 * STEPS:
 *
 * 1. Create a fetchAnswer function and call the API
 * 2. Output the API's response
 * 3. Attach fetchAnswer to an event listener
 * 4. Clear output after 5 seconds
 * 5. Optional: add loading/error states
 *
 */

// API
const API_ENDPOINT = 'https://yesno.wtf/api';

// Fetches the answer from the API
async function fetchAnswer() {
    try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        return data.answer; // Returns the answer (yes/no)
    } catch (error) {
        console.error('Error fetching the answer:', error);
        return 'Error! Please try again';
    }
}

// Handles what happens when the button is clicked or Enter is pressed
function handleInteraction() {
    const inputField = document.getElementById('input');
    const answerContainer = document.getElementById('answer');
    const errorElement = document.getElementById('error');

    // Validate the input
    if (inputField.value.trim() === '') {
        errorElement.textContent = 'Please ask a question!';
        return;
    }

    // Clear error message and show a loading message
    errorElement.textContent = '';
    answerContainer.textContent = 'Thinking...';

    // Fetch the answer
    fetchAnswer().then(answer => {
        answerContainer.textContent = answer;

        // Clear the output after 5 seconds
        setTimeout(() => {
            answerContainer.textContent = '';
        }, 5000);
    });
}

// Event handler for the Enter key
function handleKeyEnter(event) {
    if (event.key === 'Enter') {
        handleInteraction();
    }
}

// Add event listener to the button
document.getElementById('button').addEventListener('click', handleInteraction);

