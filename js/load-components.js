document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('../components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            
            // Mark active page
            const currentPath = window.location.pathname;
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                const linkPath = new URL(link.href).pathname;
                
                // Remove trailing slashes for comparison
                const cleanCurrentPath = currentPath.replace(/\/$/, '');
                const cleanLinkPath = linkPath.replace(/\/$/, '');
                
                // Special case for index page
                const isIndexPage = cleanCurrentPath.endsWith('/index.html') || 
                                   cleanCurrentPath.endsWith('/') || 
                                   cleanCurrentPath === '';
                
                if ((isIndexPage && link.getAttribute('href').includes('index.html')) ||
                    (!isIndexPage && cleanCurrentPath.includes(cleanLinkPath))) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                }
            });
        });

    // Load footer
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});