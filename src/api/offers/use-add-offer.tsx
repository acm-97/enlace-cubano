import type {AxiosError} from 'axios'
import {createMutation} from 'react-query-kit'

import {client} from '../common'

export type OfferType = {
  id: string
  description: string[]
  amount: number
  status: 'pending' | 'completed' | 'rejected' | 'processing'
  colored_parts: string[]
  phoneNumber: string
  offerId: string
  updatedAt: string
}

type Variables = Omit<OfferType, 'status, updatedAt, id'>

type Response = OfferType

export const useAddOffer = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables =>
    client.post('offers', {
      data: variables,
    }),
})
