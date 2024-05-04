import {Env} from '@env'
import axios from 'axios'

import {getToken} from '@/core/auth/utils'

export const client = axios.create({
  baseURL: Env.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
  },
})

client.interceptors.request.use(config => {
  // console.log('axios request ===', config)
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token.accessToken}`
  return config
})
