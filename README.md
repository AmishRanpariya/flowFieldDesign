# Flow Field Design

A generative art tool that renders mesmerizing particle trails guided by a Perlin noise vector field. Every page load produces a unique piece — different colors, particle counts, speeds, and field configurations — so no two runs ever look the same.

**[Live Demo](https://amishranpariya.github.io/flowFieldDesign/)**

---

## How It Works

Thousands of particles are scattered randomly across a canvas. Each frame, a 2D grid of vectors is computed using Perlin noise — the noise value at each cell is mapped to an angle, forming a smooth, flowing field. Particles sample the vector nearest to their position, accelerate in that direction, and draw a tiny line segment from their previous position to their new one. Over thousands of frames those segments accumulate into the flowing, paint-like strokes you see.

A slow drift in the noise's Z dimension (`zinc`) causes the field to evolve over time, giving the output a slow, breathing animation.

### Randomized Parameters

On every load, all parameters are chosen at random within tuned ranges:

| Parameter | Range | Effect |
|-----------|-------|--------|
| `count` | 100 – 5 000 | Number of simultaneous particles |
| `scl` | 1 – 10 | Grid cell size; smaller = finer field detail |
| `inc` | 0.01 – 0.1 | Noise XY step; lower = smoother curves |
| `maxSpeed` | 1 – 5 | Maximum particle velocity |
| `magnitude` | 0.01 – 1 | Strength of the field force on particles |
| `alpha` | −10 – 10 | Background overlay opacity; controls trail fade |
| `zinc` | 0 – 0.001 | Z-axis noise drift; controls animation speed |
| `strokeW` | 0.01 – 1 | Thickness of each particle trail |
| `COLOR` | 10 palettes | One of ten curated 4-color palettes |

The chosen values are printed below the canvas so you can reproduce or tweak an output you like.

### Color Palettes

Ten hand-picked 4-color palettes are included. One palette is selected per run and particles draw from its four colors randomly:

```
Deep purple & magenta   · Soft blues & steel
Violet & fuchsia        · Lemon & mint
Teal & midnight         · Flame & charcoal
Rose & burgundy         · Lavender & lilac
Pale green & lime       · Apricot & crimson
```

---

## Usage

No build step required — just open `index.html` in a browser.

```bash
git clone https://github.com/AmishRanpariya/flowFieldDesign.git
cd flowFieldDesign
open index.html   # or serve with any static file server
```

**Reload** the page to generate a new design.  
**Click** the canvas to save the current frame as a JPEG image.

---

## Project Structure

```
flowFieldDesign/
├── index.html   # Entry point
├── sketch.js    # Flow field logic and particle system
├── style.css    # Minimal canvas styling
└── p5.js        # p5.js library (bundled)
```

---

## Built With

- [p5.js](https://p5js.org/) — creative coding library for canvas rendering and Perlin noise

---

## License

Open source. Feel free to fork, remix, and make it your own.
