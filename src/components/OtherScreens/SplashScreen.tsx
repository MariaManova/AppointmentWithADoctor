import React from 'react';
import {
  View, Text, TouchableOpacity, Image, Button,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import NotAuthNavigation from '../..';
import { globalStyles } from '..'
import { useGlobal, store } from '../../store'
import { Role } from '../../enum/Enums';

interface Props { }

class SplashScreen extends React.Component<any, Props> {
  render() {
    const { bodySp, sectionContainer, sectionTitle, sectionDescription, paddingBottom,
      buttonContainerSp, buttonTitleSp } = globalStyles
    const { navigation } = this.props
    return (
      <View style={bodySp}>
          <Text style={sectionTitle}>Записаться на прием просто!</Text>
        <Text style={sectionDescription}>
          Выберите нужного врача или услугу и запишитесь на прием, выбрав из свободных ячеек 
          рассписания удобное для Вас время. Время Вашего приема забронировано.
              </Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          {/* <View style={paddingBottom}>
            <Image source={require('../../../icon/bigHome.png')} style={globalStyles.image} />
          </View> */}
          <View style={paddingBottom}>
            <TouchableOpacity
              onPress={() => navigation.navigate('App')}
              style={buttonContainerSp}>
                <Text style={buttonTitleSp}>Продолжить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const { userLogin, token } = store.state;

const RootStack = createStackNavigator(
  {
    Splash: SplashScreen,
    App: NotAuthNavigation ,
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);
