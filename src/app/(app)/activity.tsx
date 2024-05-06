import {FlashList} from '@shopify/flash-list'
import {Stack} from 'expo-router'
import debounce from 'lodash.debounce'
import React, {useCallback, useEffect, useMemo, useState} from 'react'

import {useMobileOffers} from '@/api'
import {ActivityCard} from '@/components/activity/card'
import {translate} from '@/core'
import {EmptyList, FocusAwareStatusBar, Input, Text, View} from '@/ui'

export default function ActivityList() {
  const {data, isLoading, isError} = useMobileOffers()

  const renderItem = useCallback(
    ({item}: {item: any}) => <ActivityCard {...item} status="pending" />,
    [],
  )

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    )
  }
  return (
    <View className="flex-1">
      <FocusAwareStatusBar />
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        estimatedItemSize={300}
      />
    </View>
  )
}
