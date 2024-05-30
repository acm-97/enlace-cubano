import {Env} from '@env'
import {useStripe} from '@stripe/stripe-react-native'
import Constants from 'expo-constants'
import * as Linking from 'expo-linking'
import {useRouter} from 'expo-router'
import {useEffect, useState} from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {showMessage} from 'react-native-flash-message'

import {type MobileOffer, usePaymentSheet} from '@/api'
import type {OfferType} from '@/api/offers'
import {useAddOffer} from '@/api/offers'
import type {CartItem} from '@/app/cart'
import {translate, useAuth} from '@/core'
import {useCart} from '@/hooks/use-cart'
import {Button, colors, showErrorMessage} from '@/ui'

type Props = any

export default function CardPayButton({modal, ...props}: Props) {
  const user = useAuth.use.user()
  const {initPaymentSheet, presentPaymentSheet} = useStripe()
  const [loading, setLoading] = useState(false)
  const {mutate} = useAddOffer()
  const {replace} = useRouter()
  const {mutate: getPaymentSheet} = usePaymentSheet()
  const items = useCart.use.items()
  const resetItems = useCart.use.resetItems()

  const openPaymentSheet = async () => {
    // console.log('🚀 ~ openPaymentSheet ~ payload:', payload)
    setLoading(true)
    const amount = items.reduce((acc, curr) => acc + curr.default_price.unit_amount, 0)
    getPaymentSheet(
      {amount},
      {
        onSuccess: async intent => {
          if (intent && user) {
            const {error: intentError} = await initPaymentSheet({
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
                Constants.appOwnership === 'expo'
                  ? Linking.createURL('/--/')
                  : Linking.createURL('/')
              }`,
              appearance: {
                colors: {
                  primary: colors.primary[500],
                },
              },
            })
            if (intentError) {
              showErrorMessage(intentError?.message)
              return
            }

            const {error} = await presentPaymentSheet()

            if (error) {
              showErrorMessage(error.message)
            } else {
              const _items = items.map(({phoneNumber, id, description, colored_parts}) => ({
                offerId: id,
                phoneNumber,
                amount,
                description,
                colored_parts: colored_parts ?? [],
              }))
              mutate(
                {items: _items},
                {
                  onSuccess: () => {
                    showMessage({message: 'Your payment was confirmed!', type: 'success'})
                    replace('/mobile/')
                    resetItems()
                  },
                  onError: e => showErrorMessage(e.message ?? e),
                },
              )
            }
          }
        },
      },
    )

    setLoading(false)
  }

  return (
    <Button disabled={loading} label={translate('payCard')} onPress={openPaymentSheet} {...props} />
  )
}
