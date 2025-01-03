import Game from './game'
import Arrow from './arrow'
import MovingObject from './moving_object'
import { Canvas, MovingObjectConfig } from './types'
import { polarToVector, randomVec, scale } from './util'
import cupidImage from '../assets/cupid.png'

function calcPoint(angle: number, x: number, y: number, radius: number): number[] {
  const adj = radius * Math.cos(angle)
  const opp = radius * Math.sin(angle)

  return [x + adj, y - opp]
}

class Cupid extends MovingObject {
  static RADIUS = 30
  static INITIAL_SPEED = 2

  facingAngle: number
  image: HTMLImageElement

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
    this.facingAngle = Math.atan(this.vel[0] / (-1 * this.vel[1]))
  }

  draw(ctx: Canvas) {
    const [x, y] = this.pos
    const size = Cupid.RADIUS * 2

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(this.facingAngle)
    ctx.drawImage(this.image, -size / 2, -size / 2, size, size)
    ctx.restore()
  }

  relocate() {
    this.pos = this.game.randomPosition()
    this.vel = randomVec(Cupid.INITIAL_SPEED)
    this.facingAngle = Math.atan(this.vel[0] / (-1 * this.vel[1]))
  }

  power(impulse: number) {
    const size = impulse
    const x = size * Math.sin(this.facingAngle)
    const y = size * Math.cos(this.facingAngle)

    this.vel = [this.vel[0] + x, this.vel[1] - y]
    console.log('powered up, new velocity is', this.vel)
  }

  rotate(angle: number) {
    this.facingAngle += angle
  }

  fireArrow() {
    const startingAngle = Math.PI / 2 - this.facingAngle
    const initialVector = polarToVector(startingAngle)
    const arrowPos = calcPoint(startingAngle, this.pos[0], this.pos[1], Cupid.RADIUS)

    const arrow = new Arrow(
      {
        pos: arrowPos,
        vel: scale(initialVector, 50),
      },
      this.game
    )
    this.game.add(arrow)
  }
}

export default Cupid
