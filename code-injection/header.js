function fixDates() {
    var DateTime = luxon.DateTime;

    function fixDate(pubDate) {
        let dateValue = pubDate.getAttribute("datetime") || pubDate.innerText;

        if (pubDate.classList.contains('blog-meta-item--date')) {
            dateValue = document.querySelector('[itemprop="datePublished"]').getAttribute('content').split("T")[0];
        }

        pubDate.innerHTML = DateTime
            .fromISO(dateValue)
            .toLocaleString(DateTime.DATE_FULL);
    }

    document.addEventListener('DOMContentLoaded', function () {
        const pubdates = document.querySelectorAll("time[datetime]:not([class*=event-time]), time[pubdate], time.blog-meta-item--date");

        pubdates.forEach(fixDate);
    });
}

(function () {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://cdn.jsdelivr.net/npm/luxon@2.3.0/build/global/luxon.min.js';

    s.onreadystatechange = fixDates;
    s.onload = fixDates;

    document.head.appendChild(s);
})();