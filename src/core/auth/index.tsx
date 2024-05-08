import {create} from 'zustand'

import {createSelectors} from '../utils'
import type {TokenType, UserType} from './utils'
import {getToken, removeToken, setToken} from './utils'

interface AuthState {
  token: TokenType | null
  user: UserType | null
  status: 'idle' | 'signOut' | 'signIn'
  saveUser: (user: UserType) => void
  signIn: (data: UserType) => void
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
  signIn: user => {
    setToken({accessToken: user.accessToken})
    set({status: 'signIn', token: {accessToken: user.accessToken}, user})
  },
  signOut: () => {
    removeToken()
    set({status: 'signOut', token: null, user: null})
  },
  hydrate: () => {
    try {
      const userToken = getToken()
      if (userToken !== null) {
        setToken(userToken)
        set({status: 'signIn', token: userToken})
      } else {
        get().signOut()
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}))

export const useAuth = createSelectors(_useAuth)

export const signOut = () => _useAuth.getState().signOut()
export const signIn = (token: UserType) => _useAuth.getState().signIn(token)
export const hydrateAuth = () => _useAuth.getState().hydrate()
export const saveUser = (user: UserType) => _useAuth.getState().saveUser(user)
