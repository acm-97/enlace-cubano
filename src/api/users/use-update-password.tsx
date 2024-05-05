import type {AxiosError} from 'axios'
import {createMutation} from 'react-query-kit'

import {client} from '../common'

type Variables = {currentPassword: string; newPassword: string; id?: string}
type Response = {}

export const useUpdatePassword = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables => {
    const {id} = variables
    return client.patch(`users/update-password/${id}`, {
      data: variables,
    })
  },
})
