import format from 'date-fns/format'
import {Link} from 'expo-router'
import React from 'react'
import {tv} from 'tailwind-variants'

import type {MobileOffer} from '@/api'
import {Divider, Image, Pressable, Text, View} from '@/ui'

const card = tv({
  slots: {
    container:
      'm-3 overflow-hidden rounded-lg border border-neutral-300  bg-white p-4 dark:border-neutral-700  dark:bg-neutral-900',
    statusLabel: 'font-semibold',
    itemContainer: 'flex-row justify-around',
  },

  variants: {
    status: {
      pending: {
        statusLabel: '!text-warning-500',
      },
      completed: {
        statusLabel: '!text-success-500',
      },
      rejected: {
        statusLabel: '!text-danger-500',
      },
    },
  },
  defaultVariants: {
    status: 'pending',
  },
})

type Props = any

export const ActivityCard = ({description, price, id, status}: Props) => {
  const styles = card({status})
  return (
    <View className={styles.container()}>
      <Text className="text-lg ">{description}</Text>
      <Divider className="my-4" />
      <View className={styles.itemContainer()}>
        <View className="items-center">
          <Text className="font-semibold ">{price}</Text>
          <Text className="opacity-70">Price</Text>
        </View>
        <View className="items-center">
          <Text className={styles.statusLabel()}>{'Pending'}</Text>
          <Text className="opacity-70">Status</Text>
        </View>
        <View className="items-center">
          {/* @ts-ignore */}
          <Text className="font-semibold">{format(new Date(), 'P')}</Text>
          <Text className="opacity-70">Date</Text>
        </View>
      </View>
    </View>
  )
}
