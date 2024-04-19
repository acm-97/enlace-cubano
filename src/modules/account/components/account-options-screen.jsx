import propTypes from 'prop-types'
import {tw} from '@/lib/settings'
import {
  AvatarFallbackText,
  AvatarImage,
  Avatar,
  HStack,
  VStack,
  Box,
  Divider,
  Heading,
} from '@gluestack-ui/themed'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {Pressable} from 'react-native'
import useToggle from '@/hooks/useToggle'
import AppearanceModal from './appearance-modal'
import {Text} from '@/components'

const options = [
  {
    label: 'Apariencia',
    path: 'Appearance',
    Icon: props => <MaterialIcons {...props} name="invert-colors" size={20} />,
    type: 'modal',
  },
  {
    label: 'Información & Seguridad',
    path: 'InfoSecurity',
    Icon: props => <FontAwesome5 {...props} name="user-shield" size={16} />,
    type: 'screen',
  },
]

function AccountOptionsScreen({navigation}) {
  const {isOpen: showAppearance, onToggle: onToggleAppearance} = useToggle()

  const onPress = (type, path) => {
    if (type === 'screen') {
      navigation.navigate(path)
    } else onToggleAppearance()
  }

  return (
    <>
      <AppearanceModal showAppearance={showAppearance} onClose={onToggleAppearance} />
      <VStack space="3xl" p="$4">
        <HStack space="md" justifyContent="space-between" alignItems="center">
          <Box>
            <Heading size="2xl" fontWeight="$extrabold">
              Alejandro
            </Heading>
            <Heading size="2xl" fontWeight="$extrabold">
              Cabrera Mena
            </Heading>
          </Box>
          <Avatar bgColor="$orange500" size="lg" borderRadius="$full">
            <AvatarFallbackText>A C</AvatarFallbackText>
            <AvatarImage
              alt={` image`}
              source={{
                uri: '',
              }}
            />
          </Avatar>
        </HStack>
        {/* <Divider /> */}
        <VStack w="$full" space="lg">
          {options.map(({label, path, Icon, type}) => (
            <Pressable key={label} onPress={() => onPress(type, path)}>
              <HStack space="md" justifyContent="space-between" alignItems="center">
                <Box>
                  <HStack space="md" alignItems="center">
                    <Icon style={tw`dark:text-secondary-0`} />
                    <Text style={tw`text-base`}>{label}</Text>
                  </HStack>
                </Box>
                <FontAwesome name="chevron-right" style={tw`text-secondary-400`} size={16} />
              </HStack>
              <Divider mt="$3.5" />
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </>
  )
}

AccountOptionsScreen.propTypes = {
  navigation: propTypes.object,
}

AccountOptionsScreen.defaultProps = {}

AccountOptionsScreen.displayName = 'AccountOptionsScreen'

export default AccountOptionsScreen
