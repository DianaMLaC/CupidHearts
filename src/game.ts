import Asteroid from './asteroid'
import Bullet from './bullet'
import MovingObject from './moving_object'
import Ship from './ship'
import { Canvas } from './types'

class Game {
  static DIM_X = 1024 // it should be the width of the canvas html element
  static DIM_Y = 800 // t should be the height of the canvas html element
  static NUM_ASTEROIDS = 10

  asteroids: Asteroid[]
  ship: Ship
  bullets: Bullet[]

  constructor() {
    this.asteroids = this.addAsteroids()
    this.bullets = []
    this.ship = new Ship(
      {
        pos: this.randomPosition(),
      },
      this
    )
  }

  addAsteroids() {
    const asteroids = []

    // for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    //   // const pos = this.randomPosition()
    //   const asteroid = new Asteroid({ pos: this.randomPosition() }, this)

    //   asteroids.push(asteroid)
    // }

    return asteroids
  }

  add(obj: MovingObject): void {
    if (obj instanceof Asteroid) {
      this.asteroids.push(obj)
      return
    }

    if (obj instanceof Bullet) {
      this.bullets.push(obj)
      return
    }
  }

  randomPosition() {
    const x = Math.floor(Math.random() * Game.DIM_X)
    const y = Math.floor(Math.random() * Game.DIM_Y)

    return [x, y]
  }

  get allObjects(): MovingObject[] {
    return (this.asteroids as MovingObject[])
      .concat([this.ship])
      .concat(this.bullets as MovingObject[])
    //this needs to contain the bullets too
  }

  // drawBackground(ctx: Canvas) {
  //   ctx.fillStyle = 'black'
  //   ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y)
  // }

  draw(ctx: Canvas) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y)
    // ctx.beginPath()
    // this.drawBackground(ctx)
    this.allObjects.forEach((obj: MovingObject) => obj.draw(ctx))
  }

  moveObjects() {
    this.allObjects.forEach((obj) => obj.move())
  }

  step() {
    this.moveObjects()
    this.checkCollisions()
  }

  wrap(pos: number[]) {
    if (pos[0] >= Game.DIM_X) {
      pos[0] = pos[0] % Game.DIM_X
    } else if (pos[0] < 0) {
      pos[0] = Game.DIM_X + (pos[0] % Game.DIM_X)
    }

    if (pos[1] >= Game.DIM_Y) {
      pos[1] = pos[1] % Game.DIM_Y
    } else if (pos[1] < 0) {
      pos[1] = Game.DIM_Y + (pos[1] % Game.DIM_Y)
    }

    return pos
  }

  checkCollisions() {
    // const initialObjects = this.allObjects

    // for (let i = 0; i < initialObjects.length - 1; i++) {
    //   for (let j = i + 1; j < initialObjects.length; j++) {
    //     const a = initialObjects[i]
    //     const b = initialObjects[j]
    //     if (a.isCollidedWith(b)) {
    //       alert('COLLISION')
    //       a.collideWith(b)
    //     }
    //   }
    // }

    const allAsteroids = this.asteroids

    for (const asteroid of allAsteroids) {
      for (const otherObj of this.allObjects.filter((obj) => obj !== asteroid)) {
        if (asteroid.isCollidedWith(otherObj)) {
          asteroid.collideWith(otherObj)
        }
      }
    }
  }

  remove(obj: MovingObject) {
    if (obj instanceof Asteroid) {
      this.asteroids = this.asteroids.filter((a) => a !== obj)
      return
    }

    if (obj instanceof Bullet) {
      this.bullets = this.bullets.filter((a) => a !== obj)
      return
    }
    // const asteroidIndex = this.asteroids.indexOf(asteroid)
    // if (asteroidIndex !== -1) {
    //   this.asteroids.splice(asteroidIndex, 1)
    // }
  }

  bindKeyHandlers() {
    // global method key(key, callback)
  }
}

export default Game
