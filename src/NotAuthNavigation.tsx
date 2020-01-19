import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {
  ListDoctorsScreen, AuthScreen, RegistrationScreen, globalStyles
} from './components';
import { Icon } from 'react-native-elements';


export const MainDrawer = createDrawerNavigator({
  ListDoctors: {
    screen: ListDoctorsScreen,
    navigationOptions: {
      drawerLabel: 'Врачи',
      drawerIcon: ({ tintColor }) => <Icon name="search" size={25} color={tintColor}/>
    }
  },
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      drawerLabel: 'Войти',
      drawerIcon: ({ tintColor }) => <Icon name="portrait" size={25} color={tintColor}/>
    },
  },
  Registration: {
    screen: RegistrationScreen,
    navigationOptions: {
      drawerLabel: 'Регистрация',
      drawerIcon: ({ tintColor }) => <Icon name="loupe" size={25} color={tintColor}/> 
    },
  },
}, {
  initialRouteName: 'ListDoctors',
  drawerType: 'slide',
  drawerWidth: 220,
  drawerPosition: 'right',
  swipeDistanceThreshold: 100,
  contentOptions: {
    itemConteinerStyle: {
      marginVertical: 10
    }
  },
});

const NotAuthNavigation = createStackNavigator(
  {
    Drawer: MainDrawer,
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
  }
);

export default createAppContainer(NotAuthNavigation);
