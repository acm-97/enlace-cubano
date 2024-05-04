import {zodResolver} from '@hookform/resolvers/zod'
import {Stack} from 'expo-router'
import type {SubmitHandler} from 'react-hook-form'
import {useForm} from 'react-hook-form'
import {showMessage} from 'react-native-flash-message'
import {z} from 'zod'

import {useUpdatePassword} from '@/api'
import {translate, useAuth} from '@/core'
import {Button, ControlledInput, FocusAwareStatusBar, showErrorMessage, Text, View} from '@/ui'

const Schema = z
  .object({
    currentPassword: z.string().min(8, translate('login.form.required-password')),
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .refine(schema => /^(?=[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(schema.newPassword), {
    message: translate('signup.form.error-password'),
    path: ['newPassword'],
  })
  // .refine(schema => /^(?=[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(schema.confirmPassword), {
  //   message: 'La contraseña no es valida',
  //   path: ['confirmPassword'],
  // })
  .refine(({newPassword, confirmPassword}) => newPassword === confirmPassword, {
    message: translate('signup.form.error-confirm-password'),
    path: ['confirmPassword'],
  })

type FormProps = z.infer<typeof Schema>

export default function PasswordForm() {
  const user = useAuth.use.user()
  const {mutate, isLoading} = useUpdatePassword()

  const {control, handleSubmit, reset} = useForm<FormProps>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(Schema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit: SubmitHandler<FormProps> = data => {
    console.log('🚀 ~ onSubmit ~ data:', data)
    const {confirmPassword, ...rest} = data
    mutate(
      {...rest, id: user?.id},
      {
        onSuccess: () => {
          // @ts-ignore
          showMessage({
            message: translate('settings.account.email-success'),
            type: 'success',
          })
        },
        onError: ({response}) =>
          // @ts-ignore
          showErrorMessage(response?.data?.message ?? 'Current passwords do not match'),
      },
    )
  }

  return (
    <>
      <FocusAwareStatusBar />
      <Stack.Screen options={{title: translate('password'), headerBackTitleVisible: false}} />

      <View className="flex-1 gap-5 p-4">
        <Text tx="settings.account.password-description" className="text-lg" />
        <ControlledInput
          control={control}
          label={translate('currentPassword')}
          name="currentPassword"
        />
        <ControlledInput
          control={control}
          label={translate('settings.account.new-password')}
          name="newPassword"
        />
        <ControlledInput
          control={control}
          label={translate('settings.account.confirm-password')}
          name="confirmPassword"
        />
        <Button
          label={translate('update')}
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
          className="mt-10"
        />
      </View>
    </>
  )
}
