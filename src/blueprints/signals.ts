/** The types of signals that can be used in circuits or as icons. */
export enum SignalType {
  ITEM = 'item',
  FLUID = 'fluid',
  VIRTUAL = 'virtual'
}

/** The ID of a signal. */
export type SignalID = {
  name: string
  type: SignalType
}

/** These characters are available as signals/icons. */
export const SIGNAL_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
