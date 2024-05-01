import {Linking} from 'react-native'

export function openLinkInBrowser(url) {
  Linking.canOpenURL(url).then(canOpen => canOpen && Linking.openURL(url))
}

export const createSelectors = _store => {
  const store = _store
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    store.use[k] = () => store(s => s[k])
  }

  return store
}
