import {HeaderBackButton} from '@react-navigation/elements'
import {TransitionPresets} from '@react-navigation/stack'
import {Link, Stack, useLocalSearchParams, useRouter} from 'expo-router'
import debounce from 'lodash.debounce'
import React, {useEffect, useState} from 'react'
import {PermissionsAndroid, Platform, Pressable} from 'react-native'
import Contacts from 'react-native-contacts'
import {AlphabetList} from 'react-native-section-alphabet-list'

import {translate, useSelectedTheme} from '@/core'
import {ActivityIndicator, Divider, FocusAwareStatusBar, Icon, Input, Text, View} from '@/ui'

type Props = {}
export default function MobileContacts({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>()
  const [isError, setIsError] = useState<boolean>()
  const [search, setSearch] = useState<string>()
  const [contacts, setContacts] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const {selectedTheme: theme} = useSelectedTheme()

  const {replace} = useRouter()
  const params = useLocalSearchParams()
  const headerLeft = () => (
    <HeaderBackButton labelVisible={false} onPress={() => replace(`/mobile/${params.id}`)} />
  )

  useEffect(() => {
    setIsLoading(true)
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept',
      })
        .then(res => {
          console.log('Permission: ', res)
          getContacts()
          setIsError(false)
        })
        .catch(error => {
          console.error('Permission error: ', error)
          setIsError(true)
        })
    } else {
      getContacts()
    }
    setIsLoading(false)
  }, [])

  const getContacts = () => {
    Contacts.getAll()
      .then(_contacts => {
        // work with contacts
        // console.log(contacts)
        const newContacts = _contacts
          ?.map((item, index) => {
            return {
              ...item,
              value: item?.givenName ?? item?.familyName ?? '#',
              key: index,
            }
          })
          ?.sort((a, b) => a?.value?.localeCompare(b?.value))

        setContacts(newContacts)
        setItems(newContacts)
        setIsError(false)
      })
      .catch(e => {
        console.log(e)
        setIsError(true)
      })
  }

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

  if (isLoading) {
    return (
      <View className="flex-1 justify-center  p-3">
        <FocusAwareStatusBar />

        {Platform.OS === 'android' && (
          <Stack.Screen
            options={{
              title: 'Contacts',
              presentation: 'modal',
              headerLeft,
            }}
          />
        )}
        <ActivityIndicator />
      </View>
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
              headerLeft,
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
            headerLeft,
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
          backgroundColor: theme === 'dark' ? '#121212' : 'white',
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
  const params = useLocalSearchParams()
  const name = item.value

  if (!item?.phoneNumbers || item?.phoneNumbers?.length === 0) return

  return item?.phoneNumbers.map(({label, number}: any, i: number) => (
    <Link
      key={i}
      replace
      href={{
        pathname: `/mobile/[id]`,
        // @ts-ignore
        params: {
          ...params,
          phoneNumber: number.replaceAll(' ', '').replace('+53', '').replaceAll('-', '') ?? '',
        },
      }}
      asChild
    >
      <Pressable>
        <View className="border-b border-neutral-300 px-3.5 py-2 dark:border-neutral-700">
          <Text className="text-base font-semibold">{name}</Text>
          <View className="flex-row items-center">
            <Text className="text-xs">{label}</Text>
            {label && <Divider vertical />}
            <Text className="text-xs">{number}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  ))
}
