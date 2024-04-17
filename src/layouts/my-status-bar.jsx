import {useTheme} from '@/hooks'
import React from 'react'
import {StyleSheet, View, StatusBar, Platform, SafeAreaView} from 'react-native'

export default function MyStatusBar() {
  const {navigatorTheme, theme} = useTheme()
  return (
    <View style={{backgroundColor: navigatorTheme.colors.background}}>
      <SafeAreaView>
        <StatusBar
          translucent
          backgroundColor={navigatorTheme.colors.background}
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
      </SafeAreaView>
    </View>
  )
}

// const STATUSBAR_HEIGHT = StatusBar.currentHeight
// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   statusBar: {
//     // height: STATUSBAR_HEIGHT,
//     backgroundColor: '#000',
//   },
//   appBar: {
//     backgroundColor: '#000',
//     // height: APPBAR_HEIGHT,
//   },
//   content: {
//     flex: 1,
//     backgroundColor: '#33373B',
//   },
// })
