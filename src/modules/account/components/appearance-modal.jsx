import {Button, Text} from '@/components'
import {useTheme} from '@/hooks'
import {tw} from '@/lib/settings'
import {
  CircleIcon,
  Radio,
  RadioIcon,
  RadioIndicator,
  RadioGroup,
  KeyboardAvoidingView,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  VStack,
  HStack,
  Box,
} from '@gluestack-ui/themed'
import propTypes from 'prop-types'
import {useEffect, useState} from 'react'
import {Pressable, Platform} from 'react-native'

const options = [
  {label: 'Modo claro', mode: 'light'},
  {label: 'Modo oscuro', mode: 'dark'},
  {
    label: 'Usar ajustes del sistema',
    description: 'Aplicaremos el tema de visualización de su dispositivo',
    mode: 'device',
  },
]

function AppearanceModal({showAppearance, onClose}) {
  const {theme, setTheme} = useTheme()
  const [value, setValue] = useState()

  useEffect(() => {
    setValue(theme)
  }, [theme])

  const onSave = () => {
    setTheme(value)
    onClose()
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Actionsheet isOpen={showAppearance}>
        <ActionsheetBackdrop />
        <ActionsheetContent maxHeight="75%">
          {/* <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper> */}
          <VStack space="md" style={tw`w-full justify-center items-center py-4 px-2`}>
            <Text style={tw`text-xl font-semibold`}>Apariencia</Text>
            <RadioGroup value={value} onChange={setValue}>
              {options.map(({label, description, mode}) => (
                <Pressable key={label} onPress={() => setValue(mode)} style={tw`w-full`}>
                  <HStack
                    style={tw`w-full justify-between items-center border-t border-borderDark-100 dark:border-borderDark-800 py-4`}
                    w="$full"
                    justifyContent="space-between"
                    alignItems="center"
                    space="md"
                  >
                    <Box>
                      <Text style={tw`text-base font-medium`}>{label}</Text>
                      {description && <Text style={tw`text-sm opacity-50`}>{description}</Text>}
                    </Box>
                    <Radio size="sm" value={mode}>
                      <RadioIndicator
                        $active-borderColor="$orange500"
                        style={tw.style({'border-orange-500': value === mode})}
                      >
                        <RadioIcon as={CircleIcon} style={tw` text-orange-500`} />
                      </RadioIndicator>
                    </Radio>
                  </HStack>
                </Pressable>
              ))}
            </RadioGroup>
            <Button
              style={tw`mt-4 w-full`}
              label="Guardar"
              onPress={onSave}
              isDisabled={theme === value}
            />
            <Button
              style={tw`text-dark dark:text-white`}
              variant="link"
              label="Cancelar"
              onPress={onClose}
            />
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </KeyboardAvoidingView>
  )
}

AppearanceModal.propTypes = {
  showAppearance: propTypes.bool,
  onClose: propTypes.func,
}

AppearanceModal.defaultProps = {
  showAppearance: false,
}

AppearanceModal.displayName = 'AppearanceModal'

export default AppearanceModal
