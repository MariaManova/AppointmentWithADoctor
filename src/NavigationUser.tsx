import * as React from 'react';
import {
  View, Text, TouchableHighlight, Image, ScrollView, Button, ActivityIndicator, Alert, ColorPropType, SafeAreaView, TouchableOpacity
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { globalStyles, ExitScreen, ListDoctorsScreen, ProfileScreen, } from './components';
import { SvgXml } from 'react-native-svg';
import { ColorApp, NoAvatar } from './constants';
import { useGlobal, store } from './store'
import { PROFILE } from './routes';
import { Icon } from 'react-native-elements';

const { headDrawer, icon, back, imageCont, imageIcon, button4, link, buttonTitle } = globalStyles
const { userLogin, token } = store.state;

const CustomDrowerComponent = (props: any) => (
  <SafeAreaView >
    <ScrollView>
      <View style={headDrawer}>
        <TouchableOpacity
          onPress={() => props.navigation.closeDrawer()}
          style={back}>
          <Icon name='arrow-back' size={20} color='#fff' />
        </TouchableOpacity>
        <View style={imageCont}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(PROFILE)}
          >
          <Image
            source={userLogin.photo ? { uri: userLogin.photo.url } : { uri: NoAvatar }}
            style={imageIcon} />
        </TouchableOpacity>
        </View>

      </View>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const MainDrawer = createDrawerNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      drawerLabel: 'Профиль',
      drawerIcon: ({ tintColor }) => <Icon name="account-circle" size={25} color={tintColor} />
    }
  },
  ListDoctors: {
    screen: ListDoctorsScreen,
    navigationOptions: {
      drawerLabel: 'Врачи',
      drawerIcon: ({ tintColor }) => <Icon name="search" size={25} color={tintColor} />
    }
  },
  Auth: {
    screen: ExitScreen,
    navigationOptions: {
      drawerLabel: 'Выход',
      drawerIcon: ({ tintColor }) => <Icon name='highlight-off' style={icon} color={tintColor} />
    },
  },
}, {
  initialRouteName: 'ListDoctors',
  drawerPosition: 'right',
  drawerType: 'slide',
  drawerWidth: 220,
  minSwipeDistance: 50,
  drawerLockMode: 'unlocked',
  swipeDistanceThreshold: 100,
  contentOptions: {
    itemConteinerStyle: {
      marginVertical: 10
    },
  },
  contentComponent: CustomDrowerComponent
});

const NavigationUser = createStackNavigator(
  {
    Drawer: MainDrawer,
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
  }
);

export default createAppContainer(NavigationUser);
