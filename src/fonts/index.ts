import { createCanvas, registerFont } from 'canvas'
import { Point } from '../common'

export type RasterData = Point[]

export const FAMILY = 'Roboto Slab'
export const SIZE = 64
export const FONT = `${SIZE}px ${FAMILY}`

const THRESHOLD = 255 / 2

export function render(text: string): RasterData {
  console.log(`Rendering: text=${text}, font=${FONT}`)

  const canvas = createCanvas(SIZE * 2, SIZE * 2)
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = FONT
  ctx.fillText(text, 0, SIZE)

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data

  const out: RasterData = []
  for (let i = 3; i < data.length; i += 4) {
    const p = (i - 3) / 4
    const x = p % canvas.width
    const y = (p - x) / canvas.width
    if (data[i] > THRESHOLD) {
      out.push({ x, y })
    }
  }
  return out
}

export function initFonts() {
  registerFont('./fonts/Roboto_Slab/static/RobotoSlab-Regular.ttf', { family: FONT })
}
