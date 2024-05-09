import {FlashList} from '@shopify/flash-list'
import {Stack} from 'expo-router'
import debounce from 'lodash.debounce'
import React, {useCallback, useEffect, useMemo, useState} from 'react'

import type {MobileOffer} from '@/api'
import {useMobileOffers} from '@/api'
import {Card} from '@/components/mobile-offers/card'
import {translate} from '@/core'
import {EmptyList, FocusAwareStatusBar, Input, Text, View} from '@/ui'

export default function MobileOffersList() {
  const {data, isLoading, isError} = useMobileOffers()
  const [search, setSearch] = useState<string>()
  const [items, setItems] = useState<MobileOffer[]>()

  useEffect(() => {
    setItems(data)
  }, [data])

  const renderItem = useCallback(({item}: {item: MobileOffer}) => <Card {...item} />, [])

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

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    )
  }
  return (
    <View className="flex-1">
      <Stack.Screen
        options={{title: translate('offers.mobile.title'), headerBackTitleVisible: false}}
      />
      <FocusAwareStatusBar />
      <Input
        value={search}
        onChangeText={onChange}
        classNames={{container: 'mx-3.5 mt-8 mb-4'}}
        placeholder={translate('offers.mobile.search')}
      />
      <FlashList
        data={items}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        estimatedItemSize={300}
      />
    </View>
  )
}
