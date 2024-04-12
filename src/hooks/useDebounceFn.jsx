import {useMemo} from 'react'
import {debounce, isDev, isFunction} from '@/lib/utils'
import {useLatest, useUnmount} from '.'

function useDebounceFn(fn, options) {
  if (isDev) {
    if (!isFunction(fn)) {
      console.error(`useDebounceFn expected parameter is a function, got ${typeof fn}`)
    }
  }

  const fnRef = useLatest(fn)

  const wait = options?.wait ?? 1000

  const debounced = useMemo(
    () =>
      debounce(
        (...args) => {
          return fnRef.current(...args)
        },
        wait,
        options,
      ),
    [],
  )

  useUnmount(() => {
    debounced.cancel()
  })

  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  }
}

export default useDebounceFn
