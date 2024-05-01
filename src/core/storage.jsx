import {MMKV} from 'react-native-mmkv'

export const storage = new MMKV()

export function getItem(key) {
  const value = storage.getString(key)
  return value ? JSON.parse(value) || null : null
}

export async function setItem(key, value) {
  storage.set(key, JSON.stringify(value))
}

export async function removeItem(key) {
  storage.delete(key)
}
