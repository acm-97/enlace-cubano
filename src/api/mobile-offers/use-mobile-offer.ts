import type {AxiosError} from 'axios'
import {createQuery} from 'react-query-kit'

import {client} from '../common'
import type {MobileOffer} from './types'

type Variables = {id?: string}
type Response = MobileOffer

export const useMobileOffer = createQuery<Response, Variables, AxiosError>({
  queryKey: ['one-mobile-offer'],
  fetcher: variables => client.get(`stripe/products/${variables.id}`).then(response => response),
})
