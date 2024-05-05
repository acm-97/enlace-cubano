import {HeaderBackButton} from '@react-navigation/elements'
import {Stack, useLocalSearchParams, useRouter} from 'expo-router'
import * as React from 'react'
import type {FieldError} from 'react-hook-form'

import {useMobileOffer} from '@/api'
import useMobileOfferForm from '@/components/mobile-offers/use-mobile-offer-form'
import {translate} from '@/core'
import {ActivityIndicator, Button, FocusAwareStatusBar, PhoneInput, Text, View} from '@/ui'

type Props = {}
export default function CompName({}: Props) {
  const params = useLocalSearchParams<{id: string}>()
  const {data, isLoading, isError} = useMobileOffer({variables: {id: params.id}})
  const {handleSubmit, formState, watch, setValue} = useMobileOfferForm(data)

  if (isLoading) {
    return (
      <View className="flex-1 justify-center  p-3">
        <Stack.Screen options={{title: 'Pagar Oferta', headerLeft: CustomHeader}} />
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    )
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Stack.Screen options={{title: 'Pagar Oferta', headerLeft: CustomHeader}} />
        <FocusAwareStatusBar />
        <Text tx="error-data" className="text-center" />
      </View>
    )
  }

  return (
    <View className="flex-1 p-3 pt-8">
      <Stack.Screen options={{title: 'Pagar Oferta', headerLeft: CustomHeader}} />
      <FocusAwareStatusBar />

      <View className="mb-10 overflow-hidden rounded-lg border border-neutral-300  bg-white p-4 dark:border-neutral-700  dark:bg-neutral-900">
        <Text className="text-lg ">{data?.description}</Text>
      </View>
      <PhoneInput
        value={watch('phoneNumber')}
        onChangeFormattedText={value => setValue('phoneNumber', value)}
        error={formState.errors.phoneNumber?.message}
        defaultCode="CU"
      />
      <Button label={translate('offers.mobile.open-contacts')} variant="ghost" onPress={() => {}} />
      <Button
        label={translate('pay') + ` $${data?.price}`}
        variant="secondary"
        fullWidth={false}
        className="mt-6"
        onPress={handleSubmit}
      />
    </View>
  )
}

function CustomHeader() {
  const {replace} = useRouter()
  return <HeaderBackButton labelVisible={false} onPress={() => replace('/mobile/')} />
}
