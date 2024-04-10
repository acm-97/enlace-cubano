import propTypes from 'prop-types'
import {GluestackUIProvider, Text, Box} from '@gluestack-ui/themed-native-base'
import {config} from '@gluestack-ui/config' // Optional if you want to use default theme
import {SafeAreaView, StatusBar} from 'react-native'
import {useDeviceContext} from 'twrnc'
import {tw} from '@/lib/utils/settings'

function MainLayout() {
  useDeviceContext(tw)
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar />
        <Box width="100%" justifyContent="center" alignItems="center">
          <Text>Open up App.js to start working on your app</Text>
        </Box>
      </SafeAreaView>
    </GluestackUIProvider>
  )
}

MainLayout.propTypes = {}

MainLayout.defaultProps = {}

MainLayout.displayName = 'MainLayout'

export default MainLayout
