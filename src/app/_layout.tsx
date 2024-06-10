import {useReactNavigationDevTools} from '@dev-plugins/react-navigation'
import {Env} from '@env'
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import {ThemeProvider} from '@react-navigation/native'
import {StripeProvider} from '@stripe/stripe-react-native'
import Constants from 'expo-constants'
import * as Linking from 'expo-linking'
import {SplashScreen, Stack, useNavigationContainerRef} from 'expo-router'
import {KeyboardAvoidingView, StyleSheet} from 'react-native'
import FlashMessage from 'react-native-flash-message'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import {APIProvider} from '@/api'
import {hydrateAuth, loadSelectedTheme} from '@/core'
import {useThemeConfig} from '@/core/use-theme-config'
export {ErrorBoundary} from 'expo-router'

// Import  global CSS file
import '../../global.css'

import {Platform} from 'react-native'

export const unstable_settings = {
  initialRouteName: '(client)',
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
        <Stack.Screen name="(client)" options={{headerShown: false}} />
        <Stack.Screen name="(worker)" options={{headerShown: false}} />
        <Stack.Screen name="login" options={{headerShown: false}} />
        <Stack.Screen name="signup" options={{headerShown: false}} />
        <Stack.Screen name="verify" options={{headerShown: false}} />
        <Stack.Screen
          name="cart"
          options={{
            title: 'Carrito',
            animation: 'slide_from_bottom',
            headerBackTitleVisible: false,
          }}
        />
        {Platform.OS === 'ios' && (
          <Stack.Screen
            name="mobile-contacts"
            options={{
              title: 'Contacts',
              animation: 'slide_from_bottom',
              headerBackTitleVisible: false,
            }}
          />
        )}
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
            publishableKey={Env.STRIPE_PUBLISHABLE_KEY}
            urlScheme={`${Env.SCHEME}://${
              Constants.appOwnership === 'expo' ? Linking.createURL('/--/') : Linking.createURL('/')
            }`} // required for 3D Secure and bank redirects
            merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
          >
            <BottomSheetModalProvider>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}
              >
                {children}
              </KeyboardAvoidingView>
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
