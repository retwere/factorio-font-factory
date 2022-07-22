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
