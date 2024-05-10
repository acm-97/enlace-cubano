import {useEffect} from 'react'
import {PermissionsAndroid, Platform} from 'react-native'
import type {Contact} from 'react-native-contacts'
import Contacts from 'react-native-contacts'
import {create} from 'zustand'

interface ContactsState {
  isLoading: boolean
  isError: boolean
  contacts: any[]
  setIsLoading: (isLoading: boolean) => void
  setIsError: (isError: boolean) => void
  setContacts: (contacts: Contact[]) => void
}

export const contactsState = create<ContactsState>((set, get) => ({
  isLoading: false,
  isError: false,
  contacts: [],
  setIsLoading: (isLoading: boolean) => set({isLoading}),
  setIsError: (isError: boolean) => set({isError}),
  setContacts: (contacts: Contact[]) => set({contacts}),
}))

export function useContacts(enabled: boolean) {
  const setIsLoading = contactsState(state => state.setIsLoading)
  const setIsError = contactsState(state => state.setIsError)
  const setContacts = contactsState(state => state.setContacts)

  const getContacts = () => {
    Contacts.getAll()
      .then(_contacts => {
        // work with contacts
        // console.log(contacts)
        const newContacts = _contacts
          ?.map((item, index) => {
            return {
              ...item,
              value: item?.givenName ?? item?.familyName ?? '#',
              key: index,
            }
          })
          ?.sort((a, b) => a?.value?.localeCompare(b?.value))

        setContacts(newContacts)
        setIsError(false)
      })
      .catch(e => {
        // console.log(e)
        setIsError(true)
      })
  }

  useEffect(() => {
    if (enabled) {
      setIsLoading(true)
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Please accept',
        })
          .then(res => {
            console.log('Permission: ', res)
            getContacts()
            setIsError(false)
          })
          .catch(error => {
            console.error('Permission error: ', error)
            setIsError(true)
          })
      } else {
        getContacts()
      }
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])
}
