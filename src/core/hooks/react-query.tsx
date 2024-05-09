import NetInfo from '@react-native-community/netinfo'
import {useFocusEffect} from '@react-navigation/native'
import {onlineManager} from '@tanstack/react-query'
import {useCallback, useEffect, useRef, useState} from 'react'
import type {AppStateStatus} from 'react-native'
import {AppState, Platform} from 'react-native'

export function useAppState(onChange: (status: AppStateStatus) => void) {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onChange)
    return () => {
      subscription.remove()
    }
  }, [onChange])
}

export function useOnlineManager() {
  useEffect(() => {
    // React Query already supports on reconnect auto refetch in web browser
    if (Platform.OS !== 'web') {
      return NetInfo.addEventListener((state: any) => {
        onlineManager.setOnline(
          state.isConnected != null && state.isConnected && Boolean(state.isInternetReachable),
        )
      })
    }
  }, [])
}

export function useRefreshByUser(refetch: () => Promise<unknown>) {
  const [isRefetchingByUser, setIsRefetchingByUser] = useState(false)

  async function refetchByUser() {
    setIsRefetchingByUser(true)

    try {
      await refetch()
    } finally {
      setIsRefetchingByUser(false)
    }
  }

  return {
    isRefetchingByUser,
    refetchByUser,
  }
}

export function useRefreshOnFocus(refetch: () => void) {
  const enabledRef = useRef(false)

  useFocusEffect(
    useCallback(() => {
      if (enabledRef.current) {
        refetch()
      } else {
        enabledRef.current = true
      }
    }, [refetch]),
  )
}
