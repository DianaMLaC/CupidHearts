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

    // If you need the arrow to point the same direction as velocity, just use `angle`.
    // If you want the arrow reversed 180°, do `angle + Math.PI`.
    // Here I’ll assume arrow = velocity direction:
    ctx.rotate(angle)

    ctx.fillStyle = 'black'
    ctx.beginPath()

    // 1) Shaft: from (−15, 0) to (+5, 0), making it ~20px long
    ctx.moveTo(-15, 0)
    ctx.lineTo(5, 0)

    // 2) Arrowhead (a small triangular tip)
    //    The tip is at x=+5. We’ll draw two lines out from there.
    ctx.lineTo(0, -5)
    ctx.moveTo(5, 0)
    ctx.lineTo(0, 5)

    ctx.closePath()
    ctx.fill()

    ctx.restore()
  }

  get isWrappable(): boolean {
    return false
  }
}

export default Arrow
