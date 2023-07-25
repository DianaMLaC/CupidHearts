import Game from './game'
import { Canvas } from './types'

class GameView {
  ctx: Canvas
  game: Game

  constructor(ctx: Canvas) {
    this.ctx = ctx as Canvas
    this.game = new Game()
  }

  start() {
    setInterval(() => {
      this.game.draw(this.ctx)
      this.game.step()
    }, 50)
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.game.ship.fireBullet()
      return
    }
    if (event.code === 'ArrowUp') {
      this.game.ship.power(2)
      return
    }

    if (event.code === 'ArrowLeft') {
      this.game.ship.rotate((-1 * Math.PI) / 20)
      return
    }

    if (event.code === 'ArrowRight') {
      this.game.ship.rotate(Math.PI / 20)
      return
    }
  }
}

export default GameView
