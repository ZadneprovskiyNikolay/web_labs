document.addEventListener("DOMContentLoaded", function() {
    highlightNavButton();
});

const highlightNavButton = () => {
    for (let navLink of document.getElementsByClassName('nav-link')) {
        if (navLink.href == document.location) {
            navLink.style.textDecoration = 'underline';
            break;
        }
    };
}

(function () {
    const startTime = performance.now();
    window.addEventListener('load', async () => {
        const loadTime = performance.now() - startTime;
        document.getElementById("load-time").innerText =
            `Loading time: ${loadTime.toFixed(0)} ms`;
    });
})();