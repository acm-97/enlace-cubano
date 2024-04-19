import propTypes from 'prop-types'
import {Text} from '@/components'
import {Box, Divider, Heading, HStack, VStack} from '@gluestack-ui/themed'
import {Pressable} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {tw} from '@/lib/settings'

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
  return (
    <Box p="$4">
      <Heading size="lg">Información básica</Heading>
      <VStack style={tw`w-full justify-center items-center`}>
        {options.map(({label, value, path}) => (
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
