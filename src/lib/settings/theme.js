import {config} from '@gluestack-ui/config'
import {DefaultTheme, DarkTheme} from '@react-navigation/native'
import {Appearance} from 'react-native'

export const NavigatorTheme = {
  ...(Appearance.getColorScheme() === 'dark' ? DarkTheme : DefaultTheme),
  dark: Appearance.getColorScheme() === 'dark',
  colors: {
    ...(Appearance.getColorScheme() === 'dark' ? DarkTheme : DefaultTheme).colors,
    background: '#fff',
    primary: config.tokens.colors.orange500,
  },
}
