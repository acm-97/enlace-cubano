import {Link, useRouter} from 'expo-router'
import React from 'react'
import {TouchableOpacity} from 'react-native'
import {twMerge} from 'tailwind-merge'

import type {MobileOffer} from '@/api'
import {useCart} from '@/hooks/use-cart'
import {contactsState} from '@/hooks/use-contacts'
import {colors, Divider, Icon, Image, Pressable, Text, View} from '@/ui'

type Props = {item: MobileOffer; shake: any}

export const Card = ({item, shake}: Props) => {
  const {push} = useRouter()
  const selectedPhone = contactsState(state => state.selectedPhone)
  const addItem = useCart.use.addItem()

  const onPress = () => {
    if (selectedPhone) {
      addItem({...item, phoneNumber: selectedPhone})
    } else shake()
  }

  return (
    // <Link replace href={{pathname: `/mobile/${id}`}} asChild>
    // <Pressable>
    <>
      <View className="m-3 overflow-hidden rounded-lg border border-neutral-200  bg-white p-4 dark:border-neutral-700  dark:bg-neutral-900">
        <View className="flex-row flex-wrap gap-1 px-2">
          {item.description_parts.map((part, i) => (
            <Text
              key={`description-${i}`}
              className={twMerge(
                'text-lg',
                item.colored_parts.includes(i.toString()) && 'text-primary-300',
              )}
            >
              {part}
            </Text>
          ))}
        </View>
        <Divider className="my-4" />
        <View className="w-full flex-row items-center justify-between px-2">
          <Text className="rounded-lg bg-primary-500 p-2 font-medium text-white">
            ${item.amount}
          </Text>
          <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
            <Icon as="MaterialIcons" size={24} name="add-shopping-cart" />
          </TouchableOpacity>
        </View>
      </View>
    </>
    // </Pressable>
    // </Link>
  )
}
