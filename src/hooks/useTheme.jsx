import {tw} from '@/lib/settings'
import {config} from '@gluestack-ui/config'
import {DefaultTheme, DarkTheme, useColorScheme} from '@react-navigation/native'
import {useState} from 'react'
import {Appearance} from 'react-native'
import {useAppColorScheme, useDeviceContext} from 'twrnc'
import {create} from 'zustand'

const getNavigatorTheme = theme => {
  const isDark = theme === 'dark'
  return {
    ...(isDark === 'dark' ? DarkTheme : DefaultTheme),
    dark: Appearance.getColorScheme() === 'dark',
    colors: {
      ...(isDark ? DarkTheme : DefaultTheme).colors,
      background: isDark ? '#121212' : '#fff',
      primary: config.tokens.colors.orange500,
    },
  }
}

const themeStore = create(set => ({
  theme: Appearance.getColorScheme(),
  navigatorTheme: getNavigatorTheme(),
  setTheme: (mode, setColorScheme, setNavigatorTheme) => {
    setColorScheme(mode)
    setNavigatorTheme(getNavigatorTheme(mode))
    set({theme: mode})
  },
  setNavigatorTheme: navigatorTheme => set({navigatorTheme}),
}))

export default function useTheme() {
  const theme = themeStore(state => state.theme)
  const navigatorTheme = themeStore(state => state.navigatorTheme)
  const onChangeTheme = themeStore(state => state.setTheme)
  const setNavigatorTheme = themeStore(state => state.setNavigatorTheme)

  const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw)

  useDeviceContext(tw, {
    // 1️⃣  opt OUT of listening to DEVICE color scheme events
    observeDeviceColorSchemeChanges: false,
    // 2️⃣  and supply an initial color scheme
    initialColorScheme: theme, // 'light' | 'dark' | 'device'
  })

  // 3️⃣  use the `useAppColorScheme` hook anywhere to get a reference to the current
  // colorscheme, with functions to modify it (triggering re-renders) when you need

  const setTheme = mode => {
    mode = mode === 'device' ? Appearance.getColorScheme() : mode
    onChangeTheme(mode, setColorScheme, setNavigatorTheme)
  }

  return {theme, navigatorTheme, setTheme}
}
