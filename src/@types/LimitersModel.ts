interface isLimiter {
  windowMs: number,
  max: number
}

interface isSpeedLimiter {
  windowMs: number,
  delayAfter: number,
  delayMs: number
}

export {
  isLimiter,
  isSpeedLimiter
}