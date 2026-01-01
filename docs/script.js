const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
// Default is dark if nothing saved and no system preference
const savedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
} else if (prefersLight) {
    body.setAttribute('data-theme', 'light');
} else {
    body.setAttribute('data-theme', 'dark');
}

toggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Hamburger Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});


function copyInstall() {
    navigator.clipboard.writeText('npm install log-tonic');
    const btn = document.querySelector('.copy-btn');
    const originalIcon = btn.innerHTML;

    // Change to checkmark
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#27c93f" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';

    setTimeout(() => {
        btn.innerHTML = originalIcon;
    }, 2000);
}
