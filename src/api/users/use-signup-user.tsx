import type {AxiosError} from 'axios'
import {createMutation} from 'react-query-kit'

import type {UserType} from '@/core/auth/utils'

import {client} from '../common'

type Variables = Omit<UserType, 'id'>
type Response = {
  _id: string
  email: string
}

export const useSignupUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables =>
    client.post('users/register', {
      data: variables,
    }),
})
