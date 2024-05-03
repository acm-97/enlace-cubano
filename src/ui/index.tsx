import {cssInterop} from 'nativewind'
import Svg from 'react-native-svg'

export * from './button'
export * from './checkbox'
export {default as colors} from './colors'
export {default as Divider} from './divider'
export * from './focus-aware-status-bar'
export {default as Icon} from './icon'
export * from './image'
export * from './input'
export * from './list'
export * from './modal'
export * from './progress-bar'
export * from './select'
export * from './text'
export * from './top-tabs'
export * from './utils'

// export base components from react-native
export {ActivityIndicator, Pressable, ScrollView, TouchableOpacity, View} from 'react-native'
export {SafeAreaView} from 'react-native-safe-area-context'

//Apply cssInterop to Svg to resolve className string into style
cssInterop(Svg, {
  className: {
    target: 'style',
  },
})
