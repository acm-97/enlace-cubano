import type {AxiosError} from 'axios'
import {createQuery} from 'react-query-kit'

import {client} from '../common'

type Variables = {}
type Response = {
  exp_month: number
  exp_year: number
  last4: number
  type: string
}[]

export const usePaymentMethods = createQuery<Response, Variables, AxiosError>({
  queryKey: ['payment-methods'],
  fetcher: () => {
    return client.get(`stripe/payment-methods`).then(response => response.paymentMethods)
  },
  refetchOnWindowFocus: 'always',
})
