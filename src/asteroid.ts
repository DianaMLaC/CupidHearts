import MovingObject from './moving_object'
import { MovingObjectConfig } from './types'
import { randomVec } from './util'

class Asteroid extends MovingObject {
  static COLOR = 'pink'
  static RADIUS = 10
  static STARTING_SPEED = 10

  constructor(
    config: Partial<MovingObjectConfig> & Pick<MovingObjectConfig, 'pos'>
  ) {
    super({
      pos: config.pos,
      color: config.color ?? Asteroid.COLOR,
      radius: config.radius ?? Asteroid.RADIUS,
      vel: config.vel ?? randomVec(Asteroid.STARTING_SPEED),
    })
  }
}

export default Asteroid
