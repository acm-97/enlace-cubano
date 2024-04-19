import {Text} from '@/components'
import {movilRecharges} from '@/constants/recharges-mockup'
import {useDebounceFn, useTheme} from '@/hooks'
import {tw} from '@/lib/settings'
import {config} from '@gluestack-ui/config'
import {
  Divider,
  Card,
  Box,
  VStack,
  ScrollView,
  HStack,
  Pressable,
} from '@gluestack-ui/themed'
import propTypes from 'prop-types'
import {StyleSheet} from 'react-native'
import HTMLView from 'react-native-htmlview'
import format from 'date-fns/format'

function ActivityScreen({navigation}) {
  const {theme} = useTheme()
  const {red500} = config.tokens.colors

  const styles = StyleSheet.create({
    div: {
      color: theme === 'dark' ? 'white' : 'black', // make links coloured pink
    },
  })

  if (movilRecharges.length === 0) <ListEmptyComponent />

  return (
    <Box style={tw`w-full flex-1 items-center`}>
      <ScrollView style={tw`w-full px-4 py-6`}>
        <VStack w="auto" space="lg" reversed={false} $android-px="$1">
          {movilRecharges?.map(({description, price, amount, date, status}) => (
            <Pressable
              key={description}
              onPress={() =>
                navigation.navigate('RechargeMovilForm', {recharge: {description, price, amount}})
              }
            >
              <Card size="md" variant="elevated" style={tw`w-full p-4`}>
                <VStack space="md" reversed={false}>
                  <HTMLView
                    value={`<div>${description}</div>`}
                    style={tw`w-full`}
                    stylesheet={styles}
                  />
                  <Divider />
                  <HStack space="lg" reversed={false} style={tw`justify-around items-center w-full`}>
                    <VStack w="auto" alignItems="center" space="small" style={tw``}>
                      <Text size="md" style={tw`font-bold`}>
                        {format(new Date(date), 'PP')}
                      </Text>
                      <Text size="md" style={tw`text-sm`}>
                        Fecha
                      </Text>
                    </VStack>
                    <VStack w="auto" alignItems="center" space="small" style={tw``}>
                      <Text
                        size="md"
                        style={tw.style('text-success-400 font-semibold', {
                          'text-orange-400': status === 'Pendiente',
                        })}
                      >
                        {status}
                      </Text>
                      <Text size="md" style={tw`text-sm`}>
                        Estado
                      </Text>
                    </VStack>
                    <VStack w="auto" alignItems="center" space="small" style={tw``}>
                      <Text size="md" style={tw`font-bold`}>
                        ${price}
                      </Text>
                      <Text size="md" style={tw`text-sm`}>
                        Precio
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </Card>
            </Pressable>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  )
}

function ListEmptyComponent() {
  return (
    <Box style={tw`w-full h-24 justify-center items-center`}>
      <Text style={tw`text-lg`}>No se encontraron ofertas</Text>
    </Box>
  )
}

ActivityScreen.propTypes = {
  navigation: propTypes.object,
}

ActivityScreen.defaultProps = {}

ActivityScreen.displayName = 'ActivityScreen'

export default ActivityScreen
