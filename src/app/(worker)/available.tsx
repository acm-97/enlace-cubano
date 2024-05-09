import {FlashList} from '@shopify/flash-list'
import {Stack} from 'expo-router'
import debounce from 'lodash.debounce'
import React, {useCallback, useEffect, useMemo, useState} from 'react'

import {useGetOffers} from '@/api/offers'
import {AvailableCard} from '@/components/available/card'
import {translate} from '@/core'
import {EmptyList, FocusAwareStatusBar, Input, Text, View} from '@/ui'

export default function AvailableList() {
  const {data, isLoading, isError} = useGetOffers()

  const renderItem = useCallback(({item}: {item: any}) => <AvailableCard {...item} />, [])

  const items = useMemo(() => data?.filter(item => item.status === 'pending'), [data])

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
    <View className="flex-1">
      <FocusAwareStatusBar />
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
