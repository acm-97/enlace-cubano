import propTypes from 'prop-types'
import {Text} from '@/components'
import {Box, Divider, Heading, HStack, VStack} from '@gluestack-ui/themed'
import {Pressable} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {tw} from '@/lib/settings'

const options = [
  {
    label: 'Contraseña',
    description: '',
    path: 'ChangePassword',
  },
]

function SecurityScreen({navigation}) {
  return (
    <Box p="$4">
      <Heading size="lg">Seguridad de acceso</Heading>
      <VStack style={tw`w-full justify-center items-center`}>
        {options.map(({label, description, path}) => (
          <Pressable key={label} onPress={() => navigation.navigate(path)} style={tw`w-full`}>
            <HStack
              style={tw`w-full justify-between items-center border-b border-borderDark-100 dark:border-borderDark-800 py-4`}
              w="$full"
              justifyContent="space-between"
              alignItems="center"
              space="md"
            >
              <Box>
                <Text style={tw`text-base font-medium`}>{label}</Text>
                {description && <Text style={tw`text-sm opacity-60`}>{description}</Text>}
              </Box>
              <FontAwesome name="chevron-right" style={tw`text-secondary-400`} size={16} />
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </Box>
  )
}

SecurityScreen.propTypes = {
  navigation: propTypes.object,
}

SecurityScreen.defaultProps = {}

SecurityScreen.displayName = 'SecurityScreen'

export default SecurityScreen
