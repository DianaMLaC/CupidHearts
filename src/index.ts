// import Asteroid from './asteroid'
import GameView from './game_view'
import MovingObject from './moving_object'
import { Canvas } from './types'

declare global {
  interface Window {
    MovingObject: typeof MovingObject
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('asteroids-game') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as Canvas
  const g = new GameView(ctx)
  g.start()

  document.addEventListener('keydown', (event) => {
    g.handleKeyPress(event)
  })
  // const movingObject = new MovingObject({
  //   pos: [30, 30],
  //   vel: [10, 10],
  //   radius: 5,
  //   color: '#00FF00',
  // })
  // movingObject.draw(ctx)

  // const asteroid = new Asteroid({ pos: [20, 30] })
  // asteroid.draw(ctx)

  // const a2 = new Asteroid({ pos: [100, 200] })
  // a2.draw(ctx)
})

window.MovingObject = MovingObject
