import {useEffect} from 'react'
import useLatest from './useLatest'
import {isDev, isFunction} from '@/lib/utils'

const useUnmount = fn => {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useUnmount expected parameter is a function, got ${typeof fn}`)
    }
  }

  const fnRef = useLatest(fn)

  useEffect(
    () => () => {
      fnRef.current()
    },
    [],
  )
}

export default useUnmount
