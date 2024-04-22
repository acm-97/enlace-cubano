import propTypes from 'prop-types'
import RechargeFormScreen from './movil/recharge-form-screen'
import TopTabsNavigator from './top-tabs-navigator'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Button} from '@/components'
import ContactList from './movil/contact-list'

const MovilStack = createNativeStackNavigator()

function RechargesScreen() {
  return (
    <MovilStack.Navigator initialRouteName="RechargesList">
      <MovilStack.Group>
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
      </MovilStack.Group>
      <MovilStack.Group screenOptions={{presentation: 'modal'}}>
        <MovilStack.Screen
          name="Contacts"
          options={{
            title: 'Contactos',
            // headerRight: ({ }) => <Button label="Listo" variant="link" onPress={()} />
            headerShadowVisible: false,
          }}
          component={ContactList}
        />
      </MovilStack.Group>
    </MovilStack.Navigator>
  )
}

RechargesScreen.propTypes = {}

RechargesScreen.defaultProps = {}

RechargesScreen.displayName = 'RechargesScreen'

export default RechargesScreen
