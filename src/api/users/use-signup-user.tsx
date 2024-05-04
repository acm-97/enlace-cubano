import type {AxiosError} from 'axios'
import {createMutation} from 'react-query-kit'

import type {UserType} from '@/core/auth/utils'

import {client} from '../common'

type Variables = {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  password: string
}
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
