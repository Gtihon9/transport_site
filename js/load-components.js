// Загружает header и footer на все страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка header
    fetch('../components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            // Помечаем активную страницу в навигации
            const currentPage = location.pathname.split('/').pop();
            const isStartPage = location.href === "http://127.0.0.1:5500/" || currentPage === ""; // Detect base URL
            document.querySelectorAll('.nav-link').forEach(link => {
                if (isStartPage && link.getAttribute('href') === "index.html") {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                } else if (link.getAttribute('href') === currentPage) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                }
    });
        });

    // Загрузка footer
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});