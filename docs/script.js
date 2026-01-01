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
