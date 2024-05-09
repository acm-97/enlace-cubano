import {FlashList} from '@shopify/flash-list'
import {Stack} from 'expo-router'
import debounce from 'lodash.debounce'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {RefreshControl} from 'react-native'

import {useGetOffers} from '@/api/offers'
import {ActivityCard} from '@/components/activity/card'
import {translate} from '@/core'
import {useRefreshByUser, useRefreshOnFocus} from '@/core/hooks/react-query'
import {EmptyList, FocusAwareStatusBar, Input, Text, View} from '@/ui'

export default function ActivityList() {
  const {data, isLoading, isError, refetch} = useGetOffers()
  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch)
  useRefreshOnFocus(refetch)

  const renderItem = useCallback(({item}: {item: any}) => <ActivityCard {...item} />, [])

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
        data={data}
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
