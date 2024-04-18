import {tw} from '@/lib/settings'
import {ButtonSpinner, Button as ButtonUI, ButtonText, ButtonIcon} from '@gluestack-ui/themed'
import propTypes from 'prop-types'

function Button({startIcon, endIcon, label, labelProps, isLoading, variant, ...props}) {
  return (
    <ButtonUI
      size="md"
      variant={variant}
      {...props}
      style={tw.style(
        `self-center`,
        {'bg-orange-500': variant === 'solid', 'border-orange-500': variant === 'outline'},
        props.style,
      )}
    >
      {isLoading ? <ButtonSpinner mr="$1" /> : startIcon && <ButtonIcon as={startIcon} />}
      <ButtonText
        {...labelProps}
        style={tw.style(
          {'text-orange-500': variant === 'link' || variant === 'outline'},
          labelProps?.style,
        )}
      >
        {label}{' '}
      </ButtonText>
      {endIcon && <ButtonIcon as={endIcon} />}
    </ButtonUI>
  )
}

Button.propTypes = {
  startIcon: propTypes.any,
  endIcon: propTypes.any,
  label: propTypes.string,
  isLoading: propTypes.bool,
  labelProps: propTypes.object,
  style: propTypes.object,
  variant: propTypes.oneOf(['solid', 'outlne', 'link']),
}

Button.defaultProps = {
  variant: 'solid',
}

Button.displayName = 'Button'

export default Button
