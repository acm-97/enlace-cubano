import type {AxiosError} from 'axios'
import {createQuery} from 'react-query-kit'

import {client} from '../common'
import type {MobileOffer} from './types'

type Response = MobileOffer[]
type Variables = void // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const useMobileOffers = createQuery<Response, Variables, AxiosError>({
  queryKey: ['products'],
  fetcher: () => {
    return client.get(`products`).then(response => response.data.products)
  },
})
