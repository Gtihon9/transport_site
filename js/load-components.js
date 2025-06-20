document.addEventListener('DOMContentLoaded', function() {
    // Detect environment
    const isGitHubPages = window.location.host.includes('github.io');
    const repoName = 'transport_site'; // Your repository name
    const basePath = isGitHubPages ? `/${repoName}/` : '/';

    // Load header
    fetch(`${basePath}components/header.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            setupNavigation();
        })
        .catch(() => {
            // Fallback for local development
            fetch('../components/header.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('header').innerHTML = data;
                    setupNavigation();
                });
        });

    function setupNavigation() {
        // Convert all relative links to absolute
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#')) {
                if (href.startsWith('../')) {
                    link.setAttribute('href', basePath + href.replace('../', ''));
                } else {
                    link.setAttribute('href', basePath + href);
                }
            }
        });

        // Set active link
        const currentPath = window.location.pathname.replace(basePath, '');
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkPath = link.getAttribute('href').replace(basePath, '');
            if (currentPath === linkPath || 
               (currentPath.startsWith('vehicles/') && linkPath === 'services.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // Load footer similarly
    // ...
});