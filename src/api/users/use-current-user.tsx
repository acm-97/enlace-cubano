import type {AxiosError} from 'axios'
import {createQuery} from 'react-query-kit'

import type {UserType} from '@/core/auth/utils'

import {client} from '../common'

type Variables = void
type Response = UserType

export const useCurrentUser = createQuery<Response, Variables, AxiosError>({
  queryKey: ['auth-user'],
  fetcher: () => {
    return client.get(`users/current`).then(response => response.data)
  },
})
