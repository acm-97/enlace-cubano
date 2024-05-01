import {getItem, removeItem, setItem} from '@/core/storage'

const TOKEN = 'token'

export const getToken = () => getItem(TOKEN)
export const removeToken = () => removeItem(TOKEN)
export const setToken = value => setItem(TOKEN, value)
