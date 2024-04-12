export * from './lodash-polyfill'
export const noop = () => {}
export const isBrowser = typeof window !== 'undefined'

export function processText(inputText) {
  const output = []
  const json = inputText.split(' ') // Split text by spaces into array

  json.forEach(function (item) {
    // Loop through each array item
    let out = item.replace(/'/g, '') // Remove all single quote '  from chunk
    out = out.split(/(\d+)/) // Now again split the chunk by Digits into array
    out = out.filter(Boolean) // With Boolean we can filter out False Boolean Values like -> false, null, 0
    output.push(out)
  })

  return output
}
