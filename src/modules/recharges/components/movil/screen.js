import {movilRecharges} from '@/constants/recharges-mockup'
import {useDebounceFn} from '@/hooks'
import {tw} from '@/lib/settings'
import {config} from '@gluestack-ui/config'
import {
  Divider,
  Card,
  Box,
  VStack,
  Text,
  ScrollView,
  HStack,
  Input,
  Pressable,
  InputField,
} from '@gluestack-ui/themed'
import propTypes from 'prop-types'
import {useEffect, useState} from 'react'
import HTMLView from 'react-native-htmlview'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

function MovilScreen() {
  const [filteredList, setFilteredList] = useState()

  useEffect(() => {
    setFilteredList(movilRecharges)
  }, [movilRecharges])

  const {run: onSearch} = useDebounceFn(
    value => {
      const list = movilRecharges?.filter(
        ele =>
          ele.description?.toLowerCase()?.includes(value?.toLowerCase()) ||
          ele.price?.toString()?.includes(value),
      )
      setFilteredList(list)
    },
    {wait: 500},
  )

  return (
    <Box style={tw`w-full flex-1 items-center`}>
      <ScrollView style={tw`w-full px-4 py-6`}>
        <VStack w="auto" space="lg" reversed={false} $android-px="$1">
          <Input variant="outline" size="md" borderColor="$borderDark500">
            <InputField placeholder="Busca por precio, descripción..." onChangeText={onSearch} />
          </Input>
          {filteredList?.map(({description, price, amount}) => (
            <Card key={description} size="md" variant="elevated" style={tw`w-full p-4`}>
              <VStack space="md" reversed={false}>
                <HTMLView value={description} style={tw`w-full`} />
                <Divider />
                <HStack space="lg" reversed={false} style={tw`justify-end items-center w-full`}>
                  <Pressable>
                    <MaterialIcons name="favorite" color={config.tokens.colors.red500} size={20} />
                  </Pressable>
                  <Box w="auto" style={tw`bg-orange-500/20 py-1.5 px-2 rounded-md`}>
                    <Text size="md" style={tw`text-orange-500 font-semibold `}>
                      ${price}
                    </Text>
                  </Box>
                </HStack>
              </VStack>
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
