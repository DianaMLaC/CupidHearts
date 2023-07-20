import type { Canvas } from './types'
interface MovingObjectConfig {
  pos: number[]
  vel: number[]
  radius: number
  color: string
}

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
}

export default MovingObject
