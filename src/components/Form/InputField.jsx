import {
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
} from '@gluestack-ui/themed'
import propTypes from 'prop-types'
import {Text} from 'react-native'

function InputField({
  errorText,
  helperText,
  label,
  inputWrapperProps,
  formBaseProps,
  labelProps,
  ...props
}) {
  return (
    <FormControl size="md" {...formBaseProps}>
      <FormControlLabel mb="$1" {...labelProps}>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input {...inputWrapperProps}>
        <InputFieldUI {...props} />
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
}

InputField.defaultProps = {}

InputField.displayName = 'InputField'

export default InputField
