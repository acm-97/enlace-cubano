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
import {Text} from '@/components'

function ContactList({navigation, route: {params}}) {
  return (
    <Box style={tw`w-full h-full pb-4 border-t border-borderDark-100`}>
      <FlashList
        data={params?.contacts}
        ItemSeparatorComponent={() => <Divider bg="$borderDark100" />}
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
      />
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
  return (
    <Pressable onPress={onPress}>
      <HStack space="md" alignItems="center" style={tw`py-2 px-3.5`}>
        <Avatar bgColor="$orange500" size="sm" borderRadius="$full">
          <AvatarFallbackText>{item.name}</AvatarFallbackText>
          <AvatarImage
            alt={`${item.name} image`}
            source={{
              uri: item.image?.uri,
            }}
          />
        </Avatar>
        <VStack space="xs">
          <Text style={tw`font-semibold`}>{item.name}</Text>
          <HStack space="md" alignItems="center">
            <Text style={tw`text-xs`}>{item.phoneNumber?.label}</Text>
            {item.phoneNumber?.label && <Divider orientation="vertical" h="$3/4" />}
            <Text style={tw`text-xs`}>{item.phoneNumber?.number}</Text>
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
