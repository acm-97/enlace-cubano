import {Link} from 'expo-router'
import React from 'react'
import {twMerge} from 'tailwind-merge'

import type {MobileOffer} from '@/api'
import {Divider, Image, Pressable, Text, View} from '@/ui'

type Props = MobileOffer

export const Card = ({description, amount, id, description_parts, colored_parts}: Props) => {
  return (
    <Link replace href={{pathname: `/mobile/${id}`}} asChild>
      <Pressable>
        <View className="m-3 overflow-hidden rounded-lg border border-neutral-300  bg-white p-4 dark:border-neutral-700  dark:bg-neutral-900">
          <View className="flex-row flex-wrap gap-1">
            {description_parts.map((part, i) => (
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
          <View className="self-start rounded-lg bg-primary-500 p-2">
            <Text className="font-medium text-white">${amount}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  )
}
