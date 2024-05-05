import type {AxiosError} from 'axios'
import {createMutation} from 'react-query-kit'

import type {PhoneNumber, UserType} from '@/core/auth/utils'

import {client} from '../common'

type Variables = {email?: string; phoneNumber?: PhoneNumber; id?: string}
type Response = UserType

export const useUpdateUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables => {
    const {id} = variables
    return client.patch(`users/${id}`, {
      data: variables,
    })
  },
})
