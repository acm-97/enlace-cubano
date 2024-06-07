import {HeaderBackButton} from '@react-navigation/elements'
import {TransitionPresets} from '@react-navigation/stack'
import {Link, Stack, useLocalSearchParams, useRouter} from 'expo-router'
import debounce from 'lodash.debounce'
import {useColorScheme} from 'nativewind'
import React, {useEffect, useState} from 'react'
import {PermissionsAndroid, Platform, Pressable} from 'react-native'
import type {Contact} from 'react-native-contacts'
import Contacts from 'react-native-contacts'
import {AlphabetList} from 'react-native-section-alphabet-list'

import {translate} from '@/core'
import {contactsState} from '@/hooks/use-contacts'
import {
  ActivityIndicator,
  Divider,
  EmptyList,
  FocusAwareStatusBar,
  Icon,
  Input,
  Text,
  View,
} from '@/ui'

type Props = {}
export default function MobileContacts({}: Props) {
  const [search, setSearch] = useState<string>()
  const [items, setItems] = useState<any[]>([])
  const {colorScheme} = useColorScheme()
  const isLoading = contactsState(state => state.isLoading)
  const isError = contactsState(state => state.isError)
  const contacts = contactsState(state => state.contacts)

  const {replace} = useRouter()
  const params = useLocalSearchParams()
  const headerLeft = () => (
    <HeaderBackButton labelVisible={false} onPress={() => replace(`/mobile/${params.id}`)} />
  )

  useEffect(() => {
    if (contacts.length > 0) {
      setItems(contacts)
    }
  }, [contacts])

  const debounced = debounce(value => {
    const filter = contacts?.filter(
      ele =>
        ele.phoneNumbers?.some((phone: any) =>
          phone?.number
            ?.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(value?.normalize('NFD').replace(/[\u0300-\u036f]/g, '')),
        ) ||
        ele.value
          ?.toString()
          ?.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          ?.includes(
            value
              ?.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase(),
          ),
    )
    setItems(filter)
  }, 500)

  const onChange = (value: string) => {
    setSearch(value)
    debounced(value)
  }

  if (isLoading || items?.length === 0) {
    return (
      <>
        <FocusAwareStatusBar />

        {Platform.OS === 'android' && (
          <Stack.Screen
            options={{
              title: 'Contacts',
              presentation: 'modal',
              // headerLeft,
            }}
          />
        )}
        <EmptyList isLoading={isLoading} />
      </>
    )
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <FocusAwareStatusBar />

        {Platform.OS === 'android' && (
          <Stack.Screen
            options={{
              title: 'Contacts',
              presentation: 'modal',
              // headerLeft,
            }}
          />
        )}
        <Text tx="error-data" className="text-center" />
      </View>
    )
  }

  return (
    <View className="flex-1 p-3 pt-8">
      <FocusAwareStatusBar />

      {Platform.OS === 'android' && (
        <Stack.Screen
          options={{
            title: 'Contacts',
            presentation: 'modal',
            // headerLeft,
          }}
        />
      )}
      <View className="w-full flex-row items-center justify-between gap-8 ">
        <Input
          value={search}
          onChangeText={onChange}
          classNames={{container: 'flex-1'}}
          placeholder={translate('offers.mobile.search')}
        />
        <Pressable onPress={() => Contacts?.openContactForm?.({})}>
          <Icon as="MaterialIcons" name="person-add-alt-1" size={28} className="mb-1" />
        </Pressable>
      </View>
      <AlphabetList
        uncategorizedAtTop
        data={items}
        indexLetterStyle={{
          color: 'orange',
          fontSize: 12,
        }}
        indexContainerStyle={{
          backgroundColor: colorScheme === 'dark' ? '#121212' : 'white',
          width: 20,
          paddingLeft: 10,
        }}
        renderCustomItem={item => <ListItem item={item} />}
        renderCustomSectionHeader={section => (
          <View
            // className="py-1 px-6 bg-warmGray-200 dark:bg-warmGray-700`}
            className="border-b border-neutral-300 px-6  pb-1 pt-4 dark:border-neutral-700 "
          >
            <Text className="font-semibold">{section?.title}</Text>
          </View>
        )}
      />
    </View>
  )
}

function ListItem({item}: any) {
  // const params = useLocalSearchParams()
  const {dismiss} = useRouter()
  const name = item.value
  const setSelectedPhone = contactsState(state => state.setSelectedPhone)

  const onSlect = (phone: string) => {
    setSelectedPhone(phone.replaceAll(' ', '').replace('+53', '').replaceAll('-', '') ?? '')
    dismiss()
  }

  if (!item?.phoneNumbers || item?.phoneNumbers?.length === 0) return

  return item?.phoneNumbers.map(({label, number}: any, i: number) => (
    // <Link
    //   key={i}
    //   replace
    //   href={{
    //     pathname: `/mobile/[id]`,
    //     // @ts-ignore
    //     params: {
    //       ...params,
    //       phoneNumber: number.replaceAll(' ', '').replace('+53', '').replaceAll('-', '') ?? '',
    //     },
    //   }}
    //   asChild
    // >
    <Pressable onPress={() => onSlect(number)}>
      <View className="border-b border-neutral-300 px-3.5 py-2 dark:border-neutral-700">
        <Text className="text-base font-semibold">{name}</Text>
        <View className="flex-row items-center">
          <Text className="text-xs">{label}</Text>
          {label && <Divider vertical />}
          <Text className="text-xs">{number}</Text>
        </View>
      </View>
    </Pressable>
    // </Link>
  ))
}
