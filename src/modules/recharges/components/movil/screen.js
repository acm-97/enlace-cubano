import {movilRecharges} from '@/constants/recharges-mockup'
import {tw} from '@/lib/settings'
import {Divider, Card, Box, VStack, Text, Heading, ScrollView, HStack} from '@gluestack-ui/themed'
import propTypes from 'prop-types'
import HTMLView from 'react-native-htmlview'

function MovilScreen() {
  return (
    <Box style={tw`w-full flex-1 items-center`}>
      <ScrollView style={tw`w-full p-4 py-6`}>
        <VStack w="$full" space="lg" reversed={false}>
          {movilRecharges.map(({description, price, amount}) => (
            <Card key={description} size="md" variant="elevated" style={tw`w-full p-4`}>
              <HStack space="xs" reversed={false} style={tw`justify-between items-center w-full`}>
                <HTMLView value={description + ' asdasda ss adas'} style={tw`w-5/6`} />
                <Box w="auto" style={tw`bg-orange-500/20 p-2 rounded-md`}>
                  <Text size="md" style={tw`text-orange-500 font-semibold `}>
                    ${price}
                  </Text>
                </Box>
              </HStack>
            </Card>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  )
}
MovilScreen.propTypes = {}

MovilScreen.defaultProps = {}

MovilScreen.displayName = 'MovilScreen'

export default MovilScreen
