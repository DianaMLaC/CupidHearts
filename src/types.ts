export interface Dimensions {
  width: number
  height: number
}

export interface MovingObjectConfig {
  pos: number[]
  vel: number[]
  radius: number
  color: string
}

export type Canvas = CanvasRenderingContext2D
