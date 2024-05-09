/* eslint-disable react/no-unstable-nested-components */
import {Link, Redirect, SplashScreen, Tabs} from 'expo-router'
import React, {useCallback, useEffect, useMemo} from 'react'
import {Platform} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {useCurrentUser} from '@/api/users'
import {translate, useAuth, useIsFirstTime} from '@/core'

export default function TabLayout() {
  const status = useAuth.use.status()
  const saveUser = useAuth.use.saveUser()
  const user = useAuth.use.user()
  // const [isFirstTime] = useIsFirstTime()
  const {data} = useCurrentUser()

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

  useEffect(() => {
    if (data && !user) {
      saveUser(data)
    }
  }, [data, saveUser, status, user])

  const isClient = useMemo(() => user?.role === 'client', [user])

  if (status === 'signOut') {
    return <Redirect href="/login" />
  }

  if (!isClient) {
    return <Redirect href="/(worker)/available" />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          ...(Platform.OS === 'android' && {paddingBottom: 10}),
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingTop: 10,
        },
        tabBarLabelStyle: {fontSize: 14},
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: translate('offers.index-title'),
          // headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons color={color} size={size} name="featured-play-list" />
          ),
          tabBarTestID: 'offer-tab',
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          title: translate('activity'),
          // headerShown: false,
          tabBarIcon: ({color, size}) => <MaterialIcons color={color} size={size} name="receipt" />,
          tabBarTestID: 'activity-tab',
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: translate('settings.title'),
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons color={color} size={size} name="settings" />
          ),
          tabBarTestID: 'settings-tab',
        }}
      />
    </Tabs>
  )
}
