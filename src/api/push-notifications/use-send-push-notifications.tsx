import type {AxiosError} from 'axios'
import {createMutation} from 'react-query-kit'

import {client} from '../common'

type Variables = {
  userId: string
  title: string
  body: string
  data?: any
}
type Response = {
  message: string
}

export const useSendPushNotifications = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables =>
    client.post('push-notifications/send', {
      data: variables,
    }),
})
