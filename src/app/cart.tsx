import {FlashList} from '@shopify/flash-list'
import React, {useCallback} from 'react'
import {useWindowDimensions} from 'react-native'

import type {MobileOffer} from '@/api'
import CardPayButton from '@/components/card-pay-button'
import CartCard from '@/components/mobile-offers/cart-card'
import {translate, useSelectedTheme} from '@/core'
import {useCart} from '@/hooks/use-cart'
import {Button, colors, EmptyList, FocusAwareStatusBar, Modal, Text, useModal, View} from '@/ui'

export type CartItem = MobileOffer & {phoneNumber: string}

type Props = {}
export default function Cart({}: Props) {
  const selectedItems = useCart.use.selectedItems()
  const totals = useCart.use.totals()
  const modal = useModal()
  const {width: windowWidth, height: windowHeight} = useWindowDimensions()
  const {selectedTheme} = useSelectedTheme()

  const renderItem = useCallback(({item}: {item: CartItem}) => <CartCard item={item} />, [])

  return (
    <View className="relative flex-1">
      <FlashList
        data={selectedItems}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={false} />}
        estimatedItemSize={300}
      />
      <View className="absolute bottom-0 h-20 w-full flex-row items-center justify-between gap-2 rounded-t-xl border-t border-neutral-300 px-6 dark:border-neutral-700">
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
      <Modal
        ref={modal.ref}
        index={0}
        snapPoints={[windowHeight * 0.3]}
        style={{zIndex: 9999}}
        backgroundStyle={{
          backgroundColor: selectedTheme === 'light' ? '#fff' : colors.charcoal[850],
        }}
        title={translate('cart.select-method')}
      >
        <View className="p-4">
          <CardPayButton modal={modal} />
        </View>
      </Modal>
    </View>
  )
}
