import propTypes from 'prop-types'
import {config} from '@gluestack-ui/config'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {useTheme} from '@/hooks'
import MovilListScreen from './movil/movil-list-screen'
import NautaListScreen from './nauta/nauta-list-screen'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

const menu = [
  {
    path: 'Movil',
    icon: 'smartphone',
    Component: MovilListScreen,
  },
  {path: 'Nauta', icon: 'router', Component: NautaListScreen},
]

const Tab = createMaterialTopTabNavigator()

function TopTabsNavigator() {
  const {theme, navigatorTheme} = useTheme()
  const {orange50, orange200} = config.tokens.colors
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarItemStyle: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        tabBarLabelStyle: {fontSize: 14, fontWeight: 600},
        tabBarActiveTintColor: navigatorTheme.colors.primary,
        tabBarPressColor: theme === 'dark' ? orange200 : orange50,
        tabBarPressOpacity: 0.5,
      }}
    >
      {menu.map(({path, icon, Component}) => (
        <Tab.Screen
          key={path}
          name={path}
          component={Component}
          options={{
            swipeEnabled: false,
            tabBarLabel: path,
            tabBarIcon: ({color, size}) => <MaterialIcons name={icon} color={color} size={20} />,
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

TopTabsNavigator.propTypes = {}

TopTabsNavigator.defaultProps = {}

TopTabsNavigator.displayName = 'TopTabsNavigator'

export default TopTabsNavigator
