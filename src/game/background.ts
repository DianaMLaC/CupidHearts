import { Canvas } from './types'

class Background {
  stars: { pos: number[]; radius: number }[]

  constructor() {
    this.stars = Array.from({ length: 100 }, () => ({
      pos: [Math.random() * 1024, Math.random() * 800],
      radius: Math.random() * 2,
    }))
  }

  draw(ctx: Canvas) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 800)
    gradient.addColorStop(0, '#87CEFA') // Light sky blue
    gradient.addColorStop(1, '#FFC0CB') // Soft pink

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1024, 800)

    ctx.fillStyle = 'white'
    this.stars.forEach((star) => {
      ctx.beginPath()
      ctx.arc(star.pos[0], star.pos[1], star.radius, 0, 2 * Math.PI, false)
      ctx.fill()
    })
  }

  update(delta: number) {
    this.stars.forEach((star) => {
      star.pos[1] += delta * 0.03
      if (star.pos[1] > 800) {
        star.pos[1] = 0
        star.pos[0] = Math.random() * 1024
      }
    })
  }
}

export default Background
