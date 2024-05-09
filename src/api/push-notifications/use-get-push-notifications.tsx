import type {AxiosError} from 'axios'
import {createQuery} from 'react-query-kit'

import {client} from '../common'
import type {PushNotification} from './use-add-push-notifications'

type Variables = {id: string}
type Response = PushNotification[]

export const useGetPushNotifications = createQuery<Response, Variables, AxiosError>({
  queryKey: ['push-notifications'],
  fetcher: ({id}) =>
    client.get(`push-notifications/${id}`).then(response => response.pushNotifications),
})
