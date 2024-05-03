import type {AxiosError} from 'axios'
import {createMutation} from 'react-query-kit'

import {client} from '../common'
import type {MobileOffer} from './types'

type Variables = {description: string; price: string; offerId: number}
type Response = MobileOffer

export const useAddMobileOffer = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables =>
    client({
      url: 'products/add',
      method: 'POST',
      data: variables,
    }).then(response => response.data),
})
