// import Asteroid from './asteroid'
import Heart from './heart'
import Arrow from './arrow'
import MovingObject from './moving_object'
import Ship from './cupid'
import Background from './background'
import { Canvas } from './types'

class Game {
  static DIM_X = 1024 // it should be the width of the canvas html element
  static DIM_Y = 800 // t should be the height of the canvas html element
  static NUM_ASTEROIDS = 10

  asteroids: Heart[]
  ship: Ship
  bullets: Arrow[]
  background: Background

  constructor() {
    this.background = new Background()
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

    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
      // const pos = this.randomPosition()
      const asteroid = new Asteroid({ pos: this.randomPosition() }, this)

      asteroids.push(asteroid)
    }

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

  // draw(ctx: Canvas) {
  //   ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y)
  //   // ctx.beginPath()
  //   // this.drawBackground(ctx)
  //   this.allObjects.forEach((obj: MovingObject) => obj.draw(ctx))
  // }

  draw(ctx: Canvas) {
    this.background.draw(ctx)
    this.allObjects.forEach((obj: MovingObject) => obj.draw(ctx))
  }

  moveObjects(delta: number) {
    this.allObjects.forEach((obj) => obj.move(delta))
  }

  // step(delta: number) {
  //   this.moveObjects(delta)
  //   this.checkCollisions()
  // }

  step(delta: number) {
    this.background.update(delta)
    this.moveObjects(delta)
    this.checkCollisions()
  }

  wrap(pos: number[]) {
    if (pos[0] >= Game.DIM_X) {
      pos[0] = pos[0] % Game.DIM_X
    }
    if (pos[0] < 0) {
      pos[0] = Game.DIM_X + (pos[0] % Game.DIM_X)
    }

    if (pos[1] >= Game.DIM_Y) {
      pos[1] = pos[1] % Game.DIM_Y
    }
    if (pos[1] < 0) {
      pos[1] = Game.DIM_Y + (pos[1] % Game.DIM_Y)
    }

    return pos
  }

  checkCollisions() {
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
  }

  isOutOfBounds(pos: number[]): boolean {
    if (pos[0] >= Game.DIM_X || pos[0] < 0 || pos[1] < 0 || pos[1] >= Game.DIM_Y) {
      return true
    }
    return false
  }
}

export default Game
