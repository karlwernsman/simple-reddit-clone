/* Imports */
import { getPost } from '../fetch-utils.js';
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const postInfo = document.getElementById('post-info');
const postImage = document.getElementById('post-image');

/* State */
let error = null;
let post = null;

/* Events */
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (!id) {
        location.replace('/');
        return;
    }

    const response = await getPost(id);
    error = response.error;
    post = response.data;

    if (error) {
        displayError();
    }

    if (!post) {
        location.replace('/');
    } else {
        displayPost();
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

function displayPost() {
    postTitle.textContent = post.title;
    postInfo.textContent = post.info;
    postImage.src = post.image_url;
}
