import {useRouter} from 'expo-router'
import React from 'react'

import {useLoginUser} from '@/api/users'
import type {LoginFormProps} from '@/components/login-form'
import {LoginForm} from '@/components/login-form'
import {useAuth} from '@/core'
import {useSoftKeyboardEffect} from '@/core/keyboard'
import {FocusAwareStatusBar, showErrorMessage} from '@/ui'

export default function Login() {
  useSoftKeyboardEffect()
  const {mutate} = useLoginUser()
  const signIn = useAuth.use.signIn()
  const {push} = useRouter()

  const onSubmit: LoginFormProps['onSubmit'] = data => {
    console.log(data)
    mutate(data, {
      onSuccess: token => {
        signIn(token)
        push('/')
      },
      // @ts-ignore
      onError: e => showErrorMessage(e.response?.data?.message),
    })
  }
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  )
}
