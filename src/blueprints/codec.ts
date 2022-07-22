import Pako from 'pako'

type Blueprint = object // TODO

// Create a string from a Blueprint object.
export function encode(obj: Blueprint) {
  const json = JSON.stringify(obj)
  const compressed = Pako.deflate(json)
  // Blueprint string format adds an extra "0" byte to the head
  return '0' + Buffer.from(compressed).toString('base64')
}

// Create a Blueprint object from a string.
export function decode(str: string) {
  // Remove leading 0 and base64 decode the rest
  const buf = Buffer.from(str.slice(1), 'base64')
  const json = Pako.inflate(buf, { to: 'string' })
  return JSON.parse(json) as Blueprint
}
