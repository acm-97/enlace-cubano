import propTypes from 'prop-types'
import {config} from '@gluestack-ui/config'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {useTheme} from '@/hooks'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import InfoScreen from './info-screen'
import SecurityScreen from './security-screen'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import NameForm from './info-screen/name-form'
import PhoneNumberForm from './info-screen/phone-number-form'
import EmailForm from './info-screen/email-form'
import PasswordForm from './security-screen/Password'

const tabs = [
  {
    path: 'Info',
    icon: 'smartphone',
    Component: InfoScreen,
    title: 'Información',
  },
  {path: 'Security', icon: 'router', Component: SecurityScreen, title: 'Seguridad'},
]

const modals = [
  {
    path: 'Name',
    title: 'Nombre y Apellidos',
    Component: NameForm,
  },
  {
    path: 'PhoneNumber',
    title: 'Número Telefónico',
    Component: PhoneNumberForm,
  },
  {
    path: 'Email',
    title: 'Correo Electrónico',
    Component: EmailForm,
  },
  {
    path: 'ChangePassword',
    title: 'Cambiar Contraseña',
    Component: PasswordForm,
  },
]

const InfoSecurityTabs = createMaterialTopTabNavigator()
const InfoSecurityStack = createNativeStackNavigator()

function InfoSecurityNavigator() {
  return (
    <InfoSecurityStack.Navigator initialRouteName="Tabs">
      <InfoSecurityStack.Group>
        <InfoSecurityStack.Screen
          name="AccountOptions"
          options={{headerShown: false}}
          component={InfoSecurityTabsNavigator}
        />
      </InfoSecurityStack.Group>
      <InfoSecurityStack.Group>
        {modals.map(({path, title, Component}) => (
          <InfoSecurityStack.Screen
            key={path}
            name={path}
            options={{title, presentation: 'fullScreenModal'}}
            component={Component}
          />
        ))}
      </InfoSecurityStack.Group>
    </InfoSecurityStack.Navigator>
  )
}

function InfoSecurityTabsNavigator() {
  const {theme, navigatorTheme} = useTheme()
  const {orange50, orange200} = config.tokens.colors
  return (
    <InfoSecurityTabs.Navigator
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
      {tabs.map(({path, icon, Component, title}) => (
        <InfoSecurityTabs.Screen
          key={path}
          name={path}
          component={Component}
          options={{
            swipeEnabled: false,
            tabBarLabel: title,
            // tabBarIcon: ({color, size}) => <MaterialIcons name={icon} color={color} size={20} />,
          }}
        />
      ))}
    </InfoSecurityTabs.Navigator>
  )
}

InfoSecurityNavigator.propTypes = {}

InfoSecurityNavigator.defaultProps = {}

InfoSecurityNavigator.displayName = 'InfoSecurityNavigator'

export default InfoSecurityNavigator
