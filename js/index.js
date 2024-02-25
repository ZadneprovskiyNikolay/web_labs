const NUMBER_OF_POSTS = 5;
const DAY_IN_MS = 86400000;

document.addEventListener("DOMContentLoaded", function() {
    loadPosts();
});

const loadPosts = async () => {
    const articlesList = document.getElementById("posts-ul");
    postTimeMs = Date.now();
    const postIds = new Set();

    for (let i = 0; i < NUMBER_OF_POSTS; i++) {
        const postId = (Date.now() + i) % (NUMBER_OF_POSTS + i) + 34;
        if (postIds.has(postId)) {
            i--;
            continue;
        }
        postIds.add(postId);
        postTimeMs = postTimeMs - DAY_IN_MS * 3 * Math.random();
        const postTimeFormated = (new Date(postTimeMs)).toLocaleString();        
        var post = document.createElement("li");
        post.innerHTML = `
        <article>
            <h4 id="post-${postId}-header"></h4>
            <div id="post-${postId}-content"></div>
            <img class="loading-gif" id="post-${postId}-loading-gif" src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.1/images/loading.gif"></src>
        </article>
        `
        
        articlesList.appendChild(post);

        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(async (response) => {         
                const postHeader = document.getElementById(`post-${postId}-header`);
                const postContent = document.getElementById(`post-${postId}-content`);
                const postData = await response.json();
                postHeader.innerHTML = postTimeFormated;
                postContent.innerHTML = postData.body;
            })
            .finally(() => {
                document.getElementById(`post-${postId}-loading-gif`).hidden = true;
            })
            .catch((error) => {
                console.log(error);
                document.getElementById(`post-${postId}-content`).innerHTML = "Oops...";
            })
    }
}
