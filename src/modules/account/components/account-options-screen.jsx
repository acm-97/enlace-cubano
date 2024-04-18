import propTypes from 'prop-types'
import {tw} from '@/lib/settings'
import {AvatarFallbackText, AvatarImage, Avatar, HStack, VStack, Box} from '@gluestack-ui/themed'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {Pressable} from 'react-native'
import useToggle from '@/hooks/useToggle'
import AppearanceModal from './appearance-modal'
import {Text} from '@/components'

const options = [
  {
    label: 'Apariencia',
    path: 'Appearance',
    icon: 'invert-colors',
    type: 'modal',
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
      <VStack space="2xl" p="$4">
        <HStack space="md" justifyContent="space-between" alignItems="center">
          <Box>
            <Text style={tw`text-3xl font-extrabold`}>Alejandro</Text>
            <Text style={tw`text-3xl font-extrabold`}>Cabrera Mena</Text>
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
        <VStack w="$full" space="sm">
          {options.map(({label, path, icon, type}) => (
            <Pressable key="label" onPress={() => onPress(type, path)}>
              <HStack space="md" justifyContent="space-between" alignItems="center">
                <Box>
                  <HStack space="md" alignItems="center">
                    <MaterialIcons style={tw`dark:text-secondary-0`} name={icon} size={20} />
                    <Text style={tw`text-base`}>{label}</Text>
                  </HStack>
                </Box>
                <FontAwesome name="chevron-right" style={tw`text-secondary-400`} size={16} />
              </HStack>
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
