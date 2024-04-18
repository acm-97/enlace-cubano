import React, {useEffect, useState} from 'react'
import propTypes from 'prop-types'
import {Box, Text, Card, Input} from '@gluestack-ui/themed'
import {tw} from '@/lib/settings'
import {useTheme} from '@/hooks'
import {StyleSheet} from 'react-native'
import HTMLView from 'react-native-htmlview'
import {useMovilRechargeForm} from '../../hooks'
import FormFieldControl from '@/components/Form/FormFieldControl'
import {Button, InputField} from '@/components'
import * as Contacts from 'expo-contacts'

function RechargeFormScreen({navigation, route: {params}}) {
  const {theme} = useTheme()
  const {control, setValue, handleSubmit} = useMovilRechargeForm(params?.recharge)
  const [contacts, setContacts] = useState([])

  const styles = StyleSheet.create({
    div: {
      color: theme === 'dark' ? 'white' : '#000000b2',
    },
  })

  useEffect(() => {
    ;(async () => {
      const {status} = await Contacts.requestPermissionsAsync()
      if (status === 'granted') {
        const {data} = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Emails,
            Contacts.Fields.FirstName,
            Contacts.Fields.LastName,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Image,
            Contacts.Fields.ImageAvailable,
          ],
        })

        if (data.length > 0) {
          setContacts(data)
          // console.log(data[0])
        }
      }
    })()
  }, [])

  const onSubmit = data => {
    console.log('🚀 ~ onSubmit ~ data:', data)
  }

  return (
    <Box style={tw`w-full h-full px-4 py-6`}>
      <Card size="md" variant="elevated" style={tw`w-full p-4`}>
        <HTMLView
          value={`<div>${params?.recharge?.description}</div>`}
          style={tw`w-full`}
          stylesheet={styles}
        />
      </Card>
      <Box style={tw`w-full mt-10 mb-7`}>
        <FormFieldControl
          control={control}
          Component={InputField}
          label="Número de teléfono"
          name="phoneNumber"
          type="text"
          isRequired
          style={tw`mb-0`}
        />
        <Button
          variant="link"
          label="Buscar entre los contactos"
          labelProps={{style: tw`text-orange-500`}}
          onPress={() => navigation.navigate('Contacts', {contacts, setValue})}
        />
      </Box>
      <Button label={`Pagar $${params?.recharge?.price}`} onPress={handleSubmit(onSubmit)} />
    </Box>
  )
}

RechargeFormScreen.propTypes = {
  route: propTypes.object,
  navigation: propTypes.object,
}

RechargeFormScreen.defaultProps = {}

RechargeFormScreen.displayName = 'RechargeFormScreen'

export default RechargeFormScreen
