import {config} from '@gluestack-ui/config'
import {DefaultTheme} from '@react-navigation/native'

export const NavigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: config.tokens.colors.orange500,
  },
}
