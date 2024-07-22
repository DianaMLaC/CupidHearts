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
})

window.MovingObject = MovingObject
