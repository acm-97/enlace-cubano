import type {AxiosError} from 'axios'
import {createQuery} from 'react-query-kit'

import {client} from '../common'
import type {OfferType} from './use-add-offer'

type Variables = {}
type Response = OfferType[]

export const useGetOffers = createQuery<Response, Variables, AxiosError>({
  queryKey: ['offers-history'],
  fetcher: () => client.get(`offers`).then(response => response.offers),
  refetchOnWindowFocus: 'always',
  refetchOnMount: 'always',
  refetchOnReconnect: 'always',
})
