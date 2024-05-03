import {getHeaderTitle, Header, HeaderBackButton} from '@react-navigation/elements'
import {Stack, useLocalSearchParams, useRouter} from 'expo-router'
import React from 'react'
import {View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {translate} from '@/core'

export default function MobileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: translate('offers.mobile.title'),
          // headerShown: false,
          header: CustomHeader,
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          title: '',
          // headerShown: false,
          header: CustomHeader,
        }}
      />
    </Stack>
  )
}

function CustomHeader({options, route, navigation}: any) {
  const insets = useSafeAreaInsets()
  const {replace} = useRouter()

  const renderHeaderLeft = () =>
    navigation.canGoBack() && (
      <HeaderBackButton
        label={' '}
        style={{paddingLeft: 15}}
        onPress={() => (route.params.id ? replace('/(app)/(offers)/mobile') : navigation.goBack())}
      />
    )

  return (
    <>
      <View style={{height: insets.top}} />
      <Header
        {...options}
        {...route}
        title={route.params.id ? 'Pagar Oferta' : getHeaderTitle(options, route.name)}
        headerLeft={renderHeaderLeft}
      />
    </>
  )
}
