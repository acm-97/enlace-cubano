import {tw} from '@/lib/settings'
import {
  EyeOffIcon,
  EyeIcon,
  Box,
  AlertCircleIcon,
  FormControlLabel,
  Input,
  FormControlErrorIcon,
  FormControlError,
  FormControlErrorText,
  FormControlHelperText,
  FormControlHelper,
  FormControlLabelText,
  FormControl,
  InputField as InputFieldUI,
  InputSlot,
  InputIcon,
} from '@gluestack-ui/themed'
import propTypes from 'prop-types'
import {useState} from 'react'
import {Text} from 'react-native'

function InputField({
  errorText,
  helperText,
  label,
  inputWrapperProps,
  formBaseProps,
  labelProps,
  type,
  onChange,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword(showState => {
      return !showState
    })
  }

  return (
    <FormControl size="md" {...formBaseProps}>
      <FormControlLabel mb="$1" {...labelProps}>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input
        {...inputWrapperProps}
        style={tw.style(
          {'bg-secondary-100 border-transparent dark:bg-warmGray-700': !isFocused},
          inputWrapperProps?.style,
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <InputFieldUI
          {...props}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          onChangeText={onChange}
        />

        {type === 'password' && (
          <InputSlot pr="$3" onPress={handleState}>
            {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
            <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color="$orange500" />
          </InputSlot>
        )}
      </Input>
      {helperText && (
        <FormControlHelper>
          <FormControlHelperText>{helperText}</FormControlHelperText>
        </FormControlHelper>
      )}
      {errorText && (
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{errorText}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  )
}

InputField.propTypes = {
  label: propTypes.string,
  errorText: propTypes.string,
  helperText: propTypes.string,
  inputWrapperProps: propTypes.object,
  formBaseProps: propTypes.object,
  labelProps: propTypes.object,
  variant: propTypes.string,
  size: propTypes.string,
  type: propTypes.string,
  onChange: propTypes.func,
}

InputField.defaultProps = {}

InputField.displayName = 'InputField'

export default InputField
