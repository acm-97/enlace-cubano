import {useRouter} from 'expo-router'
import * as React from 'react'
import type {Control, FieldValues, Path, RegisterOptions} from 'react-hook-form'
import {useController} from 'react-hook-form'
import {Keyboard, Platform, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native'
import {DARK_THEME} from 'react-native-country-picker-modal'
import type {PhoneInputProps} from 'react-native-phone-number-input'
import CPhoneInput from 'react-native-phone-number-input'
import {twMerge} from 'tailwind-merge'
import {tv} from 'tailwind-variants'

import {tw, useSelectedTheme} from '@/core'

import colors from './colors'
import Icon from './icon'
import {Text} from './text'

const inputTv = tv({
  slots: {
    container: 'mb-2',
    label: 'text-grey-100 mb-1 text-lg dark:text-neutral-100',
    inputWrapper:
      'mt-0  rounded-lg border-[0.5px] border-neutral-300 bg-neutral-100 p-0 py-0.5 font-inter  text-base font-medium leading-5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white',
    input:
      'm-0 p-0 font-inter text-base  font-medium leading-5 dark:bg-neutral-800 dark:text-white',
    code: 'font-inter text-base  font-medium leading-5 dark:bg-neutral-800 dark:text-white',
  },

  variants: {
    focused: {
      true: {
        inputWrapper: 'border-neutral-400 dark:border-neutral-300',
      },
    },
    error: {
      true: {
        inputWrapper: 'border-danger-600',
        label: 'text-danger-600 dark:text-danger-600',
      },
    },
    disabled: {
      true: {
        input: 'bg-neutral-200',
        inputWrapper: 'bg-neutral-200',
      },
    },
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
})

interface NInputProps extends PhoneInputProps {
  label?: string
  disabled?: boolean
  error?: string
  classNames?: {
    container?: string
    inputWrapper?: string
    input?: string
    code?: string
  }
  onBlur?: () => void
  showContactsIcon?: boolean
}

type TRule = Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>

type RuleType<T> = {[name in keyof T]: TRule}
type InputControllerType<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  rules?: TRule
}

interface ControlledInputProps<T extends FieldValues> extends NInputProps, InputControllerType<T> {}

export const PhoneInput = React.forwardRef<CPhoneInput, NInputProps>((props, ref) => {
  const {label, error, classNames, onBlur: _onBlur, showContactsIcon, ...inputProps} = props
  const {selectedTheme} = useSelectedTheme()
  const [isFocussed, setIsFocussed] = React.useState(false)
  const onBlur = React.useCallback(() => {
    setIsFocussed(false)
    _onBlur?.()
  }, [_onBlur])
  const onFocus = React.useCallback(() => setIsFocussed(true), [])
  const {push} = useRouter()

  const styles = React.useMemo(
    () =>
      inputTv({
        error: Boolean(error),
        focused: isFocussed,
        disabled: Boolean(props.disabled),
      }),
    [error, isFocussed, props.disabled],
  )

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className={styles.container({className: classNames?.container})}>
        {label && <Text className={styles.label()}>{label}</Text>}
        <View className="w-full flex-row items-center">
          <CPhoneInput
            defaultValue={inputProps?.value}
            ref={ref}
            containerStyle={tw.style(
              'android:h-12',
              styles.inputWrapper(),
              classNames?.inputWrapper,
              // @ts-ignore
              {
                'w-full': !showContactsIcon,
                'flex-1 rounded-tr-none rounded-br-none': showContactsIcon,
              },
            )}
            // textInputStyle={tw.style(styles.input(), classNames?.input)}
            textContainerStyle={tw.style(styles.input(), classNames?.input)}
            textInputStyle={tw.style(styles.input(), classNames?.input)}
            codeTextStyle={tw.style(styles.code(), classNames?.code)}
            flagButtonStyle={tw.style(styles.input(), classNames?.input)}
            textInputProps={{
              keyboardType: 'phone-pad',
              placeholderTextColor: colors.neutral[400],
              onBlur: onBlur,
              onFocus: onFocus,
              returnKeyType: 'done',
            }}
            countryPickerProps={{theme: selectedTheme === 'dark' && DARK_THEME}}
            {...inputProps}
          />
          {showContactsIcon && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => push('/mobile-contacts')}
              className={twMerge(
                'border-border border-y border-r border-neutral-300 p-2.5 dark:border-neutral-700 rounded-tr-lg rounded-br-lg',
              )}
            >
              <Icon as="AntDesign" name="contacts" size={Platform.OS === 'ios' ? 23 : 28} />
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <Text className="ml-2 mt-1.5 text-sm text-danger-400 dark:text-danger-600">{error}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
})

// only used with react-hook-form
export function ControlledPhoneInput<T extends FieldValues>(props: ControlledInputProps<T>) {
  const {name, control, rules, ...inputProps} = props

  const {
    field: {ref, value, onChange, ...rest},
    fieldState,
    formState,
  } = useController({control, name, rules})
  return (
    <PhoneInput
      ref={ref}
      // onChangeText={onChange}
      onChangeFormattedText={onChange}
      value={(value as string) || ''}
      {...inputProps}
      {...rest}
      error={fieldState.error?.message}
    />
  )
}
