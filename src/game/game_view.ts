import Game from './game'
import { Canvas } from './types'

class GameView {
  ctx: Canvas
  game: Game
  lastTime: number

  constructor(ctx: Canvas) {
    this.ctx = ctx as Canvas
    this.game = new Game()
    this.lastTime = new Date().getTime()

    this.start = this.start.bind(this)

    requestAnimationFrame(this.start)
  }

  start() {
    const now = new Date().getTime()
    const delta = now - this.lastTime
    this.lastTime = now

    this.game.step(delta)
    this.game.draw(this.ctx)

    requestAnimationFrame(this.start)
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
