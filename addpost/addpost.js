/* Imports */
import { createPost, uploadImage } from '../fetch-utils.js';

/* Get DOM Elements */
const postForm = document.getElementById('add-post-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const imagePlaceholder = document.getElementById('image-placeholder');

/* State */
let error = null;

/* Events */
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);
    const imageFile = formData.get('image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `/${randomFolder}/${imageFile.name}`;
    const url = await uploadImage('photos', imagePath, imageFile);

    const post = {
        title: formData.get('title'),
        info: formData.get('info'),
        image_url: url,
    };

    const response = await createPost(post);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('../');
    }
});

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        imagePlaceholder.src = URL.createObjectURL(file);
    } else {
        imagePlaceholder.src = '../assets/bulletin-board.png';
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
