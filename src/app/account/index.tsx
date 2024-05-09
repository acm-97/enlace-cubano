import {Stack, useRouter} from 'expo-router'
import * as React from 'react'

import {ItemsContainer} from '@/components/items-container'
import {AccountItem} from '@/components/settings/account-item'
import {translate, useAuth} from '@/core'
import {FocusAwareStatusBar, Image, ScrollView, Text, View} from '@/ui'

type Props = {}
export default function Account({}: Props) {
  const user = useAuth.use.user()
  const {push} = useRouter()

  return (
    <>
      <FocusAwareStatusBar />
      <Stack.Screen
        options={{title: translate('settings.account.title'), headerBackTitleVisible: false}}
      />

      <ScrollView>
        <View className=" flex-1 px-4">
          <View className="flex-row items-center justify-around">
            <View className="!my-12">
              <Text className="!text-4xl font-semibold">{user?.firstName}</Text>
              <Text className="!text-4xl font-semibold">{user?.lastName}</Text>
            </View>
            <Image
              className="h-20 w-20 rounded-full border border-neutral-300 bg-neutral-300 dark:border-neutral-700"
              contentFit="contain"
              alt="user"
              source={{
                uri: 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg',
              }}
            />
          </View>
          <ItemsContainer>
            <AccountItem
              text="phone"
              value={'+' + user?.phoneNumber.code + ' ' + user?.phoneNumber.number}
              onPress={() => push('/account/phone-number')}
            />
            <AccountItem text="email" value={user?.email} onPress={() => push('/account/email')} />
            <AccountItem
              text="password"
              value="********"
              onPress={() => push('/account/password')}
            />
            {user?.role === 'client' && (
              <AccountItem
                text="payments"
                value="#### #### #### ####"
                onPress={() => push('/account/payement-methods')}
                className="border-0"
              />
            )}
          </ItemsContainer>
        </View>
      </ScrollView>
    </>
  )
}
