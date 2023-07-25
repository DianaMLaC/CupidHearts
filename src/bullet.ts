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

  collideWith(otherObj: MovingObject): void {
    if (otherObj instanceof Asteroid) {
      this.game.remove(otherObj)
      return
    }
  }
}

export default Bullet
