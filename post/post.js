/* Imports */
import { getPost, createComment, getUser } from '../fetch-utils.js';
import { renderComment } from '../render-utils.js';
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const postInfo = document.getElementById('post-info');
const postImage = document.getElementById('post-image');
const addCommentForm = document.getElementById('add-comment-form');
const commentList = document.getElementById('comment-list');

/* State */
let error = null;
let post = null;
const user = getUser();

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
        displayComments();
    }
});

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addCommentForm);
    const commentInsert = {
        text: formData.get('text'),
        post_id: post.id,
    };

    const response = await createComment(commentInsert);
    error = response.error;

    if (error) {
        displayError();
    } else {
        const comment = response.data;
        post.comments.unshift(comment);
        displayComments();
        addCommentForm.reset();
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

function displayComments() {
    commentList.innerHTML = '';

    for (const comment of post.comments) {
        const commentEl = renderComment(comment, user.id);
        commentList.append(commentEl);
    }
}
