let offset;

async function putPost(offset) {
    const offsetDiv = document.getElementById('offset');
    offsetDiv.innerText = "Post: " + offset;

    try {
        const res = await window.tumblr.getPost(offset);
        if (res && res.posts && res.posts.length > 0) {
            const post = res.posts[0];

            // Display blog name
            const blogName = post.blog.name;
            const blogDiv = document.getElementById('blog');
            blogDiv.innerText = blogName;

            // Display post body
            const body = post.body;
            const div = document.getElementById('post');
            div.innerHTML = body;  
        } else {
            console.log('No posts found for offset:', offset);
        }
    } catch (error) {
            const div = document.getElementById('post');
            div.innerText = 'something went wrong';  
    }
}

window.onload = async () => {
    // Generate a random initial offset between 1 and 1000
    const randomOffset = Math.floor(Math.random() * 1000) + 1;
    offset = randomOffset;
    console.log('Initial offset:', offset);

    // Load the post for the random offset
    putPost(offset);
};

const prev = document.getElementById('prev');
prev.addEventListener("click", () => {
    offset = Math.max(offset - 1, 1);  // Ensure offset does not go below 1
    putPost(offset);
});

const next = document.getElementById('next');
next.addEventListener("click", () => {
    offset = offset + 1;  
    putPost(offset);
});

const random = document.getElementById('random');
random.addEventListener("click", () => {
    const offset = Math.floor(Math.random() * 1000) + 1;
    putPost(offset);
});
