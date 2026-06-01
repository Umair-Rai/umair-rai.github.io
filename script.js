// =============================================
// THEME TOGGLE
// =============================================

const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// =============================================
// NAVIGATION
// =============================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    // Navbar scroll state
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Scroll progress bar
    const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress.style.width = (window.scrollY / total * 100) + '%';

    // Active nav link highlight
    highlightActiveSection();
}, { passive: true });

// Mobile menu
navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
        spans[0].style.cssText = 'transform: rotate(45deg) translate(5px, 5px)';
        spans[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
        spans[2].style.cssText = 'transform: rotate(-45deg) translate(5px, -5px)';
    } else {
        spans.forEach(s => s.style.cssText = '');
    }
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.querySelectorAll('span').forEach(s => s.style.cssText = '');
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.querySelectorAll('span').forEach(s => s.style.cssText = '');
    }
});

// Keyboard: Escape closes menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.querySelectorAll('span').forEach(s => s.style.cssText = '');
        navToggle.focus();
    }
});

// Smooth scroll (accounts for fixed navbar height)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
            window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
        }
    });
});

function highlightActiveSection() {
    const scrollY = window.scrollY + 120;
    document.querySelectorAll('section[id]').forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.id;
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < bottom);
        }
    });
}

// =============================================
// TYPING EFFECT
// =============================================

const typingEl = document.getElementById('typingText');
const phrases = [
    'intelligent AI systems.',
    'scalable web platforms.',
    'deep learning models.',
    'full-stack applications.',
    'computer vision tools.',
    'data-driven products.',
];

let pIdx = 0, cIdx = 0, deleting = false;

function type() {
    const phrase = phrases[pIdx];
    if (deleting) {
        typingEl.textContent = phrase.slice(0, --cIdx);
    } else {
        typingEl.textContent = phrase.slice(0, ++cIdx);
    }

    let delay = deleting ? 40 : 90;
    if (!deleting && cIdx === phrase.length) { delay = 2200; deleting = true; }
    else if (deleting && cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; delay = 400; }

    setTimeout(type, delay);
}

window.addEventListener('load', () => setTimeout(type, 800));

// =============================================
// SCROLL REVEAL
// =============================================

const revealObs = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.scroll-reveal').forEach(el => revealObs.observe(el));

// =============================================
// FOOTER YEAR
// =============================================

const footerYear = document.getElementById('footerYear');
if (footerYear) {
    footerYear.textContent = `© ${new Date().getFullYear()} Umair Akram. Built with passion for AI & innovation.`;
}

// =============================================
// CONSOLE EASTER EGG
// =============================================

console.log('%c< UA />', 'color: #00c9a7; font-size: 24px; font-weight: 900; font-family: monospace;');
console.log('%cHey! Curious about the code? Check out: https://github.com/umair-rai', 'color: #00b4d8; font-size: 13px;');
console.log('%cLet\'s build something amazing together 🚀', 'color: #8b949e; font-size: 13px;');
