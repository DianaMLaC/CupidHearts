import Game from './game'
import MovingObject from './moving_object'
import { MovingObjectConfig } from './types'
import { randomVec } from './util'

class Ship extends MovingObject {
  static RADIUS = 30
  static COLOR = 'green'
  constructor(config: Partial<MovingObjectConfig> & Pick<MovingObjectConfig, 'pos'>, game: Game) {
    super(
      {
        pos: config.pos,
        color: config.color ?? Ship.COLOR,
        radius: config.radius ?? Ship.RADIUS,
        vel: config.vel ?? randomVec(0),
      },
      game
    )
  }
}

export default Ship
