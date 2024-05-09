import {Env} from '@env'
import {useStripe} from '@stripe/stripe-react-native'
import Constants from 'expo-constants'
import * as Linking from 'expo-linking'
import {useRouter} from 'expo-router'
import {useEffect, useState} from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {showMessage} from 'react-native-flash-message'

import type {MobileOffer} from '@/api'
import type {OfferType} from '@/api/offers'
import {useAddOffer} from '@/api/offers'
import {useAuth} from '@/core'
import {Button, colors, showErrorMessage} from '@/ui'

type Props = any

export default function CardPayButton({
  handleSubmit,
  intent,
  amount,
  description,
  colored_parts,
  disabled,
  ...props
}: Props) {
  const user = useAuth.use.user()
  const {initPaymentSheet, presentPaymentSheet} = useStripe()
  const [loading, setLoading] = useState(false)
  const {mutate} = useAddOffer()
  const {replace} = useRouter()

  const initializePaymentSheet = async () => {
    setLoading(true)
    if (intent && user) {
      const {error} = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        customerId: user.customerId,
        customerEphemeralKeySecret: intent.ephemeralKey,
        paymentIntentClientSecret: intent.clientSecret,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: `${user?.firstName} ${user?.lastName}`,
        },
        returnURL: `${Env.SCHEME}://${
          Constants.appOwnership === 'expo' ? Linking.createURL('/--/') : Linking.createURL('/')
        }`,
        appearance: {
          colors: {
            primary: colors.primary[500],
          },
        },
      })
      if (error) {
        showErrorMessage(error?.message)
      }
    }

    setLoading(false)
  }

  const openPaymentSheet: SubmitHandler<OfferType> = async payload => {
    // console.log('🚀 ~ openPaymentSheet ~ payload:', payload)
    const {error} = await presentPaymentSheet()

    if (error) {
      showErrorMessage(error.message)
    } else {
      showMessage({message: 'Your payment was confirmed!', type: 'success'})
      const _payload = {
        ...payload,
        amount,
        description,
        colored_parts: colored_parts ?? [],
      }
      mutate(_payload, {
        onSuccess: () => {
          replace('/mobile/')
        },
      })
    }
  }

  useEffect(() => {
    initializePaymentSheet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intent, user])

  return (
    <Button
      disabled={loading || !intent || disabled}
      onPress={handleSubmit(openPaymentSheet)}
      {...props}
    />
  )
}
