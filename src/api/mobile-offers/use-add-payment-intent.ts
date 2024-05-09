import type {AxiosError} from 'axios'
import {createMutation} from 'react-query-kit'

import {client} from '../common'

type Variables = {amount: number}
type Response = {
  paymentIntent: string
}

export const useAddPaymentIntent = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables =>
    client.post('stripe/payment-intent', {
      data: variables,
    }),
})
