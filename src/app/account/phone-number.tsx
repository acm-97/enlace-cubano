import {zodResolver} from '@hookform/resolvers/zod'
import {Stack, useRouter} from 'expo-router'
import {useEffect} from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {useForm} from 'react-hook-form'
import {showMessage} from 'react-native-flash-message'
import {z} from 'zod'

import {useUpdateUser} from '@/api'
import {translate, useAuth} from '@/core'
import {Button, FocusAwareStatusBar, PhoneInput, Text, View} from '@/ui'

const Schema = z
  .object({
    phoneNumber: z.object(
      {
        code: z.string(),
        country: z.string(),
        number: z.string().min(1, translate('settings.account.required-phone')),
      },
      {required_error: translate('settings.account.required-phone')},
    ),
  })
  .refine(
    schema => {
      const n = '+1' + schema.phoneNumber.code + schema.phoneNumber.number
      return /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(n)
    },
    {
      message: translate('settings.account.required-phone'),
      path: ['phoneNumber'],
    },
  )

type FormProps = z.infer<typeof Schema>

export default function PhoneNumberForm() {
  const user = useAuth.use.user()
  const saveUser = useAuth.use.saveUser()
  const {mutate, isLoading} = useUpdateUser()

  const {watch, setValue, formState, handleSubmit, reset} = useForm<FormProps>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(Schema),
  })

  useEffect(() => {
    reset({
      phoneNumber: {
        number: user?.phoneNumber?.number ?? '',
        country: user?.phoneNumber?.country ?? 'US',
        code: user?.phoneNumber?.code ?? '1',
      },
    })
  }, [reset, user?.phoneNumber])

  const onSubmit: SubmitHandler<FormProps> = data => {
    console.log('🚀 ~ onSubmit ~ data:', data)
    mutate(
      {...data, id: user?.id},
      {
        onSuccess: () => {
          // @ts-ignore
          saveUser({...user, phoneNumber: data.phoneNumber})
          showMessage({
            message: translate('settings.account.phone-success'),
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
      <Stack.Screen options={{title: translate('phone'), headerBackTitleVisible: false}} />

      <View className="flex-1 gap-5 p-4">
        <Text tx="settings.account.phone-description" className="text-lg" />
        <PhoneInput
          // @ts-ignore
          defaultCode={user?.phoneNumber.country ?? 'US'}
          defaultValue={user?.phoneNumber.number}
          value={watch('phoneNumber.number')}
          onChangeText={value => setValue('phoneNumber.number', value)}
          onChangeCountry={value => {
            setValue('phoneNumber.code', value.callingCode[0])
            setValue('phoneNumber.country', value.cca2)
          }}
          error={formState.errors.phoneNumber?.message}
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
