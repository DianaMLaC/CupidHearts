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
        color: 'RED',
        radius: 2,
      },
      game
    )
  }

  draw(ctx: Canvas) {
    const [x, y] = this.pos

    ctx.fillStyle = this.color
    ctx.beginPath()

    // Draw arrowhead
    ctx.moveTo(x, y)
    ctx.lineTo(x - 10, y - 5)
    ctx.lineTo(x - 10, y + 5)

    // Draw arrow shaft
    ctx.moveTo(x - 10, y)
    ctx.lineTo(x - 20, y)

    ctx.closePath()
    ctx.fill()
  }

  get isWrappable(): boolean {
    return false
  }
}

export default Arrow
