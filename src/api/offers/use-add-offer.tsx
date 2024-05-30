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
  userId: string
  updatedAt: string
  note: string
}

type Variables = {items: Omit<OfferType, 'status' | 'updatedAt' | 'id' | 'note' | 'userId'>[]}

type Response = OfferType

export const useAddOffer = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables =>
    client.post('offers', {
      data: variables,
    }),
})
