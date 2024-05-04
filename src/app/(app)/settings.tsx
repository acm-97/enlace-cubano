import {Env} from '@env'
import {useRouter} from 'expo-router'

import {Item} from '@/components/item'
import {ItemsContainer} from '@/components/items-container'
import {LanguageItem} from '@/components/settings/language-item'
import {ThemeItem} from '@/components/settings/theme-item'
import {translate, useAuth} from '@/core'
import {colors, FocusAwareStatusBar, Icon, ScrollView, Text, View} from '@/ui'
// import {Github, Rate, Share, Support, Website} from '@/ui/icons'

export default function Settings() {
  const signOut = useAuth.use.signOut()
  const {push} = useRouter()
  const user = useAuth.use.user()

  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="flex-1 px-4 pt-16 ">
          <Text className="text-xl font-bold">{translate('settings.title')}</Text>
          <ItemsContainer title="settings.generale">
            <Item
              text="settings.account"
              value={user?.email}
              icon={<Icon as="MaterialCommunityIcons" name="account-cog-outline" size={22} />}
              onPress={() => push('/account/')}
            />
            <LanguageItem />
            <ThemeItem />
          </ItemsContainer>

          <ItemsContainer title="settings.about">
            <Item text="settings.app_name" value={Env.NAME} />
            <Item text="settings.version" value={Env.VERSION} />
          </ItemsContainer>

          {/* <ItemsContainer title="settings.support_us">
            <Item text="settings.share" icon={<Share color={iconColor} />} onPress={() => {}} />
            <Item text="settings.rate" icon={<Rate color={iconColor} />} onPress={() => {}} />
            <Item text="settings.support" icon={<Support color={iconColor} />} onPress={() => {}} />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item text="settings.privacy" onPress={() => {}} />
            <Item text="settings.terms" onPress={() => {}} />
            <Item text="settings.github" icon={<Github color={iconColor} />} onPress={() => {}} />
            <Item text="settings.website" icon={<Website color={iconColor} />} onPress={() => {}} />
          </ItemsContainer> */}

          <View className="my-8">
            <ItemsContainer>
              <Item
                text="settings.logout"
                icon={<Icon as="MaterialCommunityIcons" name="logout" size={20} />}
                onPress={signOut}
              />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
