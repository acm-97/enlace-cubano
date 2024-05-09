import format from 'date-fns/format'
import {Link} from 'expo-router'
import React from 'react'
import {twMerge} from 'tailwind-merge'
import {tv} from 'tailwind-variants'

import type {MobileOffer} from '@/api'
import type {OfferType} from '@/api/offers'
import {Divider, Image, Pressable, Text, View} from '@/ui'

const card = tv({
  slots: {
    container:
      'm-3 overflow-hidden rounded-lg border border-neutral-300  bg-white p-4 dark:border-neutral-700  dark:bg-neutral-900',
    statusLabel: 'font-semibold capitalize',
    itemContainer: 'flex-row justify-around',
  },

  variants: {
    status: {
      pending: {
        statusLabel: '!text-warning-500',
      },
      processing: {
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

type Props = OfferType

export const ActivityCard = ({
  description,
  amount,
  status,
  colored_parts,
  updatedAt,
  note,
}: Props) => {
  const styles = card({status})
  return (
    <View className={styles.container()}>
      <View className="flex-row flex-wrap gap-1">
        {description.map((part: string, i: number) => (
          <Text
            key={`description-${i}`}
            className={twMerge(
              'text-lg',
              colored_parts.includes(i.toString()) && 'text-primary-300',
            )}
          >
            {part}
          </Text>
        ))}
      </View>
      <Divider className="my-4" />
      <View className={styles.itemContainer()}>
        <View className="items-center">
          <Text className="font-semibold ">${amount}</Text>
          <Text className="text-sm opacity-70">Price</Text>
        </View>
        <View className="items-center">
          <Text className={styles.statusLabel()}>{status}</Text>
          <Text className="text-sm opacity-70">Status</Text>
        </View>
        <View className="items-center">
          {/* @ts-ignore */}
          <Text className="font-semibold">{format(new Date(updatedAt), 'P')}</Text>
          <Text className="text-sm opacity-70">Date</Text>
        </View>
      </View>
      {note && (
        <>
          <Divider className="my-4" />
          <Text className="font-semibold ">{note}</Text>
        </>
      )}
    </View>
  )
}
