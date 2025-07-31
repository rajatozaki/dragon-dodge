# Dragon's Dodge: An Endless Flight

**Dragon's Dodge** is a 3D endless-runner browser game built using Three.js. You pilot a flying dragon and navigate through a city filled with randomly generated buildings. The challenge is simple: survive as long as you can without crashing.

Live demo: [https://dragon-dodge.vercel.app/](https://dragon-dodge.vercel.app/)

## How to Play

- Use `A` / `D` or `←` / `→` keys to steer left and right
- Avoid colliding with buildings
- The game ends when you crash
- Press **Start Game** to begin, and **Fly Again** to restart

## Features

- Smooth 3D gameplay using Three.js
- Snake-like animated dragon with body segments
- Dynamic camera tracking and environmental fog
- Procedural building placement to simulate an endless city
- Frosted-glass style UI for start and game over screens
- Live score tracking
- Responsive full-screen canvas

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Three.js (via CDN)

## Folder Structure

```
.
├── index.html      # Entry point with canvas and UI
├── main.js         # Game logic, rendering, controls
└── style.css       # Layout, typography, UI styling
```

## Run Locally

No setup required. Just clone the repo and open `index.html` in any modern browser.

```bash
git clone https://github.com/your-username/dragons-dodge.git
cd dragons-dodge
```

Then open `index.html` in your browser.

## Credits

Built using [Three.js](https://threejs.org/) as a lightweight demo of basic 3D game mechanics in the browser.

---

Feel free to fork or build on top of it.
