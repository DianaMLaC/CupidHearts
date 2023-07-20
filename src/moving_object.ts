import type { Canvas, MovingObjectConfig } from './types'

class MovingObject {
  pos: number[]
  vel: number[]
  radius: number
  color: string

  constructor(config: MovingObjectConfig) {
    this.pos = config.pos
    this.vel = config.vel
    this.radius = config.radius
    this.color = config.color
  }

  draw(ctx: Canvas) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false)
    ctx.fill()
  }

  move() {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
  }
}

export default MovingObject
