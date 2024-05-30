import {useRouter} from 'expo-router'
import React from 'react'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {twMerge} from 'tailwind-merge'

import {useCart} from '@/hooks/use-cart'
import {Icon, Text, View} from '@/ui'

type Props = {}
export default function CartButton({}: Props) {
  const cartTotal = useCart.use.total()
  const {push} = useRouter()

  return (
    <View className="px-4 pt-1">
      <TouchableOpacity activeOpacity={0.5} onPress={() => push('/cart')}>
        <View className="relative">
          <Icon as="AntDesign" size={24} name="shoppingcart" />
          {cartTotal > 0 && (
            <Text
              className={twMerge(
                'absolute -right-1 -top-1 rounded-full bg-primary-500 !px-1.5 text-[10px]',
                cartTotal > 9 && '-right-2 -top-2 py-0.5',
              )}
            >
              {cartTotal}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
}
