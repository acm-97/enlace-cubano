import * as React from 'react'
import type {Control, FieldValues, Path, RegisterOptions} from 'react-hook-form'
import {useController} from 'react-hook-form'
import type {TextInput, TextInputProps} from 'react-native'
import {I18nManager, StyleSheet, View} from 'react-native'
import {TextInput as NTextInput} from 'react-native'
import {tv} from 'tailwind-variants'

import colors from './colors'
import {Text} from './text'

const inputTv = tv({
  slots: {
    container: 'mb-2',
    label: 'text-grey-100 mb-1 text-lg dark:text-neutral-100',
    inputWrapper:
      'mt-0 flex-row items-center gap-2 rounded-lg border-[0.5px] border-neutral-300 bg-neutral-100 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white',
    input: 'font-inter text-base  font-medium leading-5 dark:text-white',
  },

  variants: {
    focused: {
      true: {
        input: 'border-neutral-400 dark:border-neutral-300',
      },
    },
    error: {
      true: {
        input: 'border-danger-600',
        label: 'text-danger-600 dark:text-danger-600',
      },
    },
    disabled: {
      true: {
        input: 'bg-neutral-200',
      },
    },
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
})

export interface NInputProps extends TextInputProps {
  label?: string
  disabled?: boolean
  error?: string
  classNames?: {
    container?: string
    input?: string
    inputWrapper?: string
  }
  startContent?: React.ReactNode
  endContent?: React.ReactNode
}

type TRule = Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>

export type RuleType<T> = {[name in keyof T]: TRule}
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  rules?: TRule
}

interface ControlledInputProps<T extends FieldValues> extends NInputProps, InputControllerType<T> {}

export const Input = React.forwardRef<TextInput, NInputProps>((props, ref) => {
  const {label, error, testID, classNames, startContent, endContent, ...inputProps} = props
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
      {label && (
        <Text testID={testID ? `${testID}-label` : undefined} className={styles.label()}>
          {label}
        </Text>
      )}
      <View className={styles.inputWrapper({className: classNames?.inputWrapper})}>
        {startContent && startContent}
        <NTextInput
          testID={testID}
          ref={ref}
          placeholderTextColor={colors.neutral[400]}
          className={styles.input({className: classNames?.input})}
          onBlur={onBlur}
          onFocus={onFocus}
          {...inputProps}
          style={StyleSheet.flatten([
            {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'},
            inputProps.style,
          ])}
        />
        {endContent && endContent}
      </View>
      {error && (
        <Text
          testID={testID ? `${testID}-error` : undefined}
          className="ml-2 mt-1 text-sm text-danger-400 dark:text-danger-600"
        >
          {error}
        </Text>
      )}
    </View>
  )
})

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(props: ControlledInputProps<T>) {
  const {name, control, rules, ...inputProps} = props

  const {field, fieldState} = useController({control, name, rules})
  return (
    <Input
      ref={field.ref}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={(field.value as string) || ''}
      {...inputProps}
      error={fieldState.error?.message}
    />
  )
}
