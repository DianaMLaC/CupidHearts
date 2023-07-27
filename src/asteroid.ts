import MovingObject from './moving_object'
import Game from './game'
import { MovingObjectConfig } from './types'
import { randomVec } from './util'
import Ship from './ship'
import Bullet from './bullet'

class Asteroid extends MovingObject {
  static COLOR = 'pink'
  static RADIUS = 30
  static STARTING_SPEED = 1

  constructor(config: Partial<MovingObjectConfig> & Pick<MovingObjectConfig, 'pos'>, game: Game) {
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

  collideWith(otherObj: MovingObject): void {
    if (otherObj instanceof Ship) {
      otherObj.relocate()
      return
    }

    if (otherObj instanceof Bullet) {
      this.game.remove(this)
      this.game.remove(otherObj)
      return
    }
  }
}

export default Asteroid

// class Person {
//   constructor(firstName, lastName) {
//     this.firstName = firstName
//     this.lastName = lastName
//   }

//   get fullName() {
//     console.log(this.firstName + this.lastName)
//   }
// }
