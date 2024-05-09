import {useQueryClient} from '@tanstack/react-query'
import React from 'react'
import {twMerge} from 'tailwind-merge'
import {tv} from 'tailwind-variants'

import {type OfferType, useUpdateOffer} from '@/api/offers'
import {translate} from '@/core'
import {Button, Divider, Image, Pressable, Text, View} from '@/ui'

export const cardWorker = tv({
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

export const AvailableCard = ({
  description,
  phoneNumber,
  status,
  colored_parts,
  updatedAt,
  id,
}: Props) => {
  const styles = cardWorker({status})
  const {mutate} = useUpdateOffer()
  const queryClient = useQueryClient()

  const onProcess = () => {
    mutate(
      {id, status: 'processing'},
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['offers-history']})
        },
      },
    )
  }

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
        <Button label={translate('process')} onPress={onProcess} />
      </View>
    </View>
  )
}
