(function () {
    document.addEventListener('DOMContentLoaded',() => {
        const observer = new PerformanceObserver((list) => {
            const entry = list.getEntries()[0];
            const pageLoadTime = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
            document.getElementById("load-time").innerText = `Page load time is ${pageLoadTime.toFixed(1)} ms`
        });
        observer.observe({ type: "navigation", buffered: true });
    })
})();

window.addEventListener("DOMContentLoaded", function() {
    for (let navLink of document.getElementsByClassName('nav-link')) {
        activeNavLinkId = `nav-link-${document.location.pathname}`;
        if (navLink.id == activeNavLinkId) {
            navLink.style.textDecoration = 'underline';
        }
    };
});