import {colorScheme, useColorScheme} from 'nativewind'
import React from 'react'
import {useMMKVString} from 'react-native-mmkv'
import {useAppColorScheme, useDeviceContext} from 'twrnc'

import {storage} from '../storage'
import tw from '../tailwind'

const SELECTED_THEME = 'SELECTED_THEME'
export type ColorSchemeType = 'light' | 'dark' | 'system'
/**
 * this hooks should only be used while selecting the theme
 * This hooks will return the selected theme which is stored in MMKV
 * selectedTheme should be one of the following values 'light', 'dark' or 'system'
 * don't use this hooks if you want to use it to style your component based on the theme use useColorScheme from nativewind instead
 *
 */
export const useSelectedTheme = () => {
  const [_, __, _setColorScheme] = useAppColorScheme(tw)
  const {colorScheme: _color, setColorScheme} = useColorScheme()
  const [theme, _setTheme] = useMMKVString(SELECTED_THEME, storage)

  const setSelectedTheme = React.useCallback(
    (t: ColorSchemeType) => {
      setColorScheme(t)
      // @ts-ignore
      _setColorScheme(t === 'system' ? 'device' : t)
      _setTheme(t)
    },
    [setColorScheme, _setTheme, _setColorScheme],
  )

  useDeviceContext(tw, {
    // 1️⃣  opt OUT of listening to DEVICE color scheme events
    observeDeviceColorSchemeChanges: false,
    // 2️⃣  and supply an initial color scheme
    initialColorScheme: 'device', // 'light' | 'dark' | 'device'
  })

  const selectedTheme = (theme ?? 'system') as ColorSchemeType
  return {selectedTheme, setSelectedTheme} as const
}
// to be used in the root file to load the selected theme from MMKV
export const loadSelectedTheme = () => {
  const theme = storage.getString(SELECTED_THEME)
  if (theme !== undefined) {
    colorScheme.set(theme as ColorSchemeType)
  }
}
