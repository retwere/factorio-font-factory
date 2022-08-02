import { Position } from './utils'

export type Tile = {
  position: Position
  name: TileName
}

export const TILE_NAMES = [
  'stone',
  'concrete',
  'hazard-concrete-left',
  'hazard-concrete-right',
  'refined-concrete',
  'refined-hazard-concrete-left',
  'refined-hazard-concrete-right'
] as const
export type TileName = typeof TILE_NAMES[number]
