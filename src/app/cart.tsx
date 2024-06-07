import {FlashList} from '@shopify/flash-list'
import {useColorScheme} from 'nativewind'
import React, {useCallback} from 'react'
import {Platform, useWindowDimensions} from 'react-native'
import {twMerge} from 'tailwind-merge'

import type {MobileOffer} from '@/api'
import CardPayButton from '@/components/card-pay-button'
import CartCard from '@/components/mobile-offers/cart-card'
import {translate} from '@/core'
import {useCart} from '@/hooks/use-cart'
import {Button, colors, EmptyList, FocusAwareStatusBar, Modal, Text, useModal, View} from '@/ui'

export type CartItem = MobileOffer & {phoneNumber: string}

type Props = {}
export default function Cart({}: Props) {
  const items = useCart.use.items()
  const totals = useCart.use.totals()
  const modal = useModal()
  const {width: windowWidth, height: windowHeight} = useWindowDimensions()
  const {colorScheme} = useColorScheme()

  const renderItem = useCallback(
    ({item, index}: {item: CartItem; index: number}) => <CartCard item={item} index={index} />,
    [],
  )

  return (
    <View className="relative flex-1">
      <FlashList
        data={items}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={false} />}
        estimatedItemSize={300}
      />
      <View
        className={twMerge(
          'absolute bottom-0 h-24 w-full flex-row items-center justify-between gap-2 border-t border-x border-neutral-200/50 px-6 dark:border-neutral-700/50 bg-white',
          colorScheme === 'dark' && 'bg-charcoal-850',
          Platform.OS === 'android' && 'rounded-t-2xl ',
        )}
      >
        <View className="flex-row items-center gap-1">
          <Text className="font-bold opacity-50">{translate('cart.total')}</Text>
          <Text className="text-xl font-bold">${totals.totalEstimated}</Text>
        </View>
        <Button
          label={`${translate('cart.pay')} (${totals.totalCountSelected})`}
          size="lg"
          className="m-0 rounded-full px-5"
          textClassName="text-sm font-bold"
          onPress={modal.present}
        />
      </View>
      <View className="h-24" />
      <Modal
        ref={modal.ref}
        index={0}
        snapPoints={[windowHeight * 0.3]}
        title={translate('cart.select-method')}
      >
        <View className="p-4">
          <CardPayButton modal={modal} />
        </View>
      </Modal>
    </View>
  )
}
