import Game from './game'
import MovingObject from './moving_object'
import { MovingObjectConfig, Canvas } from './types'

class Arrow extends MovingObject {
  constructor(
    config: Partial<MovingObjectConfig> & Pick<MovingObjectConfig, 'vel' | 'pos'>,
    game: Game
  ) {
    super(
      {
        pos: config.pos,
        vel: config.vel,
        color: 'black',
        radius: 2,
      },
      game
    )
  }

  draw(ctx: Canvas) {
    const [x, y] = this.pos
    const angle = Math.atan2(this.vel[1], this.vel[0])

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)

    ctx.fillStyle = '#1E1E1E'
    ctx.beginPath()
    // Rectangle body, from x = -15 to x = +5, height ~6px
    ctx.moveTo(-14, -2)
    ctx.lineTo(5, -2)
    ctx.lineTo(5, 2)
    ctx.lineTo(-14, 2)
    ctx.closePath()
    ctx.fill()

    // Arrowhead (triangle)
    ctx.beginPath()
    ctx.moveTo(5, -7) // top corner
    ctx.lineTo(14, 0) // tip
    ctx.lineTo(5, 7) // bottom corner
    ctx.closePath()
    ctx.fill()

    ctx.restore()
  }

  get isWrappable(): boolean {
    return false
  }
}

export default Arrow
