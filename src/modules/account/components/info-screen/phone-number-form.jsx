import {Button, FormFieldControl, InputField, PhoneInputField, Text} from '@/components'
import {tw} from '@/lib/settings'
import {Box} from '@gluestack-ui/themed'
import {zodResolver} from '@hookform/resolvers/zod'
import propTypes from 'prop-types'
import {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {StatusBar, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {z} from 'zod'

const Schema = z.object({
  phoneNumber: z.string().min(1, 'Inserte su numero.'),
})

function PhoneNumberForm({navigation}) {
  const {control, handleSubmit, reset} = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(Schema),
  })

  useEffect(() => {
    reset({
      phoneNumber: '',
    })
  }, [])

  const onSubmit = data => {
    console.log('🚀 ~ onSubmit ~ data:', data)
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar />
      <Box p="$4" gap="$5">
        <Text>
          Su número de teléfono puede utilizarse para ayudarle a iniciar sesión y a recuperar su
          cuenta.
        </Text>
        <FormFieldControl
          control={control}
          Component={PhoneInputField}
          label="Numero Telefónico"
          name="phoneNumber"
          initialCountry="us"
          keyboardType="number-pad"
        />
        <Button label="Actualizar" onPress={handleSubmit(onSubmit)} w="$full" mt="$10" />
        <Button variant="link" label="Cancelar" onPress={() => navigation.goBack()} />
      </Box>
    </View>
  )
}

PhoneNumberForm.propTypes = {
  navigation: propTypes.object,
}

PhoneNumberForm.defaultProps = {}

PhoneNumberForm.displayName = 'PhoneNumberForm'

export default PhoneNumberForm
