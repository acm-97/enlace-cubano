import {Button, FormFieldControl, InputField} from '@/components'
import {tw} from '@/lib/settings'
import {Box} from '@gluestack-ui/themed'
import {zodResolver} from '@hookform/resolvers/zod'
import propTypes from 'prop-types'
import {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

const Schema = z.object({
  firstName: z.string().min(1, 'Inserte su nombre.'),
  lastName: z.string().min(1, 'Inserte sus apellidos.'),
})

function NameForm({navigation}) {
  const {control, handleSubmit, reset} = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(Schema),
  })

  useEffect(() => {
    reset({
      firstName: 'Alejandro',
      lastName: 'Cabrera Mena',
    })
  }, [])

  const onSubmit = data => {
    console.log('🚀 ~ onSubmit ~ data:', data)
  }

  return (
    <Box p="$4" gap="$2">
      <FormFieldControl control={control} Component={InputField} label="Nombre" name="firstName" />
      <FormFieldControl
        control={control}
        Component={InputField}
        label="Apellidos"
        name="lastName"
      />
      <Button label="Actualizar" onPress={handleSubmit(onSubmit)} w="$full" mt="$10" />
      <Button variant="link" label="Cancelar" onPress={() => navigation.goBack()} />
    </Box>
  )
}

NameForm.propTypes = {
  navigation: propTypes.object,
}

NameForm.defaultProps = {}

NameForm.displayName = 'NameForm'

export default NameForm
