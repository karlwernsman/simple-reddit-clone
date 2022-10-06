export function renderPost(post) {
    const li = document.createElement('li');

    const h2 = document.createElement('h2');
    h2.textContent = post.title;

    const p = document.createElement('p');
    p.textContent = post.info;

    const img = document.createElement('img');
    img.src = post.image_url;

    li.append(h2, p, img);

    return li;
}
