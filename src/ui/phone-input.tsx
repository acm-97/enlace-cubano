import * as React from 'react'
import type {Control, FieldValues, Path, RegisterOptions} from 'react-hook-form'
import {useController} from 'react-hook-form'
import {View} from 'react-native'
import {DARK_THEME} from 'react-native-country-picker-modal'
import type {PhoneInputProps} from 'react-native-phone-number-input'
import CPhoneInput from 'react-native-phone-number-input'
import {tv} from 'tailwind-variants'

import {tw, useSelectedTheme} from '@/core'

import colors from './colors'
import {Text} from './text'

const inputTv = tv({
  slots: {
    container: 'mb-2',
    label: 'text-grey-100 mb-1 text-lg dark:text-neutral-100',
    inputWrapper:
      'mt-0 w-full rounded-lg border-[0.5px] border-neutral-300 bg-neutral-100 p-0 py-0.5 font-inter  text-base font-medium leading-5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white',
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
  const {label, error, classNames, ...inputProps} = props
  const {selectedTheme} = useSelectedTheme()
  const [isFocussed, setIsFocussed] = React.useState(false)
  const onBlur = React.useCallback(() => setIsFocussed(false), [])
  const onFocus = React.useCallback(() => setIsFocussed(true), [])

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
    <View className={styles.container({className: classNames?.container})}>
      {label && <Text className={styles.label()}>{label}</Text>}

      <CPhoneInput
        defaultValue={inputProps?.value}
        ref={ref}
        containerStyle={tw.style(styles.inputWrapper(), classNames?.inputWrapper)}
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
        }}
        countryPickerProps={{theme: selectedTheme === 'dark' && DARK_THEME}}
        {...inputProps}
      />
      {error && (
        <Text className="ml-2 mt-1.5 text-sm text-danger-400 dark:text-danger-600">{error}</Text>
      )}
    </View>
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
  console.log('🚀 ~ fieldState:', fieldState)
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
