import {useMMKVBoolean} from 'react-native-mmkv'

import {storage} from '../core/storage'

const IS_FIRST_TIME = 'IS_FIRST_TIME'

export const useIsFirstTime = () => {
  const [isFirstTime, setIsFirstTime] = useMMKVBoolean(IS_FIRST_TIME, storage)
  if (isFirstTime === undefined) {
    return [true, setIsFirstTime]
  }
  return [isFirstTime, setIsFirstTime]
}
