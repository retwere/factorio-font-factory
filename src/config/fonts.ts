import { registerFont } from 'canvas'
import YAML from 'js-yaml'
import * as fs from 'fs/promises'
import * as Path from 'path'

type Fonts = Array<Font>
type Font = {
  family: string
  faces: Faces
}
type Faces = Array<Face>
type Face = {
  weight: string
  file: string
}

async function loadConfigFile(path: string) {
  console.log(`Reading font configuration from ${path}...`)
  const file = await fs.readFile(path, 'utf8')
  console.log(`Parsing ${file.length} characters from (${path})...`)
  return YAML.load(file) as Fonts
}

const FONTS_DIR = './fonts'

function registerFonts(fonts: Fonts) {
  for (const { family, faces } of fonts) {
    for (const { file, weight } of faces) {
      console.log(`Registering font: ${family} ${weight} (${file})`)
      registerFont(Path.join(FONTS_DIR, file), { family, weight })
    }
  }
}

export const CONFIG_FILE_PATH = './config/fonts.yaml'

export async function initFonts(configFilePath: string = CONFIG_FILE_PATH) {
  const fonts = await loadConfigFile(configFilePath)
  registerFonts(fonts)
  console.log(`${fonts.length} font(s) configured.`)
}
