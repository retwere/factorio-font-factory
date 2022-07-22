const Pako = require("pako")

// Create a blueprint string from a JS object.
function encode(obj) {
  const json = JSON.stringify(obj)
  const compressed = Pako.deflate(json, {to: 'string'})
  // base64 encode and add a leading 0
  return "0" + btoa(compressed)
}

// Decode a JSON string into a JS object.
function decode(str) {
  // Remove leading 0 and base64 decode the rest
  const binary = atob(str.slice(1))
  const json = Pako.inflate(binary, {to: 'string'})
  return JSON.parse(json)
}
