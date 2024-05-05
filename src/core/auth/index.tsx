import {create} from 'zustand'

import {createSelectors} from '../utils'
import type {TokenType, UserType} from './utils'
import {getToken, removeToken, setToken} from './utils'

interface AuthState {
  token: TokenType | null
  user: UserType | null
  status: 'idle' | 'signOut' | 'signIn'
  saveUser: (user: UserType) => void
  signIn: (data: TokenType) => void
  signOut: () => void
  hydrate: () => void
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  user: null,
  token: null,
  saveUser: user => {
    set({user})
  },
  signIn: token => {
    setToken(token)
    set({status: 'signIn', token})
  },
  signOut: () => {
    removeToken()
    set({status: 'signOut', token: null})
  },
  hydrate: () => {
    try {
      const userToken = getToken()
      if (userToken !== null) {
        get().signIn(userToken)
      } else {
        get().signOut()
        set({user: null})
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}))

export const useAuth = createSelectors(_useAuth)

export const signOut = () => _useAuth.getState().signOut()
export const signIn = (token: TokenType) => _useAuth.getState().signIn(token)
export const hydrateAuth = () => _useAuth.getState().hydrate()
export const saveUser = (user: UserType) => _useAuth.getState().saveUser(user)