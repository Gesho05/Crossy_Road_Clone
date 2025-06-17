# Gebriel's Project X

**My Project X** is a fun and interactive browser-based game where players navigate a character through roads and forests, avoid obstacles, collect coins, and aim for the highest score. Built with **Three.js**, the game offers a smooth and visually engaging experience right in your browser.

---

## Features

- **Dynamic Gameplay** – Navigate through roads, forests, and different obstacle types.
- **Coin Collection** – Pick up coins to increase your score.
- **Near Miss Bonus** – Get rewarded for narrowly escaping vehicles.
- **High Score Tracking** – Keeps track of your best runs.
- **Responsive Design** – Optimized for different screen sizes and devices.

---

## Getting Started

Follow these steps to set up and run the game locally:

### Prerequisites

- [Node.js](https://nodejs.org/) – Required to install and run the project.
- [Git](https://git-scm.com/) – Recommended for cloning the repository (optional).

### Installation

1. Clone the repository:
   ```bash
   git clone https://git.fhict.nl/I553540/project-x.git
   cd project-x
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## How to Play

### Objective

Guide your character safely through the map by avoiding vehicles and obstacles while collecting coins. Progress through rows to increase your score. Watch out — the game ends when you collide with a vehicle!

### Controls

- **Arrow Keys**
  - ↑ Up: Move forward
  - ↓ Down: Move backward
  - ← Left: Move left
  - → Right: Move right
- **On-Screen Controls** (optional for touchscreen users)

### Scoring

- **Coins**: +1 point per coin
- **Near Miss**: Bonus points for close calls with vehicles
- **Collision**: Game over on impact

### Restart

Click the **Retry** button on the game-over screen to start a new game.

---

## Project Structure

```
project-x/
├── public/             # Static assets (e.g. favicon)
├── src/
│   ├── components/     # Player, Map, Coin, Car, Truck components
│   ├── utilities/      # Helper functions (e.g. generateRows, position utils)
│   └── main logic      # Game animation, setup, and event handling
```

---

## Acknowledgments

- Built with [Three.js](https://threejs.org/) for 3D rendering
- Inspired by classic arcade-style games like *Crossy Road*

