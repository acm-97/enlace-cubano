import * as React from 'react'
import {View} from 'react-native'
import type {VariantProps} from 'tailwind-variants'
import {tv} from 'tailwind-variants'

const divider = tv({
  slots: {
    base: ' border-neutral-300 dark:border-neutral-700',
  },

  variants: {
    vertical: {
      true: {
        base: 'mx-2 h-full border-r',
      },
      false: {
        base: 'my-2 border-b',
      },
    },
  },
  defaultVariants: {
    vertical: false,
  },
})

type ButtonVariants = VariantProps<typeof divider>
interface Props extends ButtonVariants {
  className?: string
  vertical?: boolean
}

export default function Divider({className, vertical}: Props) {
  const styles = React.useMemo(() => divider({vertical}), [vertical])

  return <View className={styles.base({className})} />
}
