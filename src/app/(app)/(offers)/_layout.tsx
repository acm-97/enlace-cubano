import type {HeaderBackButtonProps} from '@react-navigation/elements'
import {getHeaderTitle, Header, HeaderBackButton} from '@react-navigation/elements'
import {Stack, useLocalSearchParams, useRouter} from 'expo-router'
import React from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {translate} from '@/core'
import {Text, View} from '@/ui'

export default function OffersLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{
          title: translate('offers.index-title'),
          // headerShown: false,
        }}
      />

      <Stack.Screen
        name="mobile"
        options={{
          headerShown: false,
        }}
      />

      {/* <Stack.Screen
        name="nauta"
        options={{
          title: 'Ofertas Nauta Hogar',
        }}
      /> */}
    </Stack>
  )
}
