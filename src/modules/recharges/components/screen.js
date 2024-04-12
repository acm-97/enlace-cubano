import propTypes from 'prop-types'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import NautaScreen from './nauta/screen'
import MovilScreen from './movil/screen'
import {config} from '@gluestack-ui/config'

const Tab = createMaterialTopTabNavigator()

function RechargesScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 14, fontWeight: 600},
        tabBarActiveTintColor: config.tokens.colors.orange500,
        tabBarIndicatorStyle: { backgroundColor: config.tokens.colors.orange500 },
      }}
    >
      <Tab.Screen
        name="Movil"
        component={MovilScreen}
        options={{
          swipeEnabled: false,
        }}
      />
      <Tab.Screen
        name="Nauta"
        component={NautaScreen}
        options={{
          swipeEnabled: false,
        }}
      />
    </Tab.Navigator>
  )
}

RechargesScreen.propTypes = {}

RechargesScreen.defaultProps = {}

RechargesScreen.displayName = 'RechargesScreen'

export default RechargesScreen
