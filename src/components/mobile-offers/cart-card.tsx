import React, {useMemo} from 'react'
import {twMerge} from 'tailwind-merge'

import type {CartItem} from '@/app/cart'
import {useCart} from '@/hooks/use-cart'
import {contactsState} from '@/hooks/use-contacts'
import {Icon, Text, TouchableOpacity, View} from '@/ui'

type Props = {item: CartItem; index: number}
export default function CartCard({item, index}: Props) {
  const contacts = contactsState(state => state.contacts)
  const removeItem = useCart.use.removeItem()

  const name = useMemo(() => {
    return contacts.find(contact =>
      contact.phoneNumbers.some((phone: any) => phone?.number?.includes(item.phoneNumber)),
    )?.label
  }, [contacts, item.phoneNumber])

  return (
    <View className="flex-row items-center justify-between gap-3 border-b border-neutral-200 p-4 dark:border-neutral-700">
      <View>
        {name && <Text className="text-lg font-bold">{name}</Text>}
        <Text className="font-bold">+53 {item.phoneNumber}</Text>
        <View className="max-w-[80%] flex-row flex-wrap gap-1">
          {item.description_parts.map((part, i) => (
            <Text key={`description-${i}`} className={twMerge('text-xs opacity-50 font-semibold')}>
              {part}
            </Text>
          ))}
        </View>
      </View>
      <View className="flex-row items-center gap-2">
        <Text className="text-xl font-bold">${item.amount}</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={() => removeItem(index)}>
          <Icon as="SimpleLineIcons" name="trash" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
