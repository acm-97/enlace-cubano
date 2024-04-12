import propTypes from 'prop-types'
import {createBottomTabNavigator, BottomTabBarHeightContext} from '@react-navigation/bottom-tabs'
import {RechargesScreen} from '@/modules/recharges/components'
import {FavoritesScreen} from '@/modules/favorites/components'
import {AccountScreen} from '@/modules/account/components'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {BlurView} from 'expo-blur'
import {tw} from '@/lib/settings'
import {Platform} from 'react-native'
import {ActivityScreen} from '@/modules/activity/components'
import {useTheme} from '@/hooks'

const Tab = createBottomTabNavigator()

const menu = [
  {label: 'Recargas', icon: 'devices', Component: RechargesScreen},
  {label: 'Favoritos', icon: 'favorite-border', Component: FavoritesScreen},
  {label: 'Actividad', icon: 'receipt', Component: ActivityScreen},
  {label: 'Cuenta', icon: 'settings', Component: AccountScreen},
]

function BottomTabs() {
  const {theme} = useTheme()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          flex: 1,
          ...(Platform.OS === 'android' && {paddingBottom: 10}),
          height: Platform.OS === 'ios' ? 100 : 80,
          paddingTop: 10,
        },
        tabBarLabelStyle: {fontSize: 12},
        ...(Platform.OS === 'ios' && {
          tabBarBackground: () => (
            <BottomTabBarHeightContext.Consumer>
              {tabBarHeight => (
                <BlurView
                  tint={theme}
                  intensity={100}
                  experimentalBlurMethod="dimezisBlurView"
                  style={tw.style(`flex-1 overflow-hidden`)}
                />
              )}
            </BottomTabBarHeightContext.Consumer>
          ),
        }),
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
