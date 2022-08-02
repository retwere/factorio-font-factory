import { Entity } from '.'
import { SignalType } from '../schema/signals'
import { Icon as IconT, IndexedArray } from '../schema/utils'

export class Icon extends Entity<IconT> {
  readonly name: string
  readonly type: SignalType

  constructor(name: string, type: SignalType) {
    super()
    this.name = name
    this.type = type
  }

  encode(): IconT {
    const { name, type } = this
    return { signal: { name, type } }
  }
}

export class Icons extends Entity<IndexedArray<IconT, 1 | 2 | 3 | 4>> {
  icons: (Icon | null)[]

  constructor(icon1?: Icon, icon2?: Icon, icon3?: Icon, icon4?: Icon) {
    super()
    this.icons = [icon1 ?? null, icon2 ?? null, icon3 ?? null, icon4 ?? null]
  }

  encode(): IndexedArray<IconT, 1 | 2 | 3 | 4> {
    return this.icons.flatMap((icon, i) => {
      const index = (i + 1) as 1 | 2 | 3 | 4
      return icon ? [{ ...icon.encode(), index }] : []
    })
  }
}
