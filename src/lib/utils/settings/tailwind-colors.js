import {processText} from '@/lib/utils'
import {config} from '@gluestack-ui/config'
import hexRgb from 'hex-rgb'

export function getColors() {
  const colors = {...config.tokens.colors}
  const colorsRGB = {}

  Object.keys(colors).forEach(key => {
    const processedKey = processText(key)[0]
    const {red, green, blue} = hexRgb(colors[key])
    colorsRGB[processedKey[0]] = {
      ...colorsRGB[processedKey[0]],
      [processedKey[1]]: `rgb(${red} ${green} ${blue} / <alpha-value>)`,
    }
  })
  return colorsRGB
}
