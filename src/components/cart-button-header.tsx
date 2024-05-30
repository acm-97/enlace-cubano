import {useRouter} from 'expo-router'
import React from 'react'
import {TouchableOpacity} from 'react-native-gesture-handler'

import {useCart} from '@/hooks/use-cart'
import {Icon, Text, View} from '@/ui'

type Props = {}
export default function CartButton({}: Props) {
  const cartTotal = useCart.use.total()
  const {push} = useRouter()

  return (
    <View className="px-4 pt-1">
      <View className="relative">
        <TouchableOpacity activeOpacity={0.5} onPress={() => push('/cart')}>
          <Icon as="AntDesign" size={24} name="shoppingcart" />
          {cartTotal > 0 && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => push('/cart')}
              className="!px-1.5\ absolute -right-1 -top-0.5 rounded-full bg-primary-500"
            >
              <Text className="text-[10px]">{cartTotal}</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}
