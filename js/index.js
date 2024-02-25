(function () {
    const startTime = performance.now();
    window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        document.getElementById("load-time").innerText = `Page loaded in ${loadTime} ms`;
    });

        document.addEventListener('DOMContentLoaded',() => {
        const observer = new PerformanceObserver((list) => {
            const entry = list.getEntries()[0];
            const pageLoadTime = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
            
        });
        observer.observe({ type: "navigation", buffered: true });
    })

})();

document.addEventListener("DOMContentLoaded", function() {
    for (let navLink of document.getElementsByClassName('nav-link')) {
        if (navLink.href == document.location) {
            navLink.style.textDecoration = 'underline';
            break;
        }
    };
});