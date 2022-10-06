/* Imports */
import { getPost, createComment } from '../fetch-utils.js';
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const postInfo = document.getElementById('post-info');
const postImage = document.getElementById('post-image');
const addCommentForm = document.getElementById('add-comment-form');

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

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // > Part C:
    //    - create an comment insert object from formdata and the id of the pet
    const formData = new FormData(addCommentForm);
    const commentInsert = {
        text: formData.get('text'),
        post_id: post.id,
    };
    //    - create the comment
    const response = await createComment(commentInsert);
    error = response.error;
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
