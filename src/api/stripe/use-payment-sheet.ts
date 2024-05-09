import type {AxiosError} from 'axios'
import {createMutation} from 'react-query-kit'

import {client} from '../common'

type Variables = {amount: number}
type Response = {
  paymentIntent: string
  clientSecret: string
  ephemeralKey: string
}

export const usePaymentSheet = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables =>
    client.post('stripe/payment-sheet', {
      data: variables,
    }),
})
