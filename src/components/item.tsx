import * as React from 'react'

import type {TxKeyPath} from '@/core'
import {Pressable, Text, View} from '@/ui'
import {ArrowRight} from '@/ui/icons'

type ItemProps = {
  text: TxKeyPath
  value?: string
  onPress?: () => void
  icon?: React.ReactNode
}

export const Item = ({text, value, icon, onPress}: ItemProps) => {
  const isPressable = onPress !== undefined
  return (
    <Pressable
      onPress={onPress}
      pointerEvents={isPressable ? 'auto' : 'none'}
      className="flex-1 flex-row items-center justify-between px-4 py-5"
    >
      <View className="flex-row items-center">
        {icon && <View className="pr-2">{icon}</View>}
        <Text tx={text} className="font-semibold" />
      </View>
      <View className="flex-row items-center">
        <Text className="opacity-50 dark:text-white">{value}</Text>
        {isPressable && (
          <View className="pl-2">
            <ArrowRight />
          </View>
        )}
      </View>
    </Pressable>
  )
}
