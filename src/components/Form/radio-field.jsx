import {tw} from '@/lib/settings'
import {
  RadioIndicator,
  RadioLabel,
  RadioIcon,
  CircleIcon,
  Radio,
  RadioGroup,
  Box,
} from '@gluestack-ui/themed'
import propTypes from 'prop-types'

function RadioField({labelProps, indicatorProps, iconProps, items, orientation, ...props}) {
  return (
    <RadioGroup>
      <Box style={tw.style(`gap-2`, {'flex-row': orientation === 'horizontal'})}>
        {items.map((label, value) => (
          <Radio key={label} value={value} size="md" {...props}>
            <RadioIndicator mr="$2" indicatorProps>
              <RadioIcon as={CircleIcon} strokeWidth={1} {...iconProps} />
            </RadioIndicator>
            <RadioLabel {...labelProps}>{label}</RadioLabel>
          </Radio>
        ))}
      </Box>
    </RadioGroup>
  )
}

RadioField.propTypes = {
  label: propTypes.string,
  labelProps: propTypes.object,
  indicatorProps: propTypes.object,
  iconProps: propTypes.object,
  items: propTypes.array,
  orientation: propTypes.oneOf(['vertical', 'horizontal']),
}

RadioField.defaultProps = {
  orientation: 'vertical',
}

RadioField.displayName = 'RadioField'

export default RadioField
