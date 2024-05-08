import {getItem, removeItem, setItem} from '@/core/storage'

const TOKEN = 'token'

export type TokenType = {
  accessToken: string
  // refreshToken: string
}

export type PhoneNumber = {
  number: string
  code: string
  country: string
}

export type UserType = {
  id: string
  firstName: string
  lastName: string
  phoneNumber: PhoneNumber
  email: string
  customerId: string
  verified: boolean
  accessToken: string
}

export const getToken = () => getItem<TokenType>(TOKEN)
export const removeToken = () => removeItem(TOKEN)
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value)
