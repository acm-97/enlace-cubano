import propTypes from 'prop-types'
import QueryProvider from './QueryContext'
import {useTheme} from '@/hooks'
import {config} from '@gluestack-ui/config' // Optional if you want to use default theme
import {GluestackUIProvider} from '@gluestack-ui/themed'

function Providers({children}) {
  const {theme} = useTheme()
  return (
    <GluestackUIProvider colorMode={theme ?? 'light'} config={config}>
      <QueryProvider>{children}</QueryProvider>
    </GluestackUIProvider>
  )
}

Providers.propTypes = {
  children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node]).isRequired,
}

export default Providers
