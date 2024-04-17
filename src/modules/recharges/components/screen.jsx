import propTypes from 'prop-types'
import RechargeFormScreen from './movil/recharge-form-screen'
import TopTabsNavigator from './top-tabs-navigator'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const MovilStack = createNativeStackNavigator()

function RechargesScreen() {
  return (
    <MovilStack.Navigator>
      <MovilStack.Screen
        name="RechargesList"
        options={{headerShown: false, title: 'Lista de Recargas'}}
        component={TopTabsNavigator}
      />
      <MovilStack.Screen
        name="RechargeMovilForm"
        options={{title: ''}}
        component={RechargeFormScreen}
      />
    </MovilStack.Navigator>
  )
}

RechargesScreen.propTypes = {}

RechargesScreen.defaultProps = {}

RechargesScreen.displayName = 'RechargesScreen'

export default RechargesScreen
