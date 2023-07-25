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

  draw(ctx: Canvas) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false)
    ctx.fill()
  }

  move(): void {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
    this.game.wrap(this.pos)
  }

  isCollidedWith(otherObj: MovingObject): boolean {
    const dist = distance(this.pos, otherObj.pos)
    const combinedRadius = this.radius + otherObj.radius
    if (dist < combinedRadius) {
      return true
    }
    return false
  }
}

export default MovingObject
