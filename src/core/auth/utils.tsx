import {getItem, removeItem, setItem} from '@/core/storage'

const TOKEN = 'token'

export type TokenType = {
  accessToken: string
  // refreshToken: string
}

export type UserType = {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
}

export const getToken = () => getItem<TokenType>(TOKEN)
export const removeToken = () => removeItem(TOKEN)
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value)
