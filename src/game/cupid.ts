import Game from './game'
import Arrow from './arrow'
// import Heart from './heart'
import MovingObject from './moving_object'
import { Canvas, MovingObjectConfig } from './types'
import { randomVec } from './util'
import cupidImage from '../assets/cupid.png'

class Cupid extends MovingObject {
  static RADIUS = 30
  static INITIAL_SPEED = 2

  facingAngle: number
  image: HTMLImageElement
  private readonly SPRITE_BASE_ANGLE = 5.72
  private bowOffset = [40, 5]

  constructor(config: Partial<MovingObjectConfig> & Pick<MovingObjectConfig, 'pos'>, game: Game) {
    super(
      {
        pos: config.pos,
        color: config.color ?? 'green',
        radius: config.radius ?? Cupid.RADIUS,
        vel: config.vel ?? randomVec(Cupid.INITIAL_SPEED),
      },
      game
    )
    this.image = new Image()
    this.image.src = cupidImage
    this.facingAngle = Math.atan2(this.vel[1], this.vel[0])
  }

  draw(ctx: Canvas) {
    const [x, y] = this.pos
    const size = Cupid.RADIUS * 3

    ctx.save()
    ctx.translate(x, y)

    ctx.rotate(this.facingAngle + this.SPRITE_BASE_ANGLE)

    ctx.drawImage(this.image, -size / 2, -size / 2, size, size)
    ctx.restore()
  }

  relocate() {
    this.pos = this.game.randomPosition()
    this.vel = randomVec(Cupid.INITIAL_SPEED)
    this.facingAngle = Math.atan2(this.vel[1], this.vel[0])
  }

  power(impulse: number) {
    const x = impulse * Math.cos(this.facingAngle)
    const y = impulse * Math.sin(this.facingAngle)

    this.vel = [this.vel[0] + x, this.vel[1] + y]
  }

  rotate(angle: number) {
    this.facingAngle += angle
  }

  fireArrow() {
    const ARROW_SPEED = 5

    const arrowVel = [
      ARROW_SPEED * Math.cos(this.facingAngle),
      ARROW_SPEED * Math.sin(this.facingAngle),
    ]

    const [localX, localY] = this.bowOffset
    const cosA = Math.cos(this.facingAngle)
    const sinA = Math.sin(this.facingAngle)

    const rotatedOffset = [localX * cosA - localY * sinA, localX * sinA + localY * cosA]
    const arrowPos = [this.pos[0] + rotatedOffset[0], this.pos[1] + rotatedOffset[1]]

    const arrow = new Arrow({ pos: arrowPos, vel: arrowVel }, this.game)
    this.game.add(arrow)
  }
}

export default Cupid
