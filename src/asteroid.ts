import MovingObject from './moving_object'
import Game from './game'
import { MovingObjectConfig } from './types'
import { randomVec } from './util'

class Asteroid extends MovingObject {
  static COLOR = 'pink'
  static RADIUS = 30
  static STARTING_SPEED = 10

  constructor(
    config: Partial<MovingObjectConfig> & Pick<MovingObjectConfig, 'pos'>,
    game: Game
  ) {
    super(
      {
        pos: config.pos,
        color: config.color ?? Asteroid.COLOR,
        radius: config.radius ?? Asteroid.RADIUS,
        vel: config.vel ?? randomVec(Asteroid.STARTING_SPEED),
      },
      game
    )
  }
}

export default Asteroid
