import {
  PlatformPay,
  PlatformPayButton as PlatformPayButtonN,
  usePlatformPay,
} from '@stripe/stripe-react-native'
import {useRouter} from 'expo-router'
import {useColorScheme} from 'nativewind'
import {useEffect, useState} from 'react'
import type {SubmitHandler} from 'react-hook-form'

import type {OfferType} from '@/api/offers'
import {useAddOffer} from '@/api/offers'
import {colors, showErrorMessage} from '@/ui'

type Props = any

export default function PlatformPayButton({
  handleSubmit,
  intent,
  amount,
  description,
  colored_parts,
  ...props
}: Props) {
  const {isPlatformPaySupported, confirmPlatformPayPayment} = usePlatformPay()
  const [isSupported, setIsSupported] = useState(false)
  const {colorScheme} = useColorScheme()
  const {mutate} = useAddOffer()
  const {replace} = useRouter()

  useEffect(() => {
    ;(async function () {
      const flag = await isPlatformPaySupported({googlePay: {testEnv: true}})
      setIsSupported(flag)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pay: SubmitHandler<OfferType> = async payload => {
    const {error} = await confirmPlatformPayPayment(intent.clientSecret, {
      googlePay: {
        testEnv: true,
        merchantName: 'My merchant name',
        merchantCountryCode: 'US',
        currencyCode: 'USD',
        billingAddressConfig: {
          format: PlatformPay.BillingAddressFormat.Full,
          isPhoneNumberRequired: true,
          isRequired: true,
        },
      },
    })

    if (error) {
      showErrorMessage(error.message)
      // Update UI to prompt user to retry payment (and possibly another payment method)
      return
    }
    showErrorMessage('Your payment was confirmed!.')
    const _payload = {
      ...payload,
      amount,
      description,
      colored_parts: colored_parts ?? [],
    }
    // mutate(_payload, {
    //   onSuccess: () => {
    //     replace('/mobile/')
    //   },
    // })
  }

  // if (!isSupported) {
  //   return
  // }

  return (
    <PlatformPayButtonN
      type={PlatformPay.ButtonType.Pay}
      appearance={colorScheme === 'dark' ? 0 : 2}
      onPress={handleSubmit(pay)}
      style={{
        width: '100%',
        height: 42,
      }}
      {...props}
    />
  )
}
