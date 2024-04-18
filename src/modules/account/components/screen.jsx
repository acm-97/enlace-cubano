import {createNativeStackNavigator} from '@react-navigation/native-stack'
import propTypes from 'prop-types'
import AccountOptionsScreen from './account-options-screen'
import AppearanceModal from './appearance-modal'
// import {Text} from 'react-native'

const AccountStack = createNativeStackNavigator()

function AccountScreen() {
  return (
    <AccountStack.Navigator initialRouteName="AccountOptions">
      <AccountStack.Screen
        name="AccountOptions"
        options={{headerShown: false}}
        component={AccountOptionsScreen}
      />
      {/* <AccountStack.Screen
        name="Appearance"
        options={{headerShown: false, presentation: 'formSheet'}}
        component={AppearanceModal}
      /> */}
    </AccountStack.Navigator>
  )
}

AccountScreen.propTypes = {}

AccountScreen.defaultProps = {}

AccountScreen.displayName = 'AccountScreen'

export default AccountScreen
