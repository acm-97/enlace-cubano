import propTypes from 'prop-types'
import {GluestackUIProvider, Text, Box} from '@gluestack-ui/themed'
import {config} from '@gluestack-ui/config' // Optional if you want to use default theme
import {SafeAreaView, StatusBar} from 'react-native'
import {useDeviceContext} from 'twrnc'
import {NavigatorTheme, tw} from '@/lib/settings'
import BottomTabs from './bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'

function MainLayout() {
  useDeviceContext(tw)
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer theme={NavigatorTheme}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar />
          <BottomTabs />
        </SafeAreaView>
      </NavigationContainer>
    </GluestackUIProvider>
  )
}

MainLayout.propTypes = {}

MainLayout.defaultProps = {}

MainLayout.displayName = 'MainLayout'

export default MainLayout
