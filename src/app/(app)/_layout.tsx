/* eslint-disable react/no-unstable-nested-components */
import {Link, Redirect, SplashScreen, Tabs} from 'expo-router'
import React, {useCallback, useEffect} from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {useAuth, useIsFirstTime} from '@/core'
import {Pressable, Text} from '@/ui'
import {Feed as FeedIcon, Settings as SettingsIcon, Style as StyleIcon} from '@/ui/icons'

export default function TabLayout() {
  const status = useAuth.use.status()
  const [isFirstTime] = useIsFirstTime()
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync()
  }, [])
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash()
      }, 1000)
    }
  }, [hideSplash, status])

  if (status === 'signOut') {
    return <Redirect href="/login" />
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="(offers)"
        options={{
          title: 'Ofertas',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons color={color} size={size} name="featured-play-list" />
          ),
          tabBarTestID: 'offer-tab',
        }}
      />

      <Tabs.Screen
        name="style"
        options={{
          title: 'Style',
          headerShown: false,
          tabBarIcon: ({color}) => <StyleIcon color={color} />,
          tabBarTestID: 'style-tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({color}) => <SettingsIcon color={color} />,
          tabBarTestID: 'settings-tab',
        }}
      />
    </Tabs>
  )
}
