import React, { PureComponent } from 'react';
import {
  View, Text, TouchableOpacity,  Image
} from 'react-native';
import { Header, globalStyles } from '..';
import { Card } from 'react-native-elements'
import { actions } from '../../store'
import { initialUser, initPatient } from '../../interfaces'
import { NotAuthNAVIGATION } from '../../routes'
import {  Background } from '../../constants';

class ExitScreen extends PureComponent<any> {

  render() {
    const {  buttonContainer, buttonTitle, im, h2, positionCard } = globalStyles
    const { navigation } = this.props
    return ( <View>
      <Header title={'Выход'}
        leftIcon={'arrow-back'}
        onPressLeft={() => {
          //this.setClearState()
          navigation.goBack();
        }}
      />
        <View>{Background}</View>
      <View style={positionCard}>
        <Card containerStyle={{ paddingBottom: 20, borderRadius: 10 }} >
          {/* <Image source={require('../../../icon/doorOut.png')}
            style={{ alignSelf: 'center' }} /> */}
          <Text style={h2}>Вы хотите выйти из аккаунта?</Text>
            <TouchableOpacity
              onPress={() => {
                actions.Login('',initPatient,initialUser)
                navigation.navigate(NotAuthNAVIGATION)}}>
              <View style={buttonContainer}>
                <Text style={buttonTitle}>Выйти</Text>
              </View>
            </TouchableOpacity>
        </Card>
      </View>
    </View>
    );
  }
}  

export { ExitScreen };