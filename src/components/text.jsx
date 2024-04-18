import {tw} from '@/lib/settings'
import {Text as TextUi} from '@gluestack-ui/themed'
import propTypes from 'prop-types'

function Text({style, children, ...props}) {
  return (
    <TextUi {...props} style={tw.style(`text-dark dark:text-white`, style)}>
      {children}
    </TextUi>
  )
}

Text.propTypes = {
  style: propTypes.object,
  children: propTypes.any,
}

Text.defaultProps = {}

Text.displayName = 'Text'

export default Text
