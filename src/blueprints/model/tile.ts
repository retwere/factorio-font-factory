import { Entity } from '.'
import { Tile as TileT, TileName } from '../schema/tiles'
import { Position } from '../schema/utils'



export class Tile extends Entity<TileT> {
  position: Position
  name: TileName

  constructor(position: Position, name: TileName) {
    super()
    this.position = position
    this.name = name
  }

  encode(): TileT {
    const { position, name } = this
    return { position, name }
  }
}
