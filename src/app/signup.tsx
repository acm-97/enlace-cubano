import {useRouter} from 'expo-router'
import React from 'react'

import {useSignupUser} from '@/api/users'
import type {SignupFormProps} from '@/components/signup-form'
import {SignupForm} from '@/components/signup-form'
import {tw, useAuth} from '@/core'
import {useSoftKeyboardEffect} from '@/core/keyboard'
import {FocusAwareStatusBar, SafeAreaView, showErrorMessage} from '@/ui'

export default function Signup() {
  useSoftKeyboardEffect()
  const {mutate} = useSignupUser()
  const {push} = useRouter()

  const onSubmit: SignupFormProps['onSubmit'] = data => {
    console.log(data)
    mutate(data, {
      onSuccess: () => {
        push('/login')
      },
      // @ts-ignore
      onError: e => showErrorMessage(e.response?.data?.message),
    })
  }
  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView style={tw`flex-1`}>
        <SignupForm onSubmit={onSubmit} />
      </SafeAreaView>
    </>
  )
}
