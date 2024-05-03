import {useLocalSearchParams} from 'expo-router'
import * as React from 'react'

import {Text, View} from '@/ui'

type Props = {}
export default function CompName({}: Props) {
  const params = useLocalSearchParams()
  return (
    <View className="flex-1">
      <Text className="text-base">CompName Component</Text>
    </View>
  )
}
