export interface Dimensions {
  width: number
  height: number
}

export interface AbstractGame {
  wrap: (pos: number[]) => void
}

export interface MovingObjectConfig {
  pos: number[]
  vel: number[]
  radius: number
  color: string
}

export interface Dimensions {
  width: number
  height: number
}

export type Canvas = CanvasRenderingContext2D
