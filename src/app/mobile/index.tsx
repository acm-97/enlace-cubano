import {FlashList} from '@shopify/flash-list'
import {Stack, useFocusEffect, useRouter} from 'expo-router'
import debounce from 'lodash.debounce'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {RefreshControl} from 'react-native'

import type {MobileOffer} from '@/api'
import {useMobileOffers} from '@/api'
import CartButton from '@/components/cart-button-header'
import {Card} from '@/components/mobile-offers/card'
import PhoneSection from '@/components/mobile-offers/phone-section'
import {translate} from '@/core'
import {useRefreshByUser, useRefreshOnFocus} from '@/core/hooks/react-query'
import {useAnimatedShake} from '@/hooks/use-animated-shake'
import {Divider, EmptyList, FocusAwareStatusBar, Input, Text, View} from '@/ui'

export default function MobileOffersList() {
  const {data, isLoading, isError, refetch} = useMobileOffers()
  const [search, setSearch] = useState<string>()
  const [items, setItems] = useState<MobileOffer[]>()
  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch)
  useRefreshOnFocus(refetch)
  const {shake, rStyle, isShaking} = useAnimatedShake()
  const [key, setKey] = useState(0)
  const {} = useRouter()

  useEffect(() => {
    setItems(data)
  }, [data])

  const renderItem = useCallback(
    ({item}: {item: MobileOffer}) => <Card item={item} shake={shake} />,
    [shake],
  )

  useFocusEffect(
    useCallback(() => {
      setKey(Math.random())
    }, []),
  )

  const debounced = debounce(value => {
    const filter = data?.filter(
      (ele: MobileOffer) =>
        ele.marketing_features
          .join()
          ?.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          ?.includes(
            value
              ?.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase(),
          ) ||
        ele.amount
          ?.toString()
          ?.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          ?.includes(
            value
              ?.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase(),
          ),
    )
    setItems(filter)
  }, 500)

  const onChange = (value: string) => {
    setSearch(value)
    debounced(value)
  }

  if (isLoading || !data || data?.length === 0) {
    return (
      <>
        <FocusAwareStatusBar />
        <EmptyList isLoading={isLoading} />
      </>
    )
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <FocusAwareStatusBar />
        <Text tx="error-data" className="text-center" />
      </View>
    )
  }

  return (
    <View className="flex-1" key={key}>
      <Stack.Screen
        options={{
          title: translate('offers.mobile.title'),
          headerBackTitleVisible: false,
          headerRight: CartButton,
        }}
      />
      <FocusAwareStatusBar />
      <View className="w-full px-3.5 pb-4 pt-8">
        <PhoneSection rStyle={rStyle} />
        <Divider className="my-6" />
        <Input
          value={search}
          onChangeText={onChange}
          placeholder={translate('offers.mobile.search')}
        />
      </View>
      <FlashList
        data={items}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        estimatedItemSize={300}
        refreshControl={
          <RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />
        }
      />
    </View>
  )
}
