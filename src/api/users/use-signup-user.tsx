import type {AxiosError} from 'axios'
import {createMutation} from 'react-query-kit'

import type {PhoneNumber, UserType} from '@/core/auth/utils'

import {client} from '../common'

type Variables = {
  firstName: string
  lastName: string
  phoneNumber: PhoneNumber
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

type VariablesV = {
  code: string
  phoneNumber?: PhoneNumber
  id: string
}
type ResponseV = {verified: boolean}

export const useVerifyUser = createMutation<ResponseV, VariablesV, AxiosError>({
  mutationFn: async ({id, ...variables}) =>
    client.patch(`users/${id}/verify`, {
      data: variables,
    }),
})
