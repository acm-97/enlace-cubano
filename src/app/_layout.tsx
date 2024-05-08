import {useReactNavigationDevTools} from '@dev-plugins/react-navigation'
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import {ThemeProvider} from '@react-navigation/native'
import {StripeProvider} from '@stripe/stripe-react-native'
import Constants from 'expo-constants'
import * as Linking from 'expo-linking'
import {SplashScreen, Stack, useNavigationContainerRef} from 'expo-router'
import {StyleSheet} from 'react-native'
import FlashMessage from 'react-native-flash-message'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import {APIProvider} from '@/api'
import {hydrateAuth, loadSelectedTheme} from '@/core'
import {useThemeConfig} from '@/core/use-theme-config'

export {ErrorBoundary} from 'expo-router'

// Import  global CSS file
import '../../global.css'

export const unstable_settings = {
  initialRouteName: '(app)',
}

hydrateAuth()
loadSelectedTheme()
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const navigationRef = useNavigationContainerRef()
  useReactNavigationDevTools(navigationRef)
  return <RootLayoutNav />
}

function RootLayoutNav() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(app)" options={{headerShown: false}} />
        <Stack.Screen name="login" options={{headerShown: false}} />
        <Stack.Screen name="signup" options={{headerShown: false}} />
        <Stack.Screen name="verify" options={{headerShown: false}} />
        <Stack.Screen
          name="mobile-contacts"
          options={{title: 'Contacts', presentation: 'formSheet'}}
        />
      </Stack>
    </Providers>
  )
}

function Providers({children}: {children: React.ReactNode}) {
  const theme = useThemeConfig()
  return (
    <GestureHandlerRootView style={styles.container} className={theme.dark ? `dark` : undefined}>
      <ThemeProvider value={theme}>
        <APIProvider>
          <StripeProvider
            publishableKey=""
            urlScheme={
              Constants.appOwnership === 'expo' ? Linking.createURL('/--/') : Linking.createURL('')
            } // required for 3D Secure and bank redirects
            merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
          >
            <BottomSheetModalProvider>
              {children}
              <FlashMessage position="top" />
            </BottomSheetModalProvider>
          </StripeProvider>
        </APIProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
