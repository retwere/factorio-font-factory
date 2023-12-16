import { Position } from '.'

export type Tile = {
  position: Position
  name: TileType
}

export enum TileType {
  STONE = 'stone',
  CONCRETE = 'concrete',
  HAZARD_CONCRETE_LEFT = 'hazard-concrete-left',
  HAZARD_CONCRETE_RIGHT = 'hazard-concrete-right',
  REFINED_CONCRETE = 'refined-concrete',
  REFINED_HAZARD_CONCRETE_LEFT = 'refined-hazard-concrete-left',
  REFINED_HAZARD_CONCRETE_RIGHT = 'refined-hazard-concrete-right'
}

export const TILE_TYPES = [
  TileType.STONE,
  TileType.CONCRETE,
  TileType.HAZARD_CONCRETE_LEFT,
  TileType.HAZARD_CONCRETE_RIGHT,
  TileType.REFINED_CONCRETE,
  TileType.REFINED_HAZARD_CONCRETE_LEFT,
  TileType.REFINED_HAZARD_CONCRETE_RIGHT
]
