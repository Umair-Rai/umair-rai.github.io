// =============================================
// JOB DURATION (auto-calculated from start date)
// =============================================

document.querySelectorAll('.job-duration').forEach((el) => {
    const start = new Date(el.dataset.start);
    const now = new Date();
    let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    if (now.getDate() < start.getDate()) months--;
    months = Math.max(months, 0);

    const years = Math.floor(months / 12);
    const remMonths = months % 12;

    const parts = [];
    if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
    if (remMonths > 0 || years === 0) parts.push(`${remMonths} mo${remMonths !== 1 ? 's' : ''}`);

    el.textContent = `Present · ${parts.join(' ')}`;
});

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
    'AI-powered applications.',
    'LLM applications.',
    'RAG systems.',
    'machine learning solutions.',
    'AI automation.',
    'full-stack applications.',
];

let pIdx = 0, cIdx = 0, deleting = false;

function type() {
    if (!typingEl) return;
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

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Once the reveal finishes, drop `scroll-reveal` so the element's own hover
// transitions (and tilt) aren't slowed by the reveal transition/stagger delay.
function settleReveal(el) {
    el.style.transitionDelay = '';
    el.classList.remove('scroll-reveal');
}

const revealObs = new IntersectionObserver(
    (entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            el.classList.add('revealed');
            revealObs.unobserve(el);
            if (reduceMotion) { settleReveal(el); return; }
            el.addEventListener('transitionend', function onEnd(ev) {
                if (ev.target !== el || ev.propertyName !== 'opacity') return;
                el.removeEventListener('transitionend', onEnd);
                settleReveal(el);
            });
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.scroll-reveal').forEach((el) => {
    const siblings = el.parentElement.querySelectorAll('.scroll-reveal');
    const sibIdx = Array.from(siblings).indexOf(el);
    if (sibIdx > 0) {
        el.style.transitionDelay = `${sibIdx * 80}ms`;
    }
    revealObs.observe(el);
});

// =============================================
// COUNT-UP STATS
// =============================================

const countObs = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        countObs.unobserve(target);
        const end = Number(target.dataset.count);
        const decimals = Number(target.dataset.decimals || 0);
        const prefix = target.dataset.prefix || '';
        const suffix = target.dataset.suffix || '';
        const fmt = (v) => prefix + v.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }) + suffix;
        if (reduceMotion) { target.textContent = fmt(end); return; }
        const t0 = performance.now();
        const dur = 1400;
        const tick = (now) => {
            const p = Math.min((now - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            target.textContent = fmt(end * eased);
            if (p < 1) requestAnimationFrame(tick);
        };
        target.textContent = fmt(0);
        setTimeout(() => requestAnimationFrame(tick), target.closest('.hero') ? 900 : 150);
    });
}, { threshold: 0.6 });

document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

// =============================================
// SKILL PILL STAGGER INDEX
// =============================================

document.querySelectorAll('.skill-pills').forEach(group => {
    group.querySelectorAll('.skill-pill').forEach((pill, i) => pill.style.setProperty('--i', i));
});

// =============================================
// POINTER EFFECTS: spotlight, tilt, magnetic buttons, hero parallax
// =============================================

if (finePointer && !reduceMotion) {
    const hero = document.getElementById('home');
    const profileFrame = document.querySelector('.profile-frame');

    if (hero) hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty('--mx', `${e.clientX - r.left}px`);
        hero.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });

    if (profileFrame) {
        profileFrame.addEventListener('pointermove', (e) => {
            const r = profileFrame.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            profileFrame.style.setProperty('--pry', `${x * 12}deg`);
            profileFrame.style.setProperty('--prx', `${-y * 12}deg`);
        }, { passive: true });
        profileFrame.addEventListener('pointerleave', () => {
            profileFrame.style.setProperty('--pry', '0deg');
            profileFrame.style.setProperty('--prx', '0deg');
        });
    }

    document.querySelectorAll('.project-card, .skill-card, .more-card, .timeline-card, .contact-card, .pp-card')
        .forEach(card => {
            card.classList.add('spot');
            const tilt = card.classList.contains('project-card');
            card.addEventListener('pointermove', (e) => {
                const r = card.getBoundingClientRect();
                const x = e.clientX - r.left;
                const y = e.clientY - r.top;
                card.style.setProperty('--mx', `${x}px`);
                card.style.setProperty('--my', `${y}px`);
                if (tilt) {
                    card.style.setProperty('--ry', `${(x / r.width - 0.5) * 6}deg`);
                    card.style.setProperty('--rx', `${-(y / r.height - 0.5) * 6}deg`);
                }
            }, { passive: true });
            if (tilt) {
                card.addEventListener('pointerleave', () => {
                    card.style.setProperty('--rx', '0deg');
                    card.style.setProperty('--ry', '0deg');
                });
            }
        });

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('pointermove', (e) => {
            const r = btn.getBoundingClientRect();
            btn.style.setProperty('--tx', `${(e.clientX - r.left - r.width / 2) * 0.18}px`);
            btn.style.setProperty('--ty', `${(e.clientY - r.top - r.height / 2) * 0.28}px`);
        }, { passive: true });
        btn.addEventListener('pointerleave', () => {
            btn.style.setProperty('--tx', '0px');
            btn.style.setProperty('--ty', '0px');
        });
    });
}

// =============================================
// HERO PARTICLE NETWORK
// ~45 nodes, O(n^2) link checks per frame (~1k pairs) - no spatial index needed.
// =============================================

(function heroNetwork() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext('2d');
    const hero = canvas.parentElement;
    const LINK = 130;
    const mouse = { x: -9999, y: -9999 };
    let w = 0, h = 0, dpr = 1, nodes = [], running = false, visible = true;

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = hero.clientWidth;
        h = hero.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.round(Math.min(55, Math.max(22, (w * h) / 22000)));
        nodes = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
        }));
    }

    function frame() {
        if (!running) return;
        ctx.clearRect(0, 0, w, h);
        const light = html.getAttribute('data-theme') === 'light';
        const rgb = light ? '0, 150, 122' : '0, 184, 150';

        for (const n of nodes) {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > w) n.vx *= -1;
            if (n.y < 0 || n.y > h) n.vy *= -1;
            const dx = n.x - mouse.x, dy = n.y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 120 * 120 && d2 > 1) {
                const f = (1 - Math.sqrt(d2) / 120) * 0.6;
                n.x += (dx / Math.sqrt(d2)) * f;
                n.y += (dy / Math.sqrt(d2)) * f;
            }
        }

        for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i];
            ctx.fillStyle = `rgba(${rgb}, 0.55)`;
            ctx.beginPath();
            ctx.arc(a.x, a.y, 1.8, 0, Math.PI * 2);
            ctx.fill();
            for (let j = i + 1; j < nodes.length; j++) {
                const b = nodes[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < LINK * LINK) {
                    ctx.strokeStyle = `rgba(${rgb}, ${(1 - Math.sqrt(d2) / LINK) * 0.28})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(frame);
    }

    function setRunning(on) {
        if (on && !running) { running = true; requestAnimationFrame(frame); }
        else if (!on) running = false;
    }

    hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });

    new ResizeObserver(resize).observe(hero);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; setRunning(visible && !document.hidden); }).observe(hero);
    document.addEventListener('visibilitychange', () => setRunning(visible && !document.hidden));
    resize();
})();

// =============================================
// FOOTER YEAR
// =============================================

const footerYear = document.getElementById('footerYear');
if (footerYear) {
    footerYear.textContent = `© ${new Date().getFullYear()} Umair Akram`;
}

// =============================================
// CONSOLE EASTER EGG
// =============================================

console.log('%c< UA />', 'color: #00b896; font-size: 24px; font-weight: 900; font-family: monospace;');
console.log('%cHey — curious about the code? github.com/umair-rai', 'color: #00b896; font-size: 13px; opacity: 0.8;');
console.log('%cLet\'s build something together.', 'color: #8892a0; font-size: 13px;');
