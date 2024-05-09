import {zodResolver} from '@hookform/resolvers/zod'
import {Stack, useRouter} from 'expo-router'
import {useEffect} from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {useForm} from 'react-hook-form'
import {showMessage} from 'react-native-flash-message'
import {z} from 'zod'

import {useUpdateUser} from '@/api'
import {translate, useAuth} from '@/core'
import {Button, ControlledInput, FocusAwareStatusBar, showErrorMessage, Text, View} from '@/ui'

const Schema = z.object({
  email: z.string().email(translate('login.form.error-email')),
})

type FormProps = z.infer<typeof Schema>

export default function EmailForm() {
  const user = useAuth.use.user()
  const saveUser = useAuth.use.saveUser()
  const {mutate, isLoading} = useUpdateUser()

  const {control, handleSubmit, reset} = useForm<FormProps>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(Schema),
  })

  useEffect(() => {
    reset({
      email: user?.email,
    })
  }, [reset, user?.email])

  const onSubmit: SubmitHandler<FormProps> = data => {
    // console.log('🚀 ~ onSubmit ~ data:', data)
    mutate(
      {...data, id: user?.id},
      {
        onSuccess: () => {
          // @ts-ignore
          saveUser({...user, email: data.email})
          showMessage({
            message: translate('settings.account.email-success'),
            type: 'success',
          })
        },
        // @ts-ignore
        onError: ({response}) => showErrorMessage(response?.data?.message),
      },
    )
  }

  return (
    <>
      <FocusAwareStatusBar />
      <Stack.Screen options={{title: translate('email'), headerBackTitleVisible: false}} />

      <View className="flex-1 gap-5 p-4">
        <Text tx="settings.account.email-description" className="text-lg" />
        <View>
          <ControlledInput
            control={control}
            label={translate('email')}
            name="email"
            classNames={{container: 'mb-1'}}
          />
          <Text tx="settings.account.email-helper" className="text-sm opacity-70" />
        </View>
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
