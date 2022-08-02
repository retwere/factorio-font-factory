/** The types of signals that can be used in circuits or as icons. */
const SIGNAL_TYPES = ['item', 'fluid', 'virtual'] as const
export type SignalType = typeof SIGNAL_TYPES[number]

/** The ID of a signal. */
export type SignalID = {
  name: string
  type: SignalType
}

/** These characters are available as virtual signals. */
export const SIGNAL_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
