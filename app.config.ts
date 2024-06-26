import type {ConfigContext, ExpoConfig} from '@expo/config'

import {ClientEnv, Env} from './env'

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: Env.SCHEME,
  slug: 'enlace-cubano',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#2E3C4B',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    googleServicesFile: './googleServices/GoogleService-Info.plist',
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
    entitlements: {
      'com.apple.developer.contacts.notes': true,
      'com.apple.developer.networking.wifi-info': true,
    },
    infoPlist: {
      NSContactsUsageDescription: 'Allow $(PRODUCT_NAME) to access your contacts.',
    },
  },
  experiments: {
    typedRoutes: true,
  },
  android: {
    googleServicesFile: './googleServices/google-services.json',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#2E3C4B',
    },
    package: Env.PACKAGE,
    permissions: [
      'android.permission.WRITE_CONTACTS',
      'android.permission.READ_PROFILE',
      'android.permission.READ_CONTACTS',
    ],
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    [
      '@stripe/stripe-react-native',
      {
        merchantIdentifier: [],
        enableGooglePay: true,
      },
    ],
    [
      'expo-font',
      {
        fonts: ['./assets/fonts/Inter.ttf'],
      },
    ],
    'expo-localization',
    'expo-router',
    [
      'expo-build-properties',
      {
        android: {
          kotlinVersion: '1.7.22', // this is for softinput package
        },
      },
    ],
    [
      'app-icon-badge',
      {
        enabled: Env.APP_ENV !== 'production',
        badges: [
          {
            text: Env.APP_ENV,
            type: 'banner',
            color: 'white',
          },
          {
            text: Env.VERSION.toString(),
            type: 'ribbon',
            color: 'white',
          },
        ],
      },
    ],
  ],
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
})
