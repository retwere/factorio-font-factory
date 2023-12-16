import { createCanvas, registerFont } from 'canvas'
import { Point } from '../common'

export type FontFace = {
  family: string
  weight?: string
}

export type Font = FontFace & {
  size: number
}

export type RasterData = Point[]

export const FONT_FAMILIES = ['Roboto Slab']
export const FONT_WEIGHTS = [
  // 'Black',
  // 'ExtraLight',
  'Regular',
  // 'Bold',
  // 'Light',
  // 'SemiBold',
  // 'ExtraBold',
  // 'Medium',
  // 'Thin'
]

const THRESHOLD = 255 / 2

export function render(text: string, font: Font): RasterData {
  // note that the "weight" is actually part of the font family name (see initFonts)
  const fontStr = `${font.size}px "${font.family} ${font.weight}"`

  console.log(`Rendering: text="${text}, font=${fontStr}`)

  const canvas = createCanvas(font.size * 2, font.size * 2)
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = fontStr
  ctx.fillText(text, 0, font.size)

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
  // registerFont('./fonts/Roboto_Slab/static/RobotoSlab-Black.ttf', {
  //   family: 'Roboto Slab Black'
  // })
  // registerFont('./fonts/Roboto_Slab/static/RobotoSlab-ExtraLight.ttf', {
  //   family: 'Roboto Slab ExtraLight'
  // })
  registerFont('./fonts/Roboto_Slab/static/RobotoSlab-Regular.ttf', {
    family: 'Roboto Slab Regular'
  })
  // registerFont('./fonts/Roboto_Slab/static/RobotoSlab-Bold.ttf', {
  //   family: 'Roboto Slab Bold'
  // })
  // registerFont('./fonts/Roboto_Slab/static/RobotoSlab-Light.ttf', {
  //   family: 'Roboto Slab Light'
  // })
  // registerFont('./fonts/Roboto_Slab/static/RobotoSlab-SemiBold.ttf', {
  //   family: 'Roboto Slab SemiBold'
  // })
  // registerFont('./fonts/Roboto_Slab/static/RobotoSlab-ExtraBold.ttf', {
  //   family: 'Roboto Slab ExtraBold'
  // })
  // registerFont('./fonts/Roboto_Slab/static/RobotoSlab-Medium.ttf', {
  //   family: 'Roboto Slab Medium'
  // })
  // registerFont('./fonts/Roboto_Slab/static/RobotoSlab-Thin.ttf', {
  //   family: 'Roboto Slab Thin'
  // })
}
