import React, {useEffect, useRef, useState} from 'react'
import Animated from 'react-native-reanimated'

import {translate} from '@/core'
import {useCart} from '@/hooks/use-cart'
import {contactsState} from '@/hooks/use-contacts'
import {PhoneInput, Text, View} from '@/ui'

type Props = {rStyle?: any}
export default function PhoneSection({rStyle}: Props) {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const selectedPhone = contactsState(state => state.selectedPhone)
  const setSelectedPhone = contactsState(state => state.setSelectedPhone)

  const onChange = (value: string) => {
    error && setError('')
    setPhone(value)
  }

  const onBlur = () => {
    let phoneNumber = phone.toString().replace(/[^0-9+]/g, '')
    const isValid =
      (phoneNumber.includes('+53') && phoneNumber.length === 11) || phoneNumber.length === 8

    if (isValid) {
      setSelectedPhone(phoneNumber.replace('+53', ''))
    } else setError(translate('offers.mobile.forms.refine-error-phone'))
  }

  return (
    <Animated.View className="w-full items-center" style={[rStyle]}>
      <PhoneInput
        defaultValue={selectedPhone ?? ''}
        value={selectedPhone ?? ''}
        onChangeFormattedText={onChange}
        error={error}
        defaultCode="CU"
        onBlur={onBlur}
        showContactsIcon
      />
    </Animated.View>
  )
}
