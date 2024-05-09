import {useRouter} from 'expo-router'
import React from 'react'

import {useCurrentUser, useLoginUser} from '@/api/users'
import type {LoginFormProps} from '@/components/login-form'
import {LoginForm} from '@/components/login-form'
import {useAuth} from '@/core'
import {getToken} from '@/core/auth/utils'
import {useSoftKeyboardEffect} from '@/core/keyboard'
import {FocusAwareStatusBar, showErrorMessage} from '@/ui'

export default function Login() {
  useSoftKeyboardEffect()
  const {mutate, isLoading} = useLoginUser()
  const signIn = useAuth.use.signIn()
  const {push} = useRouter()

  const onSubmit: LoginFormProps['onSubmit'] = data => {
    // console.log(data)
    mutate(data, {
      onSuccess: user => {
        signIn(user)
        push('/')
      },
      // @ts-ignore
      onError: e => showErrorMessage(e.response?.data?.message),
    })
  }
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
    </>
  )
}
