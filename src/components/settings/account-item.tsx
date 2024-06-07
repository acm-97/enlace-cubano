import * as React from 'react'
import {twMerge} from 'tailwind-merge'

import type {TxKeyPath} from '@/core'
import {Pressable, Text, View} from '@/ui'
import {ArrowRight} from '@/ui/icons'

type ItemProps = {
  text?: TxKeyPath
  value?: string
  className?: string
  onPress?: () => void
}

export const AccountItem = ({text, value, onPress, className}: ItemProps) => {
  const isPressable = onPress !== undefined
  return (
    <Pressable
      onPress={onPress}
      pointerEvents={isPressable ? 'auto' : 'none'}
      className={twMerge(
        'flex-1 flex-row items-center justify-between border-b border-neutral-200 px-4 py-2 dark:border-neutral-700',
        className,
      )}
    >
      <View className="gap-1">
        <Text tx={text} className="font-semibold" />
        <Text className="opacity-50">{value} </Text>
      </View>
      <View className="pl-2">
        <ArrowRight />
      </View>
    </Pressable>
  )
}
