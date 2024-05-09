import {zodResolver} from '@hookform/resolvers/zod'
import {Stack, useRouter} from 'expo-router'
import React, {useEffect} from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {useForm} from 'react-hook-form'
import {showMessage} from 'react-native-flash-message'
import {z} from 'zod'

import {usePaymentMethods, useUpdateUser} from '@/api'
import {translate, useAuth} from '@/core'
import {Button, EmptyList, FocusAwareStatusBar, Input, showErrorMessage, Text, View} from '@/ui'
import {JCBCard} from '@/ui/icons/payments/jscb'
import {MasterCard} from '@/ui/icons/payments/mastercard'
import {UnionPayCard} from '@/ui/icons/payments/union-pay'
import {VisaCard} from '@/ui/icons/payments/visa'

const Schema = z.object({
  email: z.string().email(translate('login.form.error-email')),
})

type FormProps = z.infer<typeof Schema>

export default function PaymentMethods() {
  const user = useAuth.use.user()
  const {data, isLoading, isError} = usePaymentMethods()

  const {control, handleSubmit, reset} = useForm<FormProps>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(Schema),
  })

  useEffect(() => {
    reset({
      email: user?.email,
    })
  }, [reset, user?.email])

  const onSubmit: SubmitHandler<FormProps> = data => {
    // console.log('🚀 ~ onSubmit ~ data:', data)
  }

  if (isLoading || !data || data?.length === 0) {
    return (
      <>
        <FocusAwareStatusBar />
        <Stack.Screen options={{title: translate('payments'), headerBackTitleVisible: false}} />
        <EmptyList isLoading={isLoading} />
      </>
    )
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <FocusAwareStatusBar />
        <Stack.Screen options={{title: translate('payments'), headerBackTitleVisible: false}} />
        <Text tx="error-data" className="text-center" />
      </View>
    )
  }

  return (
    <>
      <FocusAwareStatusBar />
      <Stack.Screen options={{title: translate('payments'), headerBackTitleVisible: false}} />
      <View className="mx-auto flex-1 items-center gap-4 px-4 pt-8">
        {data?.map(({exp_month, exp_year, last4, type}) => (
          <View className="w-full flex-row gap-3">
            <Input
              label="Card number"
              startContent={<IconCard type={type} />}
              classNames={{input: 'w-[12rem]'}}
              placeholder={`#### #### #### ${last4}`}
            />
            <Input
              label="Expiry date"
              placeholder="MM/YY"
              value={`${exp_month < 10 ? '0' + exp_month : exp_month}/${exp_year}`}
            />
          </View>
        ))}
      </View>
    </>
  )
}

function IconCard({type}: {type: string}) {
  switch (type) {
    case 'unionpay':
      return <UnionPayCard width={22} height={19} />
    // case 'mastercard':
    //   return <MasterCard width={22} height={19} />
    case 'visa':
      return <VisaCard width={22} height={19} />

    default:
      return null
  }
}
