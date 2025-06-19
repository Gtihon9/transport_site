document.addEventListener('DOMContentLoaded', function() {
    // Determine if we're on GitHub Pages
    const isGitHubPages = window.location.host.includes('github.io');
    const basePath = isGitHubPages ? `/${window.location.pathname.split('/')[1]}/` : '/';
    
    // Load header with fallback
    const loadHeader = () => {
        fetch(`${basePath}components/header.html`)
            .then(response => {
                if (!response.ok) throw new Error('Failed to load header');
                return response.text();
            })
            .then(data => {
                document.getElementById('header').innerHTML = data;
                highlightActiveLink();
            })
            .catch(() => {
                // Fallback to local path
                fetch('../components/header.html')
                    .then(response => response.text())
                    .then(data => {
                        document.getElementById('header').innerHTML = data;
                        highlightActiveLink();
                    });
            });
    };

    // Load footer with fallback
    const loadFooter = () => {
        fetch(`${basePath}components/footer.html`)
            .then(response => {
                if (!response.ok) throw new Error('Failed to load footer');
                return response.text();
            })
            .then(data => {
                document.getElementById('footer').innerHTML = data;
            })
            .catch(() => {
                // Fallback to local path
                fetch('../components/footer.html')
                    .then(response => response.text())
                    .then(data => {
                        document.getElementById('footer').innerHTML = data;
                    });
            });
    };

    // Active link highlighting
    const highlightActiveLink = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            let linkPath = link.getAttribute('href');
            
            // Normalize paths
            const normalize = path => path.replace(/\/$/, '')
                                         .replace(/^\.\//, '')
                                         .replace(/^\.\.\//, '')
                                         .toLowerCase();
            
            const current = normalize(currentPath.replace(basePath, ''));
            const target = normalize(linkPath);
            
            // Check for active link
            if ((current === '' && target === 'index.html') ||
                (current === target) ||
                (current.includes(target) && target !== '') ||
                (target.includes(current) && current !== '')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
                link.closest('.nav-item')?.classList.add('active');
            }
        });
    };

    loadHeader();
    loadFooter();
});