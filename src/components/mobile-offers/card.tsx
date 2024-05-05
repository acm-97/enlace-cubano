import {Link} from 'expo-router'
import React from 'react'

import type {MobileOffer} from '@/api'
import {Divider, Image, Pressable, Text, View} from '@/ui'

type Props = MobileOffer

export const Card = ({description, price, id}: Props) => {
  return (
    <Link replace href={{pathname: `/mobile/${id}`}} asChild>
      <Pressable>
        <View className="m-3 overflow-hidden rounded-lg border border-neutral-300  bg-white p-4 dark:border-neutral-700  dark:bg-neutral-900">
          <Text className="text-lg ">{description}</Text>
          <Divider className="my-4" />
          <View className="self-start rounded-lg bg-primary-500 p-2">
            <Text className="font-medium text-white">{price}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  )
}
