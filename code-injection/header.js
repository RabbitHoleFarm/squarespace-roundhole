let DateTime;

function fixDate(pubDate) {
    let dateValue = pubDate.getAttribute("datetime") || pubDate.innerText;
    if (pubDate.classList.contains('blog-meta-item--date')) {
        dateValue = document
            .querySelector('[itemprop="datePublished"]')
            .getAttribute('content')
            .split("T")[0];
    }

    pubDate.innerHTML = DateTime
        .fromISO(dateValue)
        .toLocaleString(DateTime.DATE_FULL);
}

function fixDates() {
    DateTime = window.luxon.DateTime;

    document.addEventListener('DOMContentLoaded', function () {
        document
            .querySelectorAll("time[datetime]:not([class*=event-time]), time[pubdate], time.blog-meta-item--date")
            .forEach(fixDate);
    });
}

(function () {
    var script = document.createElement("script");
    script.src = 'https://cdn.jsdelivr.net/npm/luxon@2.3.0/build/global/luxon.min.js';

    // IE < 7, does not support onload
    script.onreadystatechange = function () {
        if (script.readyState === "loaded" || script.readyState === "complete") {
            script.onreadystatechange = null;
            fixDates();
        }
    };

    // other browsers
    script.onload = fixDates.bind();

    document.documentElement.firstChild.appendChild(script);
})();