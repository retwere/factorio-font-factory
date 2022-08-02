import { Entity } from '.'
import { Item as ItemT, ItemType as ItemTypeT } from '../schema/items'
import { Color } from '../schema/utils'
import { Icons } from './icons'
import { FACTORIO_VERSION } from '../../config/version'

const version = FACTORIO_VERSION

export abstract class Item<
  I extends ItemT<Type, Data, Key>,
  Type extends ItemTypeT,
  Data,
  Key extends string = Type
> extends Entity<I> {
  readonly label: string
  readonly label_color?: Color
  icons: Icons

  abstract get item(): Type
  abstract get data(): Data
  abstract get key(): Key

  constructor(label: string, label_color?: Color, icons: Icons = new Icons()) {
    super()
    this.label = label
    this.label_color = label_color
    this.icons = icons
  }

  encode(): I {
    const { data, key, item, label, label_color, icons } = this
    return {
      [key]: { item, label, label_color, icons: icons.encode(), version, ...data }
      // Can't get this to work w/o casting b/c of calculated field name:
    } as I
  }
}

export type ItemType<E extends Item<any, unknown, any, any>> = E["item"]
export type ItemData<E extends Item<any, any, any, any>> = E extends Item<any, any, infer Data, any> ? Data : never
export type ItemKey<E extends Item<any, any, any, any>> = E extends Item<any, any, any, infer Key> ? Key : never
