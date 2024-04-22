import propTypes from 'prop-types'
import {FlashList} from '@shopify/flash-list'
import {
  VStack,
  HStack,
  Divider,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
} from '@gluestack-ui/themed'
import {Pressable} from 'react-native'
import {tw} from '@/lib/settings'
import {InputField, Text} from '@/components'
import {useCallback, useMemo, useState} from 'react'
import {AlphabetList} from 'react-native-section-alphabet-list'
import {useDebounceFn, useTheme} from '@/hooks'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Contacts from 'react-native-contacts'

function ContactList({navigation, route: {params}}) {
  const {theme, navigatorTheme} = useTheme()
  const [filtered, setFiltered] = useState([])
  console.log('🚀 ~ ContactList ~ filtered:', filtered)

  // const contacts = useMemo(() => {
  //   let result = []
  //   const grouped = params?.contacts?.reduce((groupedRows, row) => {
  //     const firstLetter = row.name.slice(0, 1)
  //     return {
  //       ...groupedRows,
  //       [firstLetter]: [...(groupedRows[firstLetter] || []), row],
  //     }
  //   }, {})
  //   Object.entries(grouped).forEach(g => {
  //     result = [...result, {name: g[0], index: true}, ...g[1]]
  //     // result.push({name: g[0]})
  //     // result.push(...g[1][1])
  //   })
  //   return result.sort((a, b) => a.name.localeCompare(b.name))
  // }, [params?.contacts])

  const contacts = useMemo(() => {
    const results = params?.contacts
      ?.map((item, index) => {
        return {
          ...item,
          value: item?.firstName ?? item?.lastName ?? '#',
          key: index,
        }
      })
      ?.sort((a, b) => a?.name?.localeCompare(b?.name))

    setFiltered(results)
    return results
  }, [params?.contacts])

  const {run: onSearch} = useDebounceFn(
    value => {
      const list = contacts?.filter(c =>
        c.value
          ?.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(
            value
              ?.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase(),
          ),
      )
      setFiltered(list)
    },
    {wait: 500},
  )

  return (
    <Box style={tw`w-full h-full`}>
      <Box style={tw`w-full flex-row gap-4 justify-between items-center px-4`}>
        <InputField
          formBaseProps={{style: tw`flex-1`}}
          placeholder="Buscar contacto ..."
          onChange={onSearch}
        />
        <Pressable onPress={() => Contacts.openContactForm({})}>
          <MaterialIcons style={tw`dark:text-secondary-0`} name="person-add-alt-1" size={25} />
        </Pressable>
      </Box>
      <AlphabetList
        uncategorizedAtTop
        data={filtered}
        indexLetterStyle={{
          color: 'orange',
          fontSize: 12,
        }}
        indexContainerStyle={{
          backgroundColor: theme === 'dark' ? '#121212' : 'white',
          width: 20,
          paddingLeft: 5,
        }}
        renderCustomItem={item =>
          item.phoneNumbers?.lenght > 1 ? (
            item.phoneNumbers.map((phoneNumber, idx) => (
              <ListItem
                key={idx}
                item={{...item, phoneNumber}}
                setValue={params?.setValue}
                navigation={navigation}
              />
            ))
          ) : (
            <ListItem
              item={{...item, phoneNumber: item.phoneNumbers?.[0]}}
              setValue={params?.setValue}
              navigation={navigation}
            />
          )
        }
        renderCustomSectionHeader={section => (
          <Box
            // style={tw`py-1 px-6 bg-warmGray-200 dark:bg-warmGray-700`}
            style={tw`pt-4 pb-1 px-6 bg-white dark:bg-[#121212] border-b border-borderDark-100 dark:border-borderDark-800`}
          >
            <Text style={tw`font-semibold`}>{section?.title}</Text>
          </Box>
        )}
      />
      {/* <FlashList
        data={contacts}
        ListEmptyComponent={ListEmptyComponent}
        estimatedItemSize={53}
        renderItem={({item}) =>
          item.phoneNumbers?.lenght > 1 ? (
            item.phoneNumbers.map((phoneNumber, idx) => (
              <ListItem
                key={idx}
                item={{...item, phoneNumber}}
                setValue={params?.setValue}
                navigation={navigation}
              />
            ))
          ) : (
            <ListItem
              item={{...item, phoneNumber: item.phoneNumbers?.[0]}}
              setValue={params?.setValue}
              navigation={navigation}
            />
          )
        }
      /> */}
    </Box>
  )
}

function ListEmptyComponent() {
  return (
    <Box style={tw`w-full h-24 justify-center items-center`}>
      <Text style={tw`text-lg`}>No se encontraron contactos</Text>
    </Box>
  )
}

function ListItem({item, setValue, navigation}) {
  const onPress = () => {
    setValue?.('phoneNumber', item.phoneNumber?.number)
    navigation.goBack()
  }
  const name = item.name
  const phoneNumber = item?.phoneNumber

  // if (item.index) {
  //   return (
  //     <Box style={tw`py-1 px-6 bg-warmGray-200 dark:bg-warmGray-700`}>
  //       <Text style={tw`font-semibold`}>{name}</Text>
  //     </Box>
  //   )
  // }

  return (
    <Pressable onPress={onPress}>
      <HStack
        space="md"
        alignItems="center"
        style={tw`py-2 px-3.5 border-b border-borderDark-100 dark:border-borderDark-800`}
      >
        <Avatar bgColor="$orange500" size="sm" borderRadius="$full">
          <AvatarFallbackText>{name ?? '#'}</AvatarFallbackText>
          <AvatarImage
            alt={`${name} image`}
            source={{
              uri: item.image?.uri,
            }}
          />
        </Avatar>
        <VStack space="xs">
          <Text style={tw`font-semibold`}>{name}</Text>
          <HStack space="sm" alignItems="center">
            <Text style={tw`text-xs`}>{phoneNumber?.label}</Text>
            {phoneNumber?.label && <Divider orientation="vertical" h="$3/4" />}
            <Text style={tw`text-xs`}>{phoneNumber?.number}</Text>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  )
}

ListItem.propTypes = {
  item: propTypes.object,
  navigation: propTypes.object,
  setValue: propTypes.func,
}

ContactList.propTypes = {
  navigation: propTypes.object,
  route: propTypes.object,
}

ContactList.defaultProps = {}

ContactList.displayName = 'ContactList'

export default ContactList
