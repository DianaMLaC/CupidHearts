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
  const movingObject = new MovingObject({
    pos: [30, 30],
    vel: [10, 10],
    radius: 5,
    color: '#00FF00',
  })
  movingObject.draw(ctx)
})

window.MovingObject = MovingObject
