export function randomVec(length: number) {
  const deg = 2 * Math.PI * Math.random()
  return scale([Math.sin(deg), Math.cos(deg)], length)
}

// Scale the length of a vector by the given amount.
export function scale(vec: number[], m: number) {
  return [vec[0] * m, vec[1] * m]
}

export function distance(p1: number[], p2: number[]): number {
  const y = p1[1] - p2[1] // order doesn't matter because we'll square it later
  const x = p1[0] - p2[0] // the square of a negative number is the same as a square of the positive
  const y_2 = y * y // same as y ** 2 (y squared)
  const x_2 = x ** 2 // same as above but with x

  const dist = Math.sqrt(x_2 + y_2)
  return dist
}

export function rotate(angle: number, vec: number[]) {
  const length_squared = vec[0] ** 2 + vec[1] ** 2
  const length = Math.sqrt(length_squared)
  const initialAngle = Math.sin(vec[1] / vec[0])
  const finalAngle = initialAngle + angle

  return [Math.cos(finalAngle) + length, Math.sin(finalAngle) + length]
}

export function polarToVector(angle: number): number[] {
  return [Math.cos(angle), -1 * Math.sin(angle)]
}
