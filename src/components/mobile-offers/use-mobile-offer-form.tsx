import {zodResolver} from '@hookform/resolvers/zod'
import {useFocusEffect, useIsFocused} from '@react-navigation/native'
import {useCallback, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import type {MobileOffer} from '@/api'
import {translate} from '@/core'

const Schema = z
  .object({
    price: z.number(),
    offerId: z.string(),
    phoneNumber: z.string().min(1, translate('offers.mobile.forms.error-phone')),
  })
  .refine(
    schema => {
      const phoneNumber = schema.phoneNumber.toString().replace(/[^0-9+]/g, '')
      return (phoneNumber.includes('+53') && phoneNumber.length === 11) || phoneNumber.length === 8
    },
    {message: translate('offers.mobile.forms.refine-error-phone'), path: ['phoneNumber']},
  )

type FormProps = z.infer<typeof Schema>

export default function useMobileOfferForm(offer: MobileOffer | undefined, params: any) {
  const {reset, handleSubmit, ...form} = useForm<FormProps>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(Schema),
  })

  useEffect(() => {
    reset({
      price: offer?.price ? +offer?.price : 0,
      offerId: '' + offer?.id,
      phoneNumber: params.phoneNumber ?? '',
    })
  }, [offer, reset, params.phoneNumber])

  return {
    ...form,
    handleSubmit: handleSubmit(data => console.log(data)),
    reset,
  }
}
