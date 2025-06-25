// Display all post titles
function displayPosts() {
  fetch('http://localhost:3000/posts')
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById('post-list');
      postList.innerHTML = ''; // Clear old list

      posts.forEach(post => {
        const div = document.createElement('div');
        div.textContent = post.title;
        div.classList.add('post-title');
        div.style.cursor = 'pointer';
        div.dataset.id = post.id;
        postList.appendChild(div);
      });
    });
}

// Show post details when title is clicked
function handlePostClick() {
  const postList = document.getElementById('post-list');

  postList.addEventListener('click', (e) => {
    const postId = e.target.dataset.id;

    if (postId) {
      fetch(`http://localhost:3000/posts/${postId}`) // FIXED: backticks used for template literal
        .then(res => res.json())
        .then(post => {
          const detail = document.getElementById('post-detail');
          detail.innerHTML = `
            <h2>${post.title}</h2>
            <img src="${post.image}" alt="${post.title}" width="300" />
            <p>${post.description}</p>
          `;
        });
    }
  });
}

// Add new post from form
function addNewPostListener() {
  const form = document.getElementById('new-post-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = form.title.value;
    const image = form.image.value;
    const description = form.description.value;

    const newPost = {
      title,
      image,
      description
    };

    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
    .then(res => res.json())
    .then(() => {
      displayPosts();     // Refresh the list
      form.reset();       // Clear the form
    });
  });
}

// Run all functions after DOM loads
function main() {
  displayPosts();
  handlePostClick();
  addNewPostListener();
}

document.addEventListener('DOMContentLoaded', main);
