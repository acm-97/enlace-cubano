import propTypes from 'prop-types'
import {FormFieldControl, Text, InputField, Button} from '@/components'
import {Box, Divider, Heading} from '@gluestack-ui/themed'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {tw} from '@/lib/settings'

const Schema = z
  .object({
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .refine(schema => /^(?=[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(schema.newPassword), {
    message: 'La contraseña no es valida',
    path: ['newPassword'],
  })
  // .refine(schema => /^(?=[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(schema.confirmPassword), {
  //   message: 'La contraseña no es valida',
  //   path: ['confirmPassword'],
  // })
  .refine(({newPassword, confirmPassword}) => newPassword === confirmPassword, {
    message: 'Las contraseñas deben coindidir.',
    path: ['confirmPassword'],
  })

function PasswordForm({navigation}) {
  const {control, handleSubmit, watch, formState} = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(Schema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = data => {
    console.log('🚀 ~ onSubmit ~ data:', data)
  }

  return (
    <Box p="$4" gap="$4">
      <Heading size="xl">Contraseña</Heading>
      <Text style={tw`text-sm`}>
        Utilice una contraseña de al menos 8 caracteres que empiece por una letra mayúscula y
        contenga al menos un número y un carácter especial.
      </Text>

      <FormFieldControl
        control={control}
        Component={InputField}
        label="Nueva Contraseña"
        name="newPassword"
        type="password"
      />
      <FormFieldControl
        control={control}
        Component={InputField}
        label="Confirmar Contraseña"
        name="confirmPassword"
        type="password"
      />
      <Button
        label="Actualizar"
        isDisabled={!formState.isDirty}
        w="$full"
        mt="$6"
        onPress={handleSubmit(onSubmit)}
      />
      <Button variant="link" label="Cancelar" onPress={() => navigation.goBack()} />
    </Box>
  )
}

PasswordForm.propTypes = {
  navigation: propTypes.object,
}

PasswordForm.defaultProps = {}

PasswordForm.displayName = 'PasswordForm'

export default PasswordForm
