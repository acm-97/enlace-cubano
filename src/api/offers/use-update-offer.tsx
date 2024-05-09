import type {AxiosError} from 'axios'
import {createMutation} from 'react-query-kit'

import {client} from '../common'
import type {OfferType} from './use-add-offer'

type Variables = {id: string; note?: string; status?: string}

type Response = OfferType

export const useUpdateOffer = createMutation<Response, Variables, AxiosError>({
  mutationFn: async ({id, ...variables}) =>
    client.patch(`offers/${id}`, {
      data: variables,
    }),
})
