/* Imports */
import { createPost } from '../fetch-utils.js';

/* Get DOM Elements */
const postForm = document.getElementById('add-post-form');
const errorDisplay = document.getElementById('error-display');

/* State */
let error = null;

/* Events */
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);

    const post = {
        title: formData.get('title'),
        info: formData.get('info'),
    };

    const response = await createPost(post);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('../');
    }
});

/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
