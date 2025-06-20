document.addEventListener('DOMContentLoaded', function() {
    const isGitHubPages = window.location.host.includes('github.io');
    const repoName = 'transport_site';
    const githubBase = `https://gtihon9.github.io/${repoName}`;
    
    // Load components
    loadComponent('header');
    loadComponent('footer');

    function loadComponent(name) {
        const path = isGitHubPages 
            ? `${githubBase}/components/${name}.html`
            : `../components/${name}.html`;
            
        fetch(path)
            .then(response => response.text())
            .then(html => {
                document.getElementById(name).innerHTML = html;
                if (name === 'header') {
                    setupNavigation();
                    convertLinks();
                }
            })
            .catch(console.error);
    }

    function setupNavigation() {
        const currentPath = window.location.pathname;
        const comparePath = isGitHubPages 
            ? currentPath.replace(`/${repoName}`, '')
            : currentPath;
        
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (comparePath === linkPath || 
               (comparePath.includes('/vehicles/') && linkPath.endsWith('/services.html'))) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    function convertLinks() {
        if (!isGitHubPages) return;
        
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith('//')) {
                link.href = `${githubBase}${href}`;
            }
        });
    }
});