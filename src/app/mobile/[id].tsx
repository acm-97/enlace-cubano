import {HeaderBackButton} from '@react-navigation/elements'
import {Stack, useLocalSearchParams, useRouter} from 'expo-router'
import React, {useEffect} from 'react'
import {twMerge} from 'tailwind-merge'

import {useMobileOffer, usePaymentSheet} from '@/api'
import CardPayButton from '@/components/card-pay-button'
import GooglePayButton from '@/components/google-pay-button'
import useMobileOfferForm from '@/components/mobile-offers/use-mobile-offer-form'
import {translate} from '@/core'
import {ActivityIndicator, Button, FocusAwareStatusBar, PhoneInput, Text, View} from '@/ui'

type Props = {}
export default function MobileOffer({}: Props) {
  const params = useLocalSearchParams<{id: string; phoneNumber?: string}>()
  const {data, isLoading, isError} = useMobileOffer({variables: {id: params.id}})
  const {handleSubmit, formState, watch, setValue} = useMobileOfferForm(data, params)
  const {replace} = useRouter()

  const {data: intent, mutate} = usePaymentSheet()

  const headerLeft = () => (
    <HeaderBackButton labelVisible={false} onPress={() => replace('/mobile/')} />
  )

  useEffect(() => {
    data && mutate({amount: data.default_price.unit_amount})
  }, [data, mutate])

  if (isLoading) {
    return (
      <View className="flex-1 justify-center  p-3">
        <Stack.Screen options={{title: 'Pagar Oferta', headerLeft}} />
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    )
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Stack.Screen options={{title: 'Pagar Oferta', headerLeft}} />
        <FocusAwareStatusBar />
        <Text tx="error-data" className="text-center" />
      </View>
    )
  }

  return (
    <View className="flex-1 p-3 pt-8">
      <Stack.Screen options={{title: 'Pagar Oferta', headerLeft}} />
      <FocusAwareStatusBar />

      <View className="mb-10 overflow-hidden rounded-lg border border-neutral-300  bg-white p-4 dark:border-neutral-700  dark:bg-neutral-900">
        <View className="flex-row flex-wrap gap-1">
          {data.description_parts.map((part, i) => (
            <Text
              key={`description-${i}`}
              className={twMerge(
                'text-lg',
                data.colored_parts.includes(i.toString()) && 'text-primary-300',
              )}
            >
              {part}
            </Text>
          ))}
        </View>
      </View>
      <PhoneInput
        defaultValue={params.phoneNumber ?? ''}
        value={watch('phoneNumber')}
        onChangeFormattedText={value => setValue('phoneNumber', value)}
        error={formState.errors.phoneNumber?.message}
        defaultCode="CU"
      />
      <Button
        label={translate('offers.mobile.open-contacts')}
        variant="ghost"
        onPress={() => replace({pathname: '/mobile-contacts', params: {id: params.id}})}
        fullWidth={false}
      />
      <CardPayButton
        label={translate('payCard')}
        // variant="outline"
        // fullWidth={false}
        className="!mt-24 mb-4 !text-[14rem] !font-semibold"
        handleSubmit={handleSubmit}
        intent={intent}
        size="lg"
      />
      <GooglePayButton handleSubmit={handleSubmit} intent={intent} />
    </View>
  )
}
