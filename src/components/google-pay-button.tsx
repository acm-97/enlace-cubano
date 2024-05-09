import {PlatformPay, PlatformPayButton, usePlatformPay} from '@stripe/stripe-react-native'
import {useEffect, useState} from 'react'

import {useAddPaymentIntent} from '@/api/mobile-offers/use-add-payment-intent'
import {useSelectedTheme} from '@/core'
import {colors, showErrorMessage} from '@/ui'

type Props = any

export default function GooglePayButton({handleSubmit, intent, ...props}: Props) {
  const {isPlatformPaySupported, confirmPlatformPayPayment} = usePlatformPay()
  const [isSupported, setIsSupported] = useState(false)
  const {selectedTheme} = useSelectedTheme()

  useEffect(() => {
    ;(async function () {
      const flag = await isPlatformPaySupported({googlePay: {testEnv: true}})
      setIsSupported(flag)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pay = async () => {
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
    showErrorMessage('The payment was confirmed successfully.')
  }

  console.log('🚀 ~ GooglePayButton ~ isSupported:', isSupported)
  // if (!isSupported) {
  //   return
  // }

  return (
    <PlatformPayButton
      type={PlatformPay.ButtonType.Pay}
      appearance={selectedTheme === 'dark' ? 0 : 2}
      onPress={handleSubmit(pay)}
      style={{
        width: '100%',
        height: 42,
      }}
    />
  )
}
