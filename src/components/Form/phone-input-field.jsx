import React, {useState} from 'react'
import {View, TextInput, Alert, StyleSheet} from 'react-native'
import PhoneInput from 'react-native-phone-input'
import CountryPicker from 'react-native-country-picker-modal'
import {tw} from '@/lib/settings'
import propTypes from 'prop-types'

function PhoneInputField({style, onChange, countryPickerProps, ...props}) {
  const [countryCode, setCountryCode] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countryPickerVisible, setCountryPickerVisible] = useState(false)

  const onSelectCountry = country => {
    setCountryCode(country.cca2)
    setSelectedCountry(country)
    setCountryPickerVisible(false)
  }

  const toggleCountryPicker = () => {
    setCountryPickerVisible(!countryPickerVisible)
  }

  return (
    <>
      <PhoneInput
        onPressFlag={toggleCountryPicker}
        autoFormat
        {...props}
        onChangePhoneNumber={onChange}
        style={tw.style('h-10 bg-secondary-100 dark:bg-warmGray-700 px-3 rounded-md', style)}
      />
      {countryPickerVisible && (
        <CountryPicker
          {...countryPickerProps}
          withFilter
          withFlagButton={false}
          withCountryNameButton={false}
          onSelect={onSelectCountry}
          onClose={() => setCountryPickerVisible(false)}
          visible={countryPickerVisible}
          containerButtonStyle={tw.style('hidden', countryPickerProps?.style)}
          closeButtonImageStyle={tw.style('w-5 h-5', countryPickerProps?.style)}
        />
      )}
    </>
  )
}

PhoneInputField.propTypes = {
  onChange: propTypes.func,
  style: propTypes.object,
  countryPickerProps: propTypes.object,
}

PhoneInputField.displayName = 'PhoneInputField'

export default PhoneInputField
