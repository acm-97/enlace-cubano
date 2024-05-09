import {Redirect, useLocalSearchParams, useRouter} from 'expo-router'
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from 'react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import {twMerge} from 'tailwind-merge'

import {useSignupUser, useVerifyUser} from '@/api'
import {hydrateAuth, saveUser, signOut, translate, useAuth} from '@/core'
import {getToken, type PhoneNumber} from '@/core/auth/utils'
import {Button, FocusAwareStatusBar, showErrorMessage, Text, View} from '@/ui'

const CELL_COUNT = 6

export default function VerifyUser() {
  // @ts-ignore
  const params = useLocalSearchParams<{phone?: string | null; userId?: string | null}>()
  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT})
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  const {mutate} = useVerifyUser()
  const {push} = useRouter()
  const status = useAuth.use.status()
  const user = useAuth.use.user()

  const onChange = (code: string) => {
    setValue(code)

    if (code.length === CELL_COUNT) {
      mutate(
        {
          code,
          phoneNumber: JSON.parse(params.phone ?? '{}'),
          id: params?.userId ?? '',
        },
        {
          onSuccess: ({verified}) => {
            if (status === 'signOut' && verified) {
              push('/login')
            } else {
              user && saveUser({...user, verified})
              push('/(client)')
            }
          },
          // @ts-ignore
          onError: ({response}) => showErrorMessage(response?.data.message),
        },
      )
    }
  }

  if (status === 'signOut' && (!params.phone || !params.userId)) {
    return <Redirect href="/login" />
  }

  return (
    <>
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1 items-center justify-center p-4">
        <View>
          <Text className="mb-2 text-center text-4xl font-semibold">Verification</Text>
          <Text className="mb-6 max-w-[25rem] text-center text-sm opacity-70">
            Please enter de verification code we send you to your phone number
          </Text>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={onChange}
            cellCount={CELL_COUNT}
            rootStyle={{
              marginTop: 20,
              width: 350,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                className={twMerge(
                  'h-12 w-12 items-center justify-center border-b border-b-neutral-300 dark:border-b-neutral-700',
                  isFocused && '!border-b-primary-500',
                )}
              >
                <Text className="text-center text-2xl">
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          <Button
            label={translate('cancel')}
            variant="link"
            onPress={() => {
              signOut()
              hydrateAuth()
              push('/(client)')
            }}
            className="mt-10"
          />
        </View>
      </SafeAreaView>
    </>
  )
}
