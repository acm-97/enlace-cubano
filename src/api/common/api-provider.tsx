import {useReactQueryDevTools} from '@dev-plugins/react-query'
import {focusManager, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import * as React from 'react'
import type {AppStateStatus} from 'react-native'
import {Platform} from 'react-native'

import {useAppState, useOnlineManager} from '@/core/hooks/react-query'

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

export const queryClient = new QueryClient()

export function APIProvider({children}: {children: React.ReactNode}) {
  useOnlineManager()
  useAppState(onAppStateChange)
  useReactQueryDevTools(queryClient)

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
