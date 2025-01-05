import Heart from './heart'
import Arrow from './arrow'
import MovingObject from './moving_object'
import Cupid from './cupid'
import Background from './background'
import { Canvas } from './types'

class Game {
  static DIM_X = 1024
  static DIM_Y = 800
  static NUM_HEARTS = 10
  static TIME = 60

  hearts: Heart[]
  cupid: Cupid
  arrows: Arrow[]
  background: Background
  score: number
  timeLeft: number
  isGameOver: boolean

  constructor() {
    this.background = new Background()
    this.hearts = this.addHearts()
    this.arrows = []
    this.cupid = new Cupid({ pos: this.randomPosition() }, this)
    this.score = Game.NUM_HEARTS
    this.timeLeft = Game.TIME
    this.isGameOver = false

    this.updateStats('score')
    this.updateStats('timer')
    this.startTimer()
  }

  addHearts(): Heart[] {
    const hearts = []

    for (let i = 0; i < Game.NUM_HEARTS; i++) {
      const heart = new Heart({ pos: this.randomPosition() }, this)
      hearts.push(heart)
    }

    return hearts
  }

  add(obj: MovingObject): void {
    if (obj instanceof Heart) {
      this.hearts.push(obj)
      return
    }

    if (obj instanceof Arrow) {
      this.arrows.push(obj)
      return
    }
  }

  randomPosition(): number[] {
    const x = Math.floor(Math.random() * Game.DIM_X)
    const y = Math.floor(Math.random() * Game.DIM_Y)

    return [x, y]
  }

  get allObjects(): MovingObject[] {
    return (this.hearts as MovingObject[])
      .concat([this.cupid])
      .concat(this.arrows as MovingObject[])
  }

  draw(ctx: Canvas) {
    this.background.draw(ctx)
    this.allObjects.forEach((obj: MovingObject) => obj.draw(ctx))
  }

  moveObjects(delta: number) {
    this.allObjects.forEach((obj) => obj.move(delta))
  }

  step(delta: number) {
    if (this.isGameOver) return
    this.background.update(delta)
    this.moveObjects(delta)
    this.checkCollisions()
  }

  wrap(pos: number[]): number[] {
    if (pos[0] >= Game.DIM_X) {
      pos[0] = pos[0] % Game.DIM_X
    }
    if (pos[0] < 0) {
      pos[0] = Game.DIM_X + (pos[0] % Game.DIM_X)
    }

    if (pos[1] >= Game.DIM_Y) {
      pos[1] = pos[1] % Game.DIM_Y
    }
    if (pos[1] < 0) {
      pos[1] = Game.DIM_Y + (pos[1] % Game.DIM_Y)
    }

    return pos
  }

  startTimer() {
    const timerInterval = setInterval(() => {
      if (this.isGameOver) {
        clearInterval(timerInterval)
        return
      }

      this.timeLeft -= 1
      this.updateStats('timer')

      if (this.timeLeft <= 0) {
        clearInterval(timerInterval)
        this.isGameOver = true
        this.showMessage("Time's up! Love takes time... Try again?")
      }
    }, 1000)
  }

  checkCollisions() {
    for (const heart of this.hearts) {
      if (this.cupid.isCollidedWith(heart)) {
        this.cupid.relocate()
        break
      }
    }

    for (const arrow of this.arrows) {
      for (const heart of this.hearts) {
        if (arrow.isCollidedWith(heart)) {
          this.handleArrowCollision(heart, arrow)
        }
      }
    }
  }

  handleArrowCollision(heart: Heart, arrow: Arrow) {
    this.remove(heart)
    this.remove(arrow)
    this.score -= 1
    console.log('newScore:', this.score)
    this.updateStats('score')

    if (this.score <= 0) {
      this.isGameOver = true
      this.showMessage('Well done! Love is in the air!')
    }
  }

  updateStats(id: string) {
    const statsEl = document.getElementById(id) as HTMLElement
    if (id === 'score') {
      statsEl.innerText = `${this.score}`
    } else {
      statsEl.innerText = `${this.timeLeft}s`
    }
  }

  showMessage(message: string) {
    const messageEl = document.getElementById('game-end-message') as HTMLElement
    messageEl.innerText = message
  }

  remove(obj: MovingObject) {
    if (obj instanceof Heart) {
      this.hearts = this.hearts.filter((heart) => heart !== obj)
    } else if (obj instanceof Arrow) {
      this.arrows = this.arrows.filter((arrow) => arrow !== obj)
    }
  }

  isOutOfBounds(pos: number[]): boolean {
    if (pos[0] >= Game.DIM_X || pos[0] < 0 || pos[1] < 0 || pos[1] >= Game.DIM_Y) {
      return true
    }
    return false
  }
}

export default Game
