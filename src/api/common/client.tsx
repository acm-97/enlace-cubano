import {Env} from '@env'
import type {AxiosRequestConfig} from 'axios'
import axios from 'axios'

import {hydrateAuth, signOut} from '@/core'
import {getToken} from '@/core/auth/utils'
import {showErrorMessage} from '@/ui'

type Request = {
  data: any
  config?: AxiosRequestConfig
}

export const api = axios.create({
  baseURL: Env.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
  },
})

api.interceptors.request.use(config => {
  // console.log('axios request ===', config)
  const token = getToken()
  if (token?.accessToken) config.headers.Authorization = `Bearer ${token.accessToken}`
  return config
})
api.interceptors.response.use(
  config => {
    // Access custom headers
    // const newAccessToken = config.headers['new-access-token']

    // if (typeof newAccessToken !== 'undefined') {
    // Cookies.set(ACCESS_TOKEN_KEY, newAccessToken)
    // set(ACCESS_TOKEN_KEY, newAccessToken)
    // }

    return config
  },
  e => {
    if (e.response?.status === 400) {
      showErrorMessage(e.response?.data.message)
    }
    if (e.response?.status === 401) {
      signOut()
      hydrateAuth()
    }

    return Promise.reject(e)
  },
)

class Client {
  async get(url: string, config?: AxiosRequestConfig) {
    return await api.get(url, config).then(res => res.data)
  }

  async getOne(url: string) {
    return await api.get(url).then(res => res.data)
  }

  async post(url: string, {data, config}: Request) {
    return await api.post(url, data, config).then(res => res.data)
  }

  async patch(url: string, {data, config}: Request) {
    return await api.patch(url, data, config).then(res => res.data)
  }

  async delete(url: string, config?: AxiosRequestConfig) {
    return await api.delete(url, config).then(res => res.data)
  }
}

export default new Client()
