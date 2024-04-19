import {Button, FormFieldControl, InputField, Text} from '@/components'
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
  email: z.string().email('Este correo no es válido.'),
})

function EmailForm({navigation}) {
  const {control, handleSubmit, reset} = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(Schema),
  })

  useEffect(() => {
    reset({
      email: '',
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
          Su correo electrónico puede utilizarse para ayudarle a iniciar sesión y a recuperar su
          cuenta.
        </Text>
        <FormFieldControl
          control={control}
          Component={InputField}
          label="Correo electrónico"
          name="email"
          helperText="Se enviará un código de verificación a este correo electrónico"
        />
        <Button label="Actualizar" onPress={handleSubmit(onSubmit)} w="$full" mt="$10" />
        <Button variant="link" label="Cancelar" onPress={() => navigation.goBack()} />
      </Box>
    </View>
  )
}

EmailForm.propTypes = {
  navigation: propTypes.object,
}

EmailForm.defaultProps = {}

EmailForm.displayName = 'EmailForm'

export default EmailForm
