import propTypes from 'prop-types'
import {GluestackUIProvider} from '@gluestack-ui/themed'
import {config} from '@gluestack-ui/config' // Optional if you want to use default theme
import {Platform, Linking, View} from 'react-native'
import BottomTabs from './bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useTheme} from '@/hooks'
import MyStatusBar from './my-status-bar'
import {SafeAreaView} from 'react-native-safe-area-context'

const PERSISTENCE_KEY = 'NAVIGATION_STATE'

function MainLayout() {
  const [isReady, setIsReady] = useState(Platform.OS === 'web') // Don't persist state on web since it's based on URL
  const [initialState, setInitialState] = useState()
  const {theme, navigatorTheme} = useTheme()

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
    <GluestackUIProvider colorMode={theme ?? 'light'} config={config}>
      <NavigationContainer
        theme={navigatorTheme}
        initialState={initialState}
        onStateChange={state => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}
      >
        <SafeAreaView style={{flex: 1}}>
          <MyStatusBar />
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
