import Game from './game'

import MovingObject from './moving_object'
import { MovingObjectConfig } from './types'

class Bullet extends MovingObject {
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

  get isWrappable(): boolean {
    return false
  }
}

export default Bullet
