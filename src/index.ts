import fs from 'fs/promises'
import { argv } from 'process'
import { Blueprint, BlueprintBook, ItemType, VERSION as version } from './blueprints'
import { encode } from './blueprints/codec'
import { SignalID, SignalType, SIGNAL_CHARS } from './blueprints/signals'
import { TileType } from './blueprints/tiles'
import { FONT, initFonts, render } from './fonts'

const FONT_CHARS = SIGNAL_CHARS + ',.?!:;\'"()[]{}/*+-=><&$%^|#@\\_~`'
const TILE_TYPES = [
  TileType.REFINED_HAZARD_CONCRETE_RIGHT,
  TileType.HAZARD_CONCRETE_RIGHT,
  TileType.STONE
]

function formatTileType(tile: TileType): string {
  return tile
    .split('-')
    .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ')
}

function signal(char: string, tile: TileType): SignalID {
  return char.length == 1 && SIGNAL_CHARS.includes(char)
    ? { name: `signal-${char}`, type: SignalType.VIRTUAL }
    : { name: tile, type: SignalType.ITEM }
}

export function createTextBlueprint(text: string, tile: TileType): Blueprint {
  return {
    blueprint: {
      item: ItemType.BLUEPRINT,
      label: text,
      icons: [{ signal: signal(text, tile), index: 1 }],
      tiles: render(text).map(position => ({ position, name: tile })),
      version
    }
  }
}

export function createFontBook(tile: TileType): BlueprintBook {
  return {
    blueprint_book: {
      item: ItemType.BLUEPRINT_BOOK,
      label: `${FONT} (${formatTileType(tile)})`,
      icons: [],
      blueprints: [...FONT_CHARS].map((char, index) => {
        const blueprint = createTextBlueprint(char, tile)
        return { ...blueprint, index }
      }),
      version
    }
  }
}

export default async function main(tiles: TileType[]) {
  initFonts()
  try {
    await fs.mkdir('./output', { recursive: true })
  } catch (e) {
    console.error(e)
    return
  }
  return Promise.all(
    tiles.map(async tile => {
      const book = createFontBook(tile)
      try {
        const filename = `./output/${FONT} (${formatTileType(tile)}).txt`
        await fs.writeFile(filename, encode(book))
        console.log(`Wrote file: ${filename}`)
      } catch (e) {
        console.error(e)
      }
    })
  ).then(() => console.log('All files written!'))
}

if (require.main === module) {
  const tiles: TileType[] = argv.length > 2 ? (argv.slice(2) as TileType[]) : TILE_TYPES
  console.log(`Using tiles: ${tiles}`)
  main(tiles)
}
