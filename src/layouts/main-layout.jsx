import propTypes from 'prop-types'
import {GluestackUIProvider, Text, Box} from '@gluestack-ui/themed'
import {config} from '@gluestack-ui/config' // Optional if you want to use default theme
import {Platform, SafeAreaView, StatusBar, useColorScheme, Linking} from 'react-native'
import {useDeviceContext} from 'twrnc'
import {NavigatorTheme, tw} from '@/lib/settings'
import BottomTabs from './bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PERSISTENCE_KEY = 'NAVIGATION_STATE'

function MainLayout() {
  useDeviceContext(tw)
  const colorScheme = useColorScheme()
  const [isReady, setIsReady] = useState(Platform.OS === 'web') // Don't persist state on web since it's based on URL
  const [initialState, setInitialState] = useState()

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL()

        if (initialUrl == null) {
          // Only restore state if there's no deep link
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY)
          const state = savedStateString ? JSON.parse(savedStateString) : undefined

          if (state !== undefined) {
            setInitialState(state)
          }
        }
      } finally {
        setIsReady(true)
      }
    }

    if (!isReady) {
      restoreState()
    }
  }, [isReady])

  if (!isReady) {
    return null
  }

  return (
    <GluestackUIProvider colorMode={colorScheme} config={config}>
      <NavigationContainer
        theme={NavigatorTheme}
        initialState={initialState}
        onStateChange={state => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}
      >
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
