import { BlueprintBookData } from '../schema/items'
import { Color } from '../schema/utils'
import { Icons } from './icons'
import { Item } from './item'
import { Tile } from './tile'

export class Blueprint extends Item<'blueprint-book', BlueprintBookData, 'blueprint_book'> {
  readonly tiles?: Tile[]

  constructor(label: string, label_color?: Color, icons?: Icons, tiles?: Tile[]) {
    super(label, label_color, icons)
    this.tiles = tiles
  }

  get item() {
    return 'blueprint' as const
  }

  get key() {
    return this.item
  }

  get data(): BlueprintData {
    const tiles = this.tiles?.map(tile => tile.encode())
    return { tiles }
  }
}
