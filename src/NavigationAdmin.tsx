import * as React from 'react';
import {
  View, Text, TouchableHighlight, Image, ScrollView, TouchableOpacity, SafeAreaView
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { AuthScreen, globalStyles, ExitScreen, ListDoctorsScreen} from './components';
import { SvgXml } from 'react-native-svg';
import { ColorApp, NoAvatar } from './constants';
import { useGlobal, store } from './store'
import { PROFILE } from './routes';
import { Icon } from 'react-native-elements';

const { headDrawer, icon, back, imageIcon, imageCont, link, buttonTitle, button4 } = globalStyles
const { userLogin, token } = store.state;

const CustomDrowerComponent = (props: any) => (
  <SafeAreaView >
    <ScrollView>
      <View style={headDrawer}>
        <TouchableOpacity
          onPress={() => props.navigation.closeDrawer()}
          style={back}>
          <Icon name='arrow-back' size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(PROFILE)}
          style={imageCont}>
          <Image
            source={userLogin.photo ? { uri: userLogin.photo.url } : {uri: NoAvatar}}
            style={imageIcon} />
        </TouchableOpacity>

        <View style={button4}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(PROFILE)}>
            <View style={link}>
              <Text style={buttonTitle}>{userLogin.fullName}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const MainDrawer = createDrawerNavigator({
  ListDoctors: {
    screen: ListDoctorsScreen,
    navigationOptions: {
      drawerLabel: 'Врачи',
      drawerIcon: ({ tintColor }) => <Icon name="search" size={25} color={tintColor}/>
    }
  },
  // AddDoctor: {
  //   screen: AddDoctorScreen,
  //   navigationOptions: {
  //     drawerLabel: 'Добавить врача',
  //     drawerIcon: () => <Icon name='' style={icon} />
  //   }
  // },
  Auth: {
    screen: ExitScreen,
    navigationOptions: {
      drawerLabel: 'Выход',
      drawerIcon: () => <Icon name='exit-to-app' style={icon} />
    },
  },
}, {
  //initialRouteName: 'Tab',
  drawerBackgroundColor: ColorApp,
  //drawerPosition: 'right',
  drawerType: 'slide',
  drawerWidth: 220,
  swipeDistanceThreshold: 100,
  contentOptions: {
    itemConteinerStyle: {
      marginVertical: 10
    },
    activeTintColor: 'white',
  },
  contentComponent: CustomDrowerComponent
});

const MainNavigation = createStackNavigator(
  {
    Drawer: MainDrawer,
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
  }
);

export default createAppContainer(MainNavigation);
