import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {useFocusEffect, useIsFocused} from '@react-navigation/native'
import {useCallback, useEffect} from 'react'

const Schema = z
  .object({
    price: z.number(),
    rechargeId: z.string(),
    phoneNumber: z.string().min(1, 'Ingrese un numero de teléfono'),
  })
  .refine(
    schema => {
      const phoneNumber = schema.phoneNumber.toString().replace(/[^0-9+]/g, '')
      return (phoneNumber.includes('+53') && phoneNumber.length === 11) || phoneNumber.length === 8
    },
    {message: 'Ingese un numero valido (+53 XXXXXXXX)', path: ['phoneNumber']},
  )

export default function useMovilRechargeForm(recharge) {
  const {reset, ...form} = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(Schema),
  })

  useEffect(() => {
    reset({
      price: recharge?.price,
      rechargeId: recharge?.id ?? '',
      phoneNumber: '',
    })
  }, [recharge])

  return {
    ...form,
    reset,
  }
}
