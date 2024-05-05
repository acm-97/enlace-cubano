import {zodResolver} from '@hookform/resolvers/zod'
import {useRouter} from 'expo-router'
import React from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {useForm} from 'react-hook-form'
import * as z from 'zod'

import {translate} from '@/core'
import {Button, ControlledInput, Text, View} from '@/ui'

const Schema = z.object({
  email: z
    .string({
      required_error: translate('login.form.required-email'),
    })
    .email(translate('login.form.error-email')),
  password: z
    .string({
      required_error: translate('login.form.required-password'),
    })
    .min(8, translate('login.form.error-password')),
})

export type FormType = z.infer<typeof Schema>

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>
}

export const LoginForm = ({onSubmit = () => {}}: LoginFormProps) => {
  const {replace} = useRouter()

  const {handleSubmit, control} = useForm<FormType>({
    resolver: zodResolver(Schema),
  })

  return (
    <View className="flex-1 justify-center p-4">
      <Text testID="form-title" tx="login.title" className="mb-6 text-center text-2xl" />

      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label={translate('email')}
        keyboardType="email-address"
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label={translate('password')}
        placeholder="***"
        secureTextEntry={true}
      />
      <Button
        testID="login-button"
        label={translate('login.form.submit')}
        onPress={handleSubmit(onSubmit)}
        className="mt-8"
        size="lg"
      />

      <Button
        testID="signup-button"
        label={translate('login.signup')}
        variant="ghost"
        className="mt-4"
        onPress={() => replace('/signup')}
      />
    </View>
  )
}
