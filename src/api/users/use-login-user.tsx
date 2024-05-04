import type {AxiosError} from 'axios'
import {createMutation} from 'react-query-kit'

import {client} from '../common'

type Variables = {email: string; password: string}
type Response = {accessToken: string}

export const useLoginUser = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables =>
    client({
      url: 'users/login',
      method: 'POST',
      data: variables,
    }).then(response => response.data),
})
