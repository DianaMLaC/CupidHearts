import Game from './game'
import Bullet from './bullet'
import MovingObject from './moving_object'
import { Canvas, MovingObjectConfig } from './types'
import { randomVec, rotate, scale } from './util'

function calcPoint(angle: number, x: number, y: number, radius: number): number[] {
  const adj = radius * Math.cos(angle)
  const opp = radius * Math.sin(angle)

  return [x + adj, y - opp]
}

class Ship extends MovingObject {
  static RADIUS = 30
  static COLOR = 'green'
  static INITIAL_SPEED = 5

  facingAngle: number

  constructor(config: Partial<MovingObjectConfig> & Pick<MovingObjectConfig, 'pos'>, game: Game) {
    super(
      {
        pos: config.pos,
        color: config.color ?? Ship.COLOR,
        radius: config.radius ?? Ship.RADIUS,
        vel: config.vel ?? randomVec(Ship.INITIAL_SPEED),
      },
      game
    )

    this.facingAngle = Math.atan(this.vel[0] / (-1 * this.vel[1]))
  }

  draw(ctx: Canvas) {
    let startingAngle = Math.PI / 2 - this.facingAngle
    const firstPoint = calcPoint(startingAngle, this.pos[0], this.pos[1], Ship.RADIUS)

    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.arc(firstPoint[0], firstPoint[1], 5, 0, 2 * Math.PI, false)
    ctx.fill()

    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.moveTo(firstPoint[0], firstPoint[1])

    startingAngle += (Math.PI * 2) / 3
    const secondPoint = calcPoint(startingAngle, this.pos[0], this.pos[1], Ship.RADIUS)
    ctx.lineTo(secondPoint[0], secondPoint[1])

    startingAngle += (Math.PI * 2) / 3
    const thirdPoint = calcPoint(startingAngle, this.pos[0], this.pos[1], Ship.RADIUS)
    ctx.lineTo(thirdPoint[0], thirdPoint[1])

    ctx.fill()
  }

  relocate() {
    this.pos = this.game.randomPosition()
    this.vel = randomVec(Ship.INITIAL_SPEED)
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

  fireBullet() {
    const bullet = new Bullet(
      {
        pos: this.pos,
        vel: this.vel,
      },
      this.game
    )
    this.game.add(bullet)
  }
}

export default Ship
