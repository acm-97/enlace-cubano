import * as React from 'react'
import {twMerge} from 'tailwind-merge'

import {View} from '@/ui'

type Props = {
  className: string
}
export default function Divider({className}: Props) {
  return (
    <View className={twMerge('border-b border-neutral-300 dark:border-neutral-700', className)} />
  )
}
