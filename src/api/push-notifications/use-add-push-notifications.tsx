import type {AxiosError} from 'axios'
import {createMutation} from 'react-query-kit'

import {client} from '../common'

export type PushNotification = {
  id: string
  userId: string[]
  token: String
}

type Variables = {token: String}
type Response = PushNotification

export const useAddPushNotifications = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables =>
    client.post('push-notifications', {
      data: variables,
    }),
})
