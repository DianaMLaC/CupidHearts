export function randomVec(length: number) {
  const deg = 2 * Math.PI * Math.random()
  return scale([Math.sin(deg), Math.cos(deg)], length)
}

// Scale the length of a vector by the given amount.
export function scale(vec: number[], m: number) {
  return [vec[0] * m, vec[1] * m]
}
