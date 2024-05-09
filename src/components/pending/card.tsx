import {zodResolver} from '@hookform/resolvers/zod'
import {useQueryClient} from '@tanstack/react-query'
import React, {useState} from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {useForm} from 'react-hook-form'
import {twMerge} from 'tailwind-merge'
import {z} from 'zod'

import {type OfferType, useUpdateOffer} from '@/api/offers'
import {translate} from '@/core'
import {Button, ControlledInput, Divider, Image, Input, Pressable, Text, View} from '@/ui'

import {cardWorker} from '../available/card'

const Schema = z.object({
  note: z.string().min(1, translate('pending.note-required')),
})

type FormProps = z.infer<typeof Schema>

type Props = OfferType

export const PendingCard = ({
  id,
  description,
  phoneNumber,
  status,
  colored_parts,
  updatedAt,
}: Props) => {
  const styles = cardWorker({status})
  const [isReject, setIsReject] = useState<boolean>(false)

  const {control, handleSubmit} = useForm<FormProps>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(Schema),
  })
  const {mutate} = useUpdateOffer()
  const queryClient = useQueryClient()

  const onSaveNote: SubmitHandler<FormProps> = data => {
    // console.log('🚀 ~ data:', data)
    mutate(
      {id, status: 'rejected', ...data},
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['offers-history']})
        },
      },
    )
  }

  const onCompleted = () => {
    mutate(
      {id, status: 'completed'},
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
      <Text className="mt-4 text-lg !text-primary-300">
        {`${translate('phone')}: ${phoneNumber}`}
      </Text>
      <Divider className="my-4" />
      {isReject ? (
        <View>
          <ControlledInput
            control={control}
            name="note"
            multiline
            placeholder={translate('pending.reject-note')}
          />
          <Button label={translate('save')} onPress={handleSubmit(onSaveNote)} />
        </View>
      ) : (
        <View className={styles.itemContainer()}>
          <Button label={translate('pending.complete')} onPress={onCompleted} />
          <Button
            label={translate('pending.reject')}
            variant="destructive"
            onPress={() => setIsReject(true)}
          />
        </View>
      )}
    </View>
  )
}
