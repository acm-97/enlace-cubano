import propTypes from 'prop-types'
import {createBottomTabNavigator, BottomTabBarHeightContext} from '@react-navigation/bottom-tabs'
import {RechargesScreen} from '@/modules/recharges/components'
import {FavoritesScreen} from '@/modules/favorites/components'
import {AccountScreen} from '@/modules/account/components'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {BlurView} from 'expo-blur'
import {tw} from '@/lib/settings'
import {Platform} from 'react-native'
import {config} from '@gluestack-ui/config'

const Tab = createBottomTabNavigator()

const menu = [
  {label: 'Recargas', icon: 'devices', Component: RechargesScreen},
  {label: 'Favoritos', icon: 'favorite-border', Component: FavoritesScreen},
  {label: 'Cuenta', icon: 'settings', Component: AccountScreen},
]

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: config.tokens.colors.orange500,
        tabBarStyle: {
          position: 'absolute',
          flex: 1,
          paddingBottom: Platform.OS === 'ios' ? 0 : 10,
          height: Platform.OS === 'ios' ? 60 : 70,
          paddingTop: 10,
        },
        tabBarLabelStyle: {fontSize: 12},
        tabBarBackground: () => (
          <BottomTabBarHeightContext.Consumer>
            {tabBarHeight => (
              <BlurView
                tint="systemChromeMaterial"
                intensity={60}
                experimentalBlurMethod="dimezisBlurView"
                style={tw.style(`flex-1 overflow-hidden pb-24`)}
              />
            )}
          </BottomTabBarHeightContext.Consumer>
        ),
      }}
    >
      {menu.map(({label, icon, Component}) => (
        <Tab.Screen
          key={label}
          name={label}
          component={Component}
          options={{
            tabBarLabel: label,
            tabBarIcon: ({color, size}) => <MaterialIcons name={icon} color={color} size={35} />,
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

BottomTabs.propTypes = {}

BottomTabs.defaultProps = {}

BottomTabs.displayName = 'BottomTabs'

export default BottomTabs
