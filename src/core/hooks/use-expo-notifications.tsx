import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import {useEffect, useRef, useState} from 'react'
import {Platform} from 'react-native'

import {useAddPushNotifications} from '@/api/push-notifications'

import {getItem, removeItem, setItem} from '../storage'

export const EXPO_TOKEN = 'expo-token'

export const getExpoToken = () => getItem<Notifications.ExpoPushToken>(EXPO_TOKEN)
export const removeExpoToken = () => removeItem(EXPO_TOKEN)
export const setExpoToken = (value: Notifications.ExpoPushToken) =>
  setItem<Notifications.ExpoPushToken>(EXPO_TOKEN, value)

export function useExpoNotifications() {
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState<Notifications.Notification>()
  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()
  const {mutate} = useAddPushNotifications()

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  })

  const registerForPushNotificationsAsync = async () => {
    let token

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    if (Device.isDevice) {
      const {status: existingStatus} = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const {status} = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      })
      // await AysncStorage.setItem('pushToken', token.data)
      setExpoToken(token)
      mutate({token})
    } else {
      alert('Must use physical device for Push Notifications')
    }

    return token?.data
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token!))

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!)
      Notifications.removeNotificationSubscription(responseListener.current!)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    expoPushToken,
    notification,
  }
}
