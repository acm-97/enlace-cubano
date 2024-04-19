import {createNativeStackNavigator} from '@react-navigation/native-stack'
import propTypes from 'prop-types'
import AccountOptionsScreen from './account-options-screen'
import InfoSecurityNavigator from './info-security-navegator'
import AppearanceModal from './appearance-modal'
import {Button} from '@/components'
import {HeaderBackButton} from '@react-navigation/elements'
// import {Text} from 'react-native'

const AccountStack = createNativeStackNavigator()

function AccountScreen({navigation}) {
  return (
    <AccountStack.Navigator initialRouteName="AccountOptions">
      <AccountStack.Screen
        name="AccountOptions"
        options={{headerShown: false}}
        component={AccountOptionsScreen}
      />
      <AccountStack.Screen
        name="InfoSecurity"
        options={{
          title: '',
          headerBackTitle: 'Atrás',
        }}
        component={InfoSecurityNavigator}
      />
      {/* <AccountStack.Screen
        name="Appearance"
        options={{headerShown: false, presentation: 'formSheet'}}
        component={AppearanceModal}
      /> */}
    </AccountStack.Navigator>
  )
}

AccountScreen.propTypes = {
  navigation: propTypes.object,
}

AccountScreen.defaultProps = {}

AccountScreen.displayName = 'AccountScreen'

export default AccountScreen
