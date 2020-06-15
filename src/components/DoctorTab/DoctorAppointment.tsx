import React, { useEffect } from 'react';
import {
  StatusBar, View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator,
  SafeAreaView, RefreshControl, Alert
} from 'react-native';
import { Header, globalStyles, DoctorACard } from '..';
import { useGlobal, store, actions } from '../../store'
import { Patient, initPatient, DoctorChat, InitialDoctor, Doctor } from '../../interfaces'
import { h, w, ColorApp, serverUrl, Background, NoAvatar } from '../../constants'
import { Gender } from '../../enum/Enums';
import { Card, Icon } from 'react-native-elements'
import { Button, Provider, Portal, Modal, TextInput, List, } from 'react-native-paper';
import { DOCTORProfile, CHAT } from '../../routes';
import { ChatCard } from '../ProfileTab/ChatCard';

interface State {
  data: ProfileData,
  load: boolean,
  refreshing: boolean,
  loadError: boolean,
}
interface ProfileData {  
  
  doctor: Doctor,
  history: DoctorChat[],
}
var data: ProfileData = {
  history: [], doctor: InitialDoctor,
}

class DoctorAppointment extends React.Component<any, State> {
  state = { data, load: false, refreshing: false, loadError: false };

  componentDidMount = async () => {
    this.setState({ loadError: false })
    var logAction = 'Сообщения';
    try {
      const { userLogin, patient, token } = store.state;
      var id = patient.id;
      var param = this.props.navigation.state.params
      if (param) id = param;
      if (token) {
        const response = await fetch(serverUrl + 'doctor?id_Doctor='  + userLogin.id,
          {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
        const data: ProfileData = await response.json()
        if (response.status == 200) {
          this.setState({ data, load: true })
         // !param && actions.Login(token, data.patient, data.patient.user)
          console.log('Успех fetch ' + logAction, 'patient: '+data.doctor+', history: '+data.history)
        }
        else if (response.status == 404) {
          console.log('Внимание', 'Пользователь не найден id=' + data.doctor.id);
          this.setState({ loadError: true })
        }
      }
    } catch (error) {
      console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
      if (error == 'TypeError: Network request failed') {
        Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);

        this.setState({ loadError: true })
      }
      else if (error.status == 404) {
        console.log('Внимание', 'Пользователь не найден: ' + error, [{ text: 'OK' }]);
      }
      else {
        Alert.alert('Внимание', 'Ошибка сервера: ' + error, [{ text: 'OK' }]);
      }
      this.setState({ loadError: true })
      return
    }
  }

  render() {
    const { navigation } = this.props
    const { indicator, im, scrollView } = globalStyles
    var { load, refreshing, loadError } = this.state
    var { userLogin, token } = store.state;
    return (
      <View >
        <StatusBar backgroundColor={ColorApp} barStyle="light-content" />
        <Header title='Сообщения'
          leftIcon={'arrow-back'}
          onPressLeft={() => navigation.goBack()} />
        {token && (
          load ? (
            this.ProfileData()
          ) : <View>
              {Background}
              {!loadError && <ActivityIndicator style={indicator} size={50} color={ColorApp} />}
              <ScrollView
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
                }
              >
                <View style={{ margin: 50 }}></View>
              </ScrollView>
            </View>
        )
        }
      </View>
    )
  }

  private ProfileData() {
    const { navigation } = this.props
    const { link, h1, sub } = globalStyles
    const { images, sectionContainer1, sectionTitle1, h2, h3, top } = locStyles
    var { data, refreshing } = this.state
    var {  history  } = data
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
        }
      >

     {this.myChats()}
        <View style={{ margin: 50 }}></View>
        {/* <Text style={h3}>Телефон:  {phone && phone} </Text>
        <Text style={h3}>Пол:  {enum_Gender && enum_Gender == 1 ? Gender.male : enum_Gender == 2 && Gender.female} </Text> */}
                
      </ScrollView>
    )
  }

  private myChats() {
    const {  sectionContainer1, sectionTitle1, } = locStyles
    const { data } = this.state
    var { history  } = data
    const { navigation } = this.props
    return (
      <List.Section>

      <List.Accordion
        title={"История сообщений (" + (history.length ? history.length : 0)+')'}
        left={props => <List.Icon {...props} icon="history" />}
        style={sectionContainer1}
        titleStyle={sectionTitle1}
      >
      {history.map((item: DoctorChat, id) => {
           return <ChatCard data={item} key={id} 
          //  onPress={() => navigation.navigate(, (item.patient))}
            />
          })}
      </List.Accordion>
    </List.Section>
    )
  }
  private async onRefresh() {
    this.setClearState();
    this.componentDidMount();
  }
  private setClearState() {
    this.setState({ data, loadError: false, })
  }
}


const locStyles = StyleSheet.create({
  sectionContainer1: {
    height: 40,
    borderRadius: 7,
    marginTop: 15,
    width: w ,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#00B2D4',
  },
  sectionTitle1: {
    fontSize: 18,
    textAlign: 'left',
    color: '#fff'
  },
  h2: {
    fontSize: 18,
    marginLeft: 15,
    color: '#fff'
  },
  h3: {
    paddingLeft: 15,
    marginVertical: 5,
    fontSize: 18,
  },
  images: {
    width: w * 0.7,
    height: w * 0.5,
    alignSelf: 'center',
    // borderColor: 'grey',
    // borderWidth: 1
  },
  top: {
    marginTop: -65,
    backgroundColor: '#bbb',
    opacity: 0.8,
    paddingVertical: 5
  }
})

export { DoctorAppointment };