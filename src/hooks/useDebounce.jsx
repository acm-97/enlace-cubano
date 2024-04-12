import {useEffect, useState} from 'react'
import {useDebounceFn} from '.'

/**
 * A hook that deal with the debounced value.
 * @param {T} value
 * @param {{wait: number, leading: boolean trailing: boolean, maxWait: number}} options
 **/

function useDebounce(value, options) {
  const [debounced, setDebounced] = useState(value)

  const {run} = useDebounceFn(() => {
    setDebounced(value)
  }, options)

  useEffect(() => {
    run()
  }, [value])

  return debounced
}

export default useDebounce
