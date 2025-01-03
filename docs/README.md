# Cupid's Hearts
![alt-text](/public/cupid-game-image.png "Cupid's Hearts")

A simple TypeScript/HTML Canvas game in which you control a flying Cupid who can shoot arrows at hearts floating around the screen. 
Inspired by classic Asteroids mechanics but with a lovely twist!

## How to Play
- **Move Cupid** around the canvas using your chosen key bindings or by modifying `power()` and `rotate()`.
- **Shoot arrows** by calling `fireArrow()`, which spawns a new arrow object flying in the direction Cupid is facing.
- Each arrow is drawn using Canvas calls for a simple arrow shape.

## Installation & Usage
1. Clone or download this repository.
2. Open `public/index.html` in your favorite web browser (or run a local server and serve it).
3. Cupid should appear on a sky-blue canvas. Hearts are scattered randomly.  


## Key Files
- **`public/index.html`** – Entry point for the game.
- **`src/game.ts`** – Manages the main game logic, including spawning Cupid and hearts.
- **`src/cupid.ts`** – Defines the Cupid class and its behaviors (movement, arrow firing, sprite rotation).
- **`src/arrow.ts`** – Implements the Arrow class, which handles drawing and movement for each arrow.
- **`src/util.ts`** – Contains helper functions like `randomVec`.

## Contributing
Feel free to open an issue or submit a pull request if you have improvements, bug fixes, or new features in mind.
