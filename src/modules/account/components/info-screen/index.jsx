import propTypes from 'prop-types'
import {Text} from '@/components'
import {
  Box,
  Divider,
  Heading,
  HStack,
  VStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  KeyboardAvoidingView,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  AvatarBadge,
} from '@gluestack-ui/themed'
import {Pressable, Platform} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {tw} from '@/lib/settings'
import {useState} from 'react'
import * as ImagePicker from 'expo-image-picker'
import useToggle from '@/hooks/useToggle'

const options = [
  {
    label: 'Nombre',
    value: 'Alejandro Cabrera Mena',
    path: 'Name',
  },
  {
    label: 'Número Telefónico',
    value: '+5354509402',
    path: 'PhoneNumber',
  },
  {
    label: 'Correo Electrónico',
    value: 'alejandro97.acm@gmail.com',
    path: 'Email',
  },
]

function InfoScreen({navigation}) {
  const [image, setImage] = useState(null)
  const {isOpen: showAppearance, onToggle: onToggleAppearance} = useToggle()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const takeImage = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

    if (permissionResult.granted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      console.log(result)

      if (!result.canceled) {
        setImage(result.assets[0].uri)
        onToggleAppearance()
      }
    }
  }

  return (
    <Box p="$4" gap="$3">
      <Pressable onPress={onToggleAppearance}>
        <Avatar bgColor="$orange500" size="lg" borderRadius="$full">
          <AvatarFallbackText>A C</AvatarFallbackText>
          {image && <AvatarImage
            alt={` image`}
            source={{
              uri: image,
            }}
          />}
          <AvatarBadge
            style={tw`bg-secondary-100 border-borderDark-400 border-[1px] w-6 h-6  items-center justify-center`}
          >
            <MaterialCommunityIcons
              name="pencil"
              style={tw`text-black dark:text-white`}
              size={20}
            />
          </AvatarBadge>
        </Avatar>
      </Pressable>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Actionsheet isOpen={showAppearance} onClose={onToggleAppearance}>
          <ActionsheetBackdrop />
          <ActionsheetContent maxHeight="75%">
            <HStack
              style={tw`w-full justify-center items-center border-b border-borderDark-100 dark:border-borderDark-800 py-4`}
              w="$full"
              space="4xl"
            >
              <Pressable onPress={pickImage}>
                <VStack space="xs" style={tw`justify-center items-center`}>
                  <Ionicons name="images" style={tw`text-black dark:text-white`} size={35} />
                  <Text style={tw`text-sm`}>Buscar en galería</Text>
                </VStack>
              </Pressable>
              <Pressable onPress={takeImage}>
                <VStack space="xs" style={tw`justify-center items-center`}>
                  <MaterialIcons
                    name="photo-camera"
                    style={tw`text-black dark:text-white`}
                    size={35}
                  />
                  <Text style={tw`text-sm`}>Tomar con la cámara</Text>
                </VStack>
              </Pressable>
            </HStack>
          </ActionsheetContent>
        </Actionsheet>
      </KeyboardAvoidingView>
      <Heading size="lg">Información básica</Heading>
      <VStack style={tw`w-full justify-center items-center`}>
        {options.map(({label, value, path}) => (
          <Pressable key={label} onPress={() => navigation.navigate(path)} style={tw`w-full`}>
            <HStack
              style={tw`w-full justify-between items-center border-b border-borderDark-100 dark:border-borderDark-800 py-4`}
              w="$full"
              space="md"
            >
              <Box>
                <Text style={tw`text-base font-medium`}>{label}</Text>
                {value && <Text style={tw`text-sm opacity-60`}>{value}</Text>}
              </Box>
              <FontAwesome name="chevron-right" style={tw`text-secondary-400`} size={16} />
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </Box>
  )
}

InfoScreen.propTypes = {
  navigation: propTypes.object,
}

InfoScreen.defaultProps = {}

InfoScreen.displayName = 'InfoScreen'

export default InfoScreen
