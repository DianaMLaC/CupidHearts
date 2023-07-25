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
}

export default GameView
