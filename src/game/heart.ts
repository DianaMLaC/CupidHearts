import MovingObject from './moving_object'
import Game from './game'
import { MovingObjectConfig, Canvas } from './types'
import { randomVec } from './util'
import Ship from './cupid'
import Bullet from './arrow'

class Heart extends MovingObject {
  static COLOR = '#ff69b4'
  static RADIUS = 30
  static STARTING_SPEED = 1

  constructor(config: Partial<MovingObjectConfig> & Pick<MovingObjectConfig, 'pos'>, game: Game) {
    super(
      {
        pos: config.pos,
        color: config.color ?? Heart.COLOR,
        radius: config.radius ?? Heart.RADIUS,
        vel: config.vel ?? randomVec(Heart.STARTING_SPEED),
      },
      game
    )
  }

  collideWith(otherObj: MovingObject): void {
    if (otherObj instanceof Ship) {
      otherObj.relocate()
      // add 3 lives logic
      return
    }

    if (otherObj instanceof Bullet) {
      this.game.remove(this)
      this.game.remove(otherObj)
      // add score logic
      return
    }
  }

  draw(ctx: Canvas) {
    const [x, y] = this.pos
    const size = this.radius

    ctx.save()
    ctx.translate(x, y)
    ctx.scale(size / 50, size / 50)

    ctx.fillStyle = this.color
    ctx.beginPath()

    ctx.moveTo(0, -30)

    ctx.bezierCurveTo(-25, -50, -50, -20, 0, 30)

    ctx.bezierCurveTo(50, -20, 25, -50, 0, -30)

    ctx.closePath()
    ctx.fill()

    ctx.restore()
  }
}

export default Heart
