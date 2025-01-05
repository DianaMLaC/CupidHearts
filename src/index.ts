// import Asteroid from './asteroid'
import GameView from './game/game_view'
import MovingObject from './game/moving_object'
import { Canvas } from './game/types'
import './assets/styles.css'

declare global {
  interface Window {
    MovingObject: typeof MovingObject
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('cupids-game') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as Canvas
  const g = new GameView(ctx)
  g.start()

  document.addEventListener('keydown', (event) => {
    g.handleKeyPress(event)
  })

  const playAgainButton = document.getElementById('play-again') as HTMLElement
  playAgainButton.addEventListener('click', () => {
    const messageEl = document.getElementById('game-end-message') as HTMLElement
    messageEl.innerText = ''

    window.location.reload()
  })
})

window.MovingObject = MovingObject
