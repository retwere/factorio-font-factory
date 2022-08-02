import fs from 'fs/promises'
import { argv } from 'process'
import { version } from './blueprints/model/item'
import { Blueprint, BlueprintBook } from './blueprints/schema/items'
import { encode } from './blueprints/codec'
import { SignalID, SIGNAL_CHARS } from './blueprints/schema/signals'
import { TileType } from './blueprints/schema/tiles'
import { Font, FontFace, FONT_FAMILIES, FONT_WEIGHTS, render } from './fonts'
import { initFonts } from './config/fonts'

const FONT_CHARS = SIGNAL_CHARS + ',.?!:;\'"()[]{}/*+-=><&$%^|#@\\_~`'

function signal(char: string, tile: TileType): SignalID {
  return char.length == 1 && SIGNAL_CHARS.includes(char)
    ? { name: `signal-${char}`, type: 'virtual' }
    : { name: tile, type: 'item' }
}

export function createTextBlueprint(text: string, font: Font, tile: TileType): Blueprint {
  return {
    blueprint: {
      item: 'blueprint',
      label: text,
      icons: [{ signal: signal(text, tile), index: 1 }],
      tiles: render(text, font).map(position => {
        return { position, name: tile }
      }),
      version
    }
  }
}

export function createFontBook(font: Font, tile: TileType): BlueprintBook {
  return {
    'blueprint_book': {
      item: 'blueprint-book',
      label: `${font.size}px ${font.family} ${font.weight}`,
      icons: [],
      blueprints: [...FONT_CHARS].map((char, index) => {
        const blueprint = createTextBlueprint(char, font, tile)
        return { ...blueprint, index }
      }),
      version
    }
  }
}

export function createFontFaceBook(font: FontFace, tile: TileType): BlueprintBook {
  return {
    'blueprint_book': {
      item: 'blueprint-book',
      label: `${font.family} ${font.weight}`,
      icons: [],
      blueprints: SIZES.map((size, index) => {
        const blueprint = createFontBook({ ...font, size }, tile)
        return { ...blueprint, index }
      }),
      version
    }
  }
}

export function createFontFamilyBook(family: string, tile: TileType): BlueprintBook {
  return {
    'blueprint_book': {
      item: 'blueprint-book',
      label: `${family} (${tile
        .split('-')
        .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
        .join(' ')})`,
      icons: [],
      blueprints: FONT_WEIGHTS.map((weight, index) => {
        const blueprint = createFontFaceBook({ family, weight }, tile)
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
    tiles
      .flatMap(tile => FONT_FAMILIES.map(family => createFontFamilyBook(family, tile)))
      .map(async (book, index) => {
        try {
          const filename = `./output/${index}.txt`
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
