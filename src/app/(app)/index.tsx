import {useRouter} from 'expo-router'
import * as React from 'react'

import {Item} from '@/components/item'
import {ItemsContainer} from '@/components/items-container'
import {FocusAwareStatusBar, Icon, ScrollView, Text, View} from '@/ui'

const menu = [
  {
    label: 'offers.mobile-option',
    path: '/mobile',
    IconComponent: <Icon as="AntDesign" name="mobile1" size={15} />,
  },
  {
    label: 'offers.nauta-option',
    path: '/nauta',
    IconComponent: <Icon as="MaterialIcons" name="router" size={18} />,
  },
]

type Props = {}
export default function Offers({}: Props) {
  const {push} = useRouter()

  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="flex-1 px-4">
          <ItemsContainer title="offers.recharges">
            {menu.map(({label, path, IconComponent}) => (
              // @ts-ignore
              <Item key={path} text={label} icon={IconComponent} onPress={() => push(path)} />
            ))}
          </ItemsContainer>
        </View>
      </ScrollView>
    </>
  )
}
