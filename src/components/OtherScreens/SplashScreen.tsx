import React from 'react';
import {
  View, Text,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import NotAuthNavigation from '../..';
import { globalStyles } from '..'
import { useGlobal, store } from '../../store'
import { Button  } from 'react-native-paper';
import { w } from '../../constants';
import { Role } from '../../enum/Enums';
import NavigationAdmin from '../../NavigationAdmin';
import NavigationUser from '../../NavigationUser';

interface Props { }


const { userLogin, token } = store.state;

class SplashScreen extends React.Component<any, Props> {
  
  componentDidMount = async () => {    
    console.log('userLogin: ', userLogin)
    console.log('token: ', token)
  }
  render() {
    const { bodySp, buttonContenSp, sectionTitle, sectionDescription, paddingBottom,
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
            <Button 
              mode="contained"
              uppercase={false}
              onPress={() => navigation.navigate('App')}
              contentStyle={buttonContenSp}
              style={buttonContainerSp}
              labelStyle={buttonTitleSp}>Продолжить </Button >
          </View>
        </View>
      </View>
    );
  }
}


const RootStack = createStackNavigator(
  {
    Splash: SplashScreen,
    App: !token ? NotAuthNavigation : userLogin.enum_Role == Role.admin ? NavigationAdmin : NavigationUser,
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);
