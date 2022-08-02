import Pako from 'pako'
import { AnyItem } from './schema/items'

// Create a string from a Blueprint object.
export function encode(obj: AnyItem) {
  console.log('Encoding...')
  const json = JSON.stringify(obj)
  console.log(`${json.length} bytes uncompressed`)
  const compressed = Pako.deflate(json)
  console.log(`${compressed.length} bytes compressed`)
  // Blueprint string format adds an extra "0" byte to the head
  const output = '0' + Buffer.from(compressed).toString('base64')
  console.log(`${output.length} bytes encoded`)
  return output
}

// Create a Blueprint object from a string.
export function decode(str: string) {
  // Remove leading 0 and base64 decode the rest
  const buf = Buffer.from(str.slice(1), 'base64')
  const json = Pako.inflate(buf, { to: 'string' })
  return JSON.parse(json) as AnyItem
}
