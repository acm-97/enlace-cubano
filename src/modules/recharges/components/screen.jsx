import propTypes from 'prop-types'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import NautaScreen from './nauta/screen'
import MovilScreen from './movil/screen'
import {config} from '@gluestack-ui/config'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {useTheme} from '@/hooks'

const menu = [
  {label: 'Movil', icon: 'smartphone', Component: MovilScreen},
  {label: 'Nauta', icon: 'router', Component: NautaScreen},
]

const Tab = createMaterialTopTabNavigator()

function RechargesScreen() {
  const {theme, navigatorTheme} = useTheme()
  const {orange50, orange200} = config.tokens.colors

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarItemStyle: {flexDirection: 'row', alignItems: 'center'},
        tabBarLabelStyle: {fontSize: 14, fontWeight: 600},
        tabBarActiveTintColor: navigatorTheme.colors.primary,
        tabBarPressColor: theme === 'dark' ? orange200 : orange50,
        tabBarPressOpacity: 0.5,
      }}
    >
      {menu.map(({label, icon, Component}) => (
        <Tab.Screen
          key={label}
          name={label}
          component={Component}
          options={{
            swipeEnabled: false,
            tabBarLabel: label,
            tabBarIcon: ({color, size}) => <MaterialIcons name={icon} color={color} size={20} />,
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

RechargesScreen.propTypes = {}

RechargesScreen.defaultProps = {}

RechargesScreen.displayName = 'RechargesScreen'

export default RechargesScreen
