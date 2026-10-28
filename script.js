// ==========================================================================
// NAVIGATION ACTIVE PILL CONTROLLER
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Select all interactive navigation tab links
    const navItems = document.querySelectorAll('.nav-links .nav-item');

    // ----------------------------------------------------------------------
    // 1. ONE-CLICK ACTIVE PILL SWITCHER
    // Immediately transfers the brown pill highlight to whichever link is clicked[cite: 15].
    // ----------------------------------------------------------------------
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove the active brown pill styling from all navigation links
            navItems.forEach(link => link.classList.remove('active'));

            // Apply the active brown pill styling to the clicked item
            this.classList.add('active');
        });
    });

    // ----------------------------------------------------------------------
    // 2. AUTOMATIC ROUTE DETECTION (FOR MULTI-PAGE NAVIGATION)
    // Checks the browser's current page URL and ensures the right link has 
    // the brown pill highlighted upon page refresh or direct loading.
    // ----------------------------------------------------------------------
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navItems.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            navItems.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});