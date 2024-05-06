import {HeaderBackButton} from '@react-navigation/elements'
import {Stack, useFocusEffect, useLocalSearchParams, useRouter} from 'expo-router'
import React, {useEffect} from 'react'
import type {FieldError} from 'react-hook-form'

import {useMobileOffer} from '@/api'
import useMobileOfferForm from '@/components/mobile-offers/use-mobile-offer-form'
import {translate} from '@/core'
import {ActivityIndicator, Button, FocusAwareStatusBar, PhoneInput, Text, View} from '@/ui'

type Props = {}
export default function MobileOffer({}: Props) {
  const params = useLocalSearchParams<{id: string; phoneNumber?: string}>()
  const {data, isLoading, isError} = useMobileOffer({variables: {id: params.id}})
  const {handleSubmit, formState, watch, setValue} = useMobileOfferForm(data, params)
  const {replace} = useRouter()

  const header = () => <HeaderBackButton labelVisible={false} onPress={() => replace('/mobile/')} />

  if (isLoading) {
    return (
      <View className="flex-1 justify-center  p-3">
        <Stack.Screen options={{title: 'Pagar Oferta', headerLeft: header}} />
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    )
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Stack.Screen options={{title: 'Pagar Oferta', headerLeft: header}} />
        <FocusAwareStatusBar />
        <Text tx="error-data" className="text-center" />
      </View>
    )
  }

  return (
    <View className="flex-1 p-3 pt-8">
      <Stack.Screen options={{title: 'Pagar Oferta', headerLeft: header}} />
      <FocusAwareStatusBar />

      <View className="mb-10 overflow-hidden rounded-lg border border-neutral-300  bg-white p-4 dark:border-neutral-700  dark:bg-neutral-900">
        <Text className="text-lg ">{data?.description}</Text>
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
      />
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
