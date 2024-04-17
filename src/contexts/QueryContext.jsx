import {QueryClientProvider, QueryClient, focusManager} from '@tanstack/react-query'
import {memo, useState} from 'react'
// import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import propTypes from 'prop-types'
import {useAppState, useOnlineManager} from '@/hooks'
import {Platform} from 'react-native'

function onAppStateChange(status) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

export const CONFIG = {
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
}

const QueryProvider = ({children}) => {
  const [queryClient] = useState(() => new QueryClient(CONFIG))
  useOnlineManager()
  useAppState(onAppStateChange)

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {children}
    </QueryClientProvider>
  )
}

QueryProvider.propTypes = {
  children: propTypes.any,
}

export default QueryProvider
