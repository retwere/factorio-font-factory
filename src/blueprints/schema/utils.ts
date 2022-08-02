// UTILITIES

import { Point } from '../../common'
import { SignalID } from './signals'

/** An element of an IndexedArray. */
export type Indexed<T, Num extends number = number, Label extends string = 'index'> = T &
  Record<Label, Num>

/** An array with index. */
export type IndexedArray<T, Num extends number = number, Label extends string = 'index'> = Array<
  Indexed<T, Num, Label>
>

/** A position on the map. */
export type Position = Point

/** An icon. */
export type Icon = { signal: SignalID }

/** A color. */
export type Color = { r: number; g: number; b: number; a: number }
