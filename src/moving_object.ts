// import Asteroid from './asteroid'
import Game from './game'
import type { Canvas, MovingObjectConfig } from './types'
import { distance } from './util'

class MovingObject {
  pos: number[]
  vel: number[]
  radius: number
  color: string
  game: Game

  constructor(config: MovingObjectConfig, game: Game) {
    this.pos = config.pos
    this.vel = config.vel
    this.radius = config.radius
    this.color = config.color

    this.game = game
  }

  get isWrappable(): boolean {
    return true
  }

  draw(ctx: Canvas) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false)
    ctx.fill()
  }

  move(delta: number): void {
    const velX = (this.vel[0] * delta) / 20
    const velY = (this.vel[1] * delta) / 20

    this.pos = [this.pos[0] + velX, this.pos[1] + velY]
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.game.wrap(this.pos)
      } else {
        this.game.remove(this)
      }
    }
  }

  isCollidedWith(otherObj: MovingObject): boolean {
    const dist = distance(this.pos, otherObj.pos)
    const combinedRadius = this.radius + otherObj.radius
    if (dist < combinedRadius) {
      return true
    }
    return false
  }

  collideWith(otherObj: MovingObject): void {
    // this.game.remove(otherObj)
    // this.game.remove(this)
  }
}

export default MovingObject
