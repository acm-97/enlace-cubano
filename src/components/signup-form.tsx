/* eslint-disable max-lines-per-function */
import {zodResolver} from '@hookform/resolvers/zod'
import {useRouter} from 'expo-router'
import React, {createRef, useEffect, useState} from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {useForm} from 'react-hook-form'
import PagerView from 'react-native-pager-view'
import * as z from 'zod'

import {translate, tw} from '@/core'
import {Button, ControlledInput, PhoneInput, Text, View} from '@/ui'

const Schema = z
  .object({
    firstName: z.string().min(1, translate('signup.form.required-firstName')),
    lastName: z.string().min(1, translate('signup.form.required-lastName')),
    phoneNumber: z.object(
      {
        code: z.string(),
        country: z.string(),
        number: z.string().min(1, translate('signup.form.required-phoneNumber')),
      },
      {required_error: translate('signup.form.required-phoneNumber')},
    ),
  })
  .refine(
    schema => {
      const n = '+1' + schema.phoneNumber.code + schema.phoneNumber.number
      return /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(n)
    },
    {
      message: translate('signup.form.error-phone'),
      path: ['phoneNumber'],
    },
  )

const Schema1 = z
  .object({
    email: z
      .string({
        required_error: translate('signup.form.required-email'),
      })
      .email(translate('signup.form.error-email')),
    password: z.string(),
  })
  .refine(schema => /^(?=[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(schema.password), {
    message: translate('settings.account.password-description'),
    path: ['password'],
  })

export type FormType = z.infer<typeof Schema>
export type FormType1 = z.infer<typeof Schema1>

type FormTypes = FormType & FormType1

export type SignupFormProps = {
  onSubmit?: SubmitHandler<FormTypes>
}

export const SignupForm = ({onSubmit = () => {}}: SignupFormProps) => {
  const viewPager = createRef<PagerView>()
  const {replace} = useRouter()
  const [values, setValues] = useState<FormType>()
  const [isNext, setIsNext] = useState<boolean>()

  const {watch, setValue, handleSubmit, formState, control} = useForm<FormType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(Schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: {
        code: '1',
        country: 'US',
        number: '',
      },
    },
  })

  const {handleSubmit: handleSubmit1, control: control1} = useForm<FormTypes>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(Schema1),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (isNext) {
      viewPager.current?.setPage(1)
      setIsNext(false)
    }
  }, [isNext, viewPager])

  const onNext: SubmitHandler<FormType> = data => {
    console.log('🚀 ~ SignupForm ~ data:', data)
    setValues(data)
    setIsNext(true)
  }

  return (
    <PagerView ref={viewPager} style={tw`flex-1`} initialPage={0}>
      <View className="justify-center p-4" key="0">
        <Text testID="form-title" tx="signup.title" className="pb-6 text-center text-2xl" />
        <ControlledInput
          testID="firstName-input"
          control={control}
          name="firstName"
          label={translate('firstName')}
        />
        <ControlledInput
          testID="lastName-input"
          control={control}
          name="lastName"
          label={translate('lastName')}
        />

        <PhoneInput
          label={translate('phone')}
          defaultCode={'US'}
          value={watch('phoneNumber.number')}
          onChangeText={value => setValue('phoneNumber.number', value)}
          onChangeCountry={value => {
            setValue('phoneNumber.code', value.callingCode[0])
            setValue('phoneNumber.country', value.cca2)
          }}
          error={formState.errors.phoneNumber?.message}
        />

        <Button
          testID="next-page"
          label={translate('next')}
          onPress={handleSubmit(onNext)}
          className="mt-8"
          size="lg"
        />

        <Button
          testID="signup-button"
          label={translate('signup.login')}
          variant="ghost"
          className="mt-4"
          onPress={() => replace('/login')}
        />
      </View>
      <View className="justify-center p-4" key="1">
        <Text testID="form-title" tx="signup.title" className="pb-6 text-center text-2xl" />
        <ControlledInput
          testID="email-input"
          control={control1}
          name="email"
          label={translate('email')}
          keyboardType="email-address"
        />
        <ControlledInput
          testID="password-input"
          control={control1}
          name="password"
          label={translate('password')}
          placeholder="***"
          secureTextEntry={true}
        />

        <Button
          testID="login-button"
          label={translate('signup.form.submit')}
          onPress={handleSubmit1(data => onSubmit({...values, ...data}))}
          className="mt-8"
          size="lg"
        />

        <Button
          testID="back-page"
          label={translate('back')}
          onPress={() => viewPager.current?.setPage(0)}
          className="mt-8"
          size="lg"
        />

        <Button
          testID="signup-button"
          label={translate('signup.login')}
          variant="ghost"
          className="mt-4"
          onPress={() => replace('/login')}
        />
      </View>
    </PagerView>
  )
}
