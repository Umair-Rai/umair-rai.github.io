# Umair Akram — Portfolio Website

A modern, responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — just clean, fast, production-ready code.

🔗 **Live:** [your-domain.com](https://umair-rai.github.io/) *(update with your link)*

---

## Preview

![Portfolio Preview](Image.png)

---

## Features

- **Dark / Light mode** — toggle with smooth transition, persists via `localStorage`
- **Animated hero** — two-column layout with profile photo, typing effect, and floating badges
- **Experience timeline** — work history with role details, bullet points, and tech tags
- **Featured projects** — card grid with images, descriptions, highlights, and live/code links
- **More projects** — categorized compact cards for academic and side work
- **Skills section** — icon-topped cards with hoverable tech pills
- **Contact section** — structured contact card with email, GitHub, and LinkedIn
- **Scroll progress bar** — top-of-page reading indicator
- **Scroll reveal animations** — elements animate in as you scroll
- **Active nav highlighting** — nav link tracks current section
- **Fully responsive** — mobile, tablet, and desktop

---

## Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Markup     | Semantic HTML5                       |
| Styling    | Vanilla CSS (custom properties, Grid, Flexbox) |
| Scripting  | Vanilla JavaScript (ES6+)            |
| Fonts      | Inter + Fira Code (Google Fonts)     |

---

## Project Structure

```
portfolio/
├── index.html      # Main markup and structure
├── styles.css      # All styling and responsive design
├── script.js       # Interactivity, animations, theme toggle
├── Image.png       # Profile / project image
└── README.md       # This file
```

---

## Getting Started

No install or build step required. Just open the file:

```bash
# Option 1 — open directly
start index.html        # Windows
open index.html         # macOS

# Option 2 — local dev server with live reload
npx serve .

# Option 3 — Python
python -m http.server 3000
# then visit http://localhost:3000
```

---

## Customization

| What to change         | Where                          |
|------------------------|--------------------------------|
| Name / bio text        | `index.html` — hero section    |
| Profile photo          | Replace `Image.png`            |
| Project details        | `index.html` — projects section |
| Work experience        | `index.html` — experience section |
| Color accent           | `styles.css` — `:root` variables (`--accent-1`, `--accent-2`) |
| Typing phrases         | `script.js` — `phrases` array  |
| Social / email links   | `index.html` — hero + contact sections |

---

## Experience

**Data Science Developer @ Horrizon AI** *(Sep 2025 – Present)*
Building AI-powered web applications and data pipelines — React.js, Node.js, MongoDB, ML integrations.

**Web Developer @ Softrick Solutions** *(Jan 2024 – Jul 2025)*
Full-stack web development across client projects — React.js, Node.js, REST APIs, Git.

---

## Featured Projects

- **AI Pet Breed Recognition Platform** — Deep learning (PyTorch CNNs) + MERN stack for pet breed identification with e-commerce and recommendation system
- **WeekViz** — Business analytics platform with interactive dashboards, deployed on VPS → [app.weekviz.com](https://app.weekviz.com)
- **Electron Store** — Bilingual (English/Arabic) e-commerce platform with inquiry-based cart and admin panel

---

## License

This project is open source under the [MIT License](LICENSE).

---

*Built with passion for AI & innovation — Umair Akram*
