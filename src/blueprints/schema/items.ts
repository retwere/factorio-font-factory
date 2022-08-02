// GENERAL ITEMS

import { Tile } from "./tiles"
import { Color, Icon, IndexedArray, Position } from "./utils"

export type ItemMetadata<Type extends ItemType> = {
  /** The type of item that was exported. */
  item: Type
  /** The user-assigned label of the item. */
  label: string
  /** The color of the label of this item. */
  label_color?: Color
  /** The icon(s) of this item. */
  icons: IndexedArray<Icon, 1 | 2 | 3 | 4>
  /** The version of the map the item was created in. */
  version: number
}

/** Container for any item in Factorio that can be imported from/exported to a string. */
export type Item<Type extends ItemType, Data, Key extends string = Type> = {
  [key in Key]: Data & ItemMetadata<Type>
}

/** The types of items that can be exported. */
export const ITEM_TYPES = ['blueprint', 'blueprint-book'] as const
export type ItemType = typeof ITEM_TYPES[number]

/** The data content of a blueprint */
export type BlueprintData = {
  // entities?: Array<Entity>
  tiles?: Array<Tile>
  // schedules?: Array<Schedule>
  'snap-to-grid'?: Position
}

/** A blueprint. */
export type Blueprint = Item<'blueprint', BlueprintData>

/** The data content of a blueprint book */
export type BlueprintBookData = {
  blueprints: IndexedArray<AnyItem>
  active_index?: number
}

/** A blueprint book. */
export type BlueprintBook = Item<
  'blueprint-book',
  BlueprintBookData,
  // N.B. the Key has an underscore while the Type has a '-'
  'blueprint_book'
>

/** Any item in Factorio that can be imported from/exported to a string. */
export type AnyItem = Blueprint | BlueprintBook
