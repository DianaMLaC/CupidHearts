import MovingObject from './moving_object'
import Game from './game'
import { MovingObjectConfig, Canvas } from './types'
import { randomVec } from './util'
import Ship from './ship'
import Bullet from './bullet'

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

    ctx.fillStyle = this.color
    ctx.beginPath()

    // Left half of the heart
    ctx.arc(x - size / 4, y, size / 4, 0, Math.PI, true)

    // Right half of the heart
    ctx.arc(x + size / 4, y, size / 4, 0, Math.PI, true)

    // Bottom point of the heart
    ctx.lineTo(x, y + size / 2)

    ctx.closePath()
    ctx.fill()
  }
}

export default Heart
