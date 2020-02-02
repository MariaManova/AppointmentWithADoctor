import * as React from 'react';
import {
  View, Image, ScrollView, SafeAreaView, TouchableOpacity
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { globalStyles, ExitScreen, ListDoctorsScreen, ProfileScreen, DoctorCreationScreen, 
  IconsElement, IconsMaterial, } from './components';
import { ColorApp, NoAvatar } from './constants';
import { useGlobal, store } from './store'
import { PROFILE } from './routes';
import { Icon } from 'react-native-elements';
import { List } from 'react-native-paper';

const { headDrawer, icon, back, imageCont, imageIcon } = globalStyles
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
  DoctorCreation: {
    screen: DoctorCreationScreen,
    navigationOptions: {
      drawerLabel: 'Админка',
      drawerIcon: ({ tintColor }) => <Icon name='settings' size={25} color={tintColor} />
    }
  },
  IconsMaterial: {
    screen: IconsMaterial,
    navigationOptions: {
      drawerLabel: 'Иконки Material',
      drawerIcon: ({ tintColor }) => <List.Icon icon="material-ui"/>
    }
  },
  IconsElement: {
    screen: IconsElement,
    navigationOptions: {
      drawerLabel: 'Иконки Element',
      drawerIcon: ({ tintColor }) => <Icon name='pool' size={25} color={tintColor} />
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
