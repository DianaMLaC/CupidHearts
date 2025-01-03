// import Asteroid from './asteroid'
import Heart from './heart'
import Arrow from './arrow'
import MovingObject from './moving_object'
import Cupid from './cupid'
import Background from './background'
import { Canvas } from './types'

class Game {
  static DIM_X = 1024 // it should be the width of the canvas html element
  static DIM_Y = 800 // t should be the height of the canvas html element
  static NUM_HEARTS = 10

  hearts: Heart[]
  cupid: Cupid
  arrows: Arrow[]
  background: Background

  constructor() {
    this.background = new Background()
    this.hearts = this.addHearts()
    this.arrows = []
    this.cupid = new Cupid(
      {
        pos: this.randomPosition(),
      },
      this
    )
  }

  addHearts(): Heart[] {
    const hearts = []

    for (let i = 0; i < Game.NUM_HEARTS; i++) {
      // const pos = this.randomPosition()
      const heart = new Heart({ pos: this.randomPosition() }, this)

      hearts.push(heart)
    }

    return hearts
  }

  add(obj: MovingObject): void {
    if (obj instanceof Heart) {
      this.hearts.push(obj)
      return
    }

    if (obj instanceof Arrow) {
      this.arrows.push(obj)
      return
    }
  }

  randomPosition(): number[] {
    const x = Math.floor(Math.random() * Game.DIM_X)
    const y = Math.floor(Math.random() * Game.DIM_Y)

    return [x, y]
  }

  get allObjects(): MovingObject[] {
    return (this.hearts as MovingObject[])
      .concat([this.cupid])
      .concat(this.arrows as MovingObject[])
  }

  draw(ctx: Canvas) {
    this.background.draw(ctx)
    this.allObjects.forEach((obj: MovingObject) => obj.draw(ctx))
  }

  moveObjects(delta: number) {
    this.allObjects.forEach((obj) => obj.move(delta))
  }

  step(delta: number) {
    this.background.update(delta)
    this.moveObjects(delta)
    this.checkCollisions()
  }

  wrap(pos: number[]): number[] {
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
    const allHearts = this.hearts

    for (const heart of allHearts) {
      for (const otherObj of this.allObjects.filter((obj) => obj !== heart)) {
        if (heart.isCollidedWith(otherObj)) {
          heart.collideWith(otherObj)
        }
      }
    }
  }

  remove(obj: MovingObject) {
    if (obj instanceof Heart) {
      this.hearts = this.hearts.filter((a) => a !== obj)
      return
    }

    if (obj instanceof Arrow) {
      this.arrows = this.arrows.filter((a) => a !== obj)
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
