
window.onload = async () => {
    const res = await window.tumblr.getPost(1, 1, 'text');
    console.log(res)
    const body = res.posts[0].body
    const div = document.getElementById('post');
    div.innerHTML = body;  // Insert the fetched post into the div
};
