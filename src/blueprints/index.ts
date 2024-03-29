import { Point } from '../common'
import { SignalID } from './signals'
import { Tile } from './tiles'

// GENERAL ITEMS

/** Container for any item in Factorio that can be imported from/exported to a string. */
export type Item<Type extends ItemType, Data, Key extends string = Type> = Record<
  Key,
  Data & {
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
>

/** The types of items that can be exported. */
export enum ItemType {
  BLUEPRINT = 'blueprint',
  BLUEPRINT_BOOK = 'blueprint-book'
}

/** A blueprint. */
export type Blueprint = Item<
  ItemType.BLUEPRINT,
  {
    // entities?: Array<Entity>
    tiles?: Array<Tile>
    // schedules?: Array<Schedule>
    'snap-to-grid'?: Position
  }
>

/** A blueprint book. */
export type BlueprintBook = Item<
  ItemType.BLUEPRINT_BOOK,
  {
    blueprints: IndexedArray<AnyItem>
    active_index?: number
  },
  'blueprint_book'
>

/** Any item in Factorio that can be imported from/exported to a string. */
export type AnyItem = Blueprint | BlueprintBook

// UTILITIES

/** An array with index. */
export type IndexedArray<T, Num extends number = number, Idx extends string = 'index'> = Array<
  Record<Idx, Num> & T
>

/** A position on the map. */
export type Position = Point

/** An icon. */
export type Icon = { signal: SignalID }

/** A color. */
export type Color = { r: number; g: number; b: number; a: number }

// CONSTANTS

/** The version we report in exported blueprints. */
export const VERSION = 281479275675648
