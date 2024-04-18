import {memo} from 'react'
import {Controller} from 'react-hook-form'
import PropTypes from 'prop-types'
import {cn} from '@/lib/utils'
import {tw} from '@/lib/settings'
import {SafeAreaView} from 'react-native'

const FormFieldControl = ({
  control,
  name,
  Component,
  style,
  hideErrorText = false,
  onBlur,
  ...props
}) => {
  return (
    <SafeAreaView>
      <Controller
        name={name}
        control={control}
        render={({fieldState, field: {ref, ...rest}}) => {
          const {error, invalid} = fieldState
          return (
            <Component
              // ref={ref}
              {...rest}
              onBlur={() => onBlur?.(name, rest.value)}
              {...props}
              {...(!hideErrorText && {errorText: error?.message})}
              name={name}
              formBaseProps={{
                size: 'md',
                isDisabled: props.isDisabled,
                isInvalid: invalid,
                isReadOnly: props.isReadOnly,
                isRequired: props.isRequired,
                style: tw.style('mb-3 w-full', style),
              }}
            />
          )
        }}
      />
    </SafeAreaView>
  )
}

FormFieldControl.propTypes = {
  Component: PropTypes.any.isRequired,
  control: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  hideErrorText: PropTypes.bool,
  onBlur: PropTypes.func,
  style: PropTypes.any,
  isDisabled: PropTypes.bool,
  isInvalid: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
}

export default FormFieldControl
