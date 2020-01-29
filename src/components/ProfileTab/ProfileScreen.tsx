import React, { useEffect } from 'react';
import {
  StatusBar, View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator,
  SafeAreaView, RefreshControl, Alert
} from 'react-native';
import { Header, globalStyles, AppointmentCard } from '..';
import { useGlobal, store, actions } from '../../store'
import { Patient, initPatient, Appointment } from '../../interfaces'
import { h, w, ColorApp, serverUrl, Background, NoAvatar } from '../../constants'
import { Gender } from '../../enum/Enums';
import { Card, Icon } from 'react-native-elements'
import { Button, Provider, Portal, Modal, TextInput, } from 'react-native-paper';
import { DOCTORProfile } from '../../routes';

interface State {
  patient: Patient,
  appointments: Appointment[],
  load: boolean,
  refreshing: boolean,
  loadError: boolean,
  visibleModal: boolean,
}
interface ProfileData {  
  patient: Patient,
  appointments: Appointment[],
}

class ProfileScreen extends React.Component<any, State> {
  state = { patient: initPatient, appointments: [], load: false, refreshing: false, loadError: false, visibleModal: false };

  componentDidMount = async () => {
    this.setState({ loadError: false })
    var logAction = 'Профиль пользователя';
    try {
      const { userLogin, patient, token } = store.state;
      var id = patient.id;
      var param = this.props.navigation.state.params
      if (param) id = param;
      if (token) {
        const response = await fetch(serverUrl + 'profile/' + id,
          {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
        const data: ProfileData = await response.json()
        if (response.status == 200) {
          this.setState({ patient: data.patient, appointments: data.appointments, load: true })
          !param && actions.Login(token, data.patient, data.patient.user)
          console.log('Успех fetch ' + logAction, 'patient: '+data.patient+', appointments: '+data.appointments)
        }
        else if (response.status == 404) {
          console.log('Внимание', 'Пользователь не найден id=' + data.patient.id);
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
        <Header title='Профиль'
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
    const { buttonContainerSp, mrgTop, buttonWG, buttonTitle, h1, sub } = globalStyles
    const { images, sectionContainer1, sectionTitle1, h2, h3, top } = locStyles
    var { patient, appointments, refreshing } = this.state
    var { address  } = patient
    var { phone, enum_Gender, fullName, photo, id } = patient.user
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
        }
      >
        {photo ?
          <Image source={{ uri: photo.url }}
            style={images} /> :
          <Image source={{ uri: NoAvatar }}
            style={images} />}
        <View style={top}>
          <Text style={h1}>{fullName}</Text>
          <Text style={h2}>{address}</Text>
        </View>
        <TouchableOpacity onPress={() => appointments.length && this._showModal()}>
          <View style={[sectionContainer1, sub]}>
            <Text style={sectionTitle1}>Текущие записи    {appointments.length ? appointments.length : 0}</Text>
            <View style={{ width: w * 0.1 }}></View>
            <Icon name="expand-more" color='white' />
          </View>
        </TouchableOpacity>
        <View style={{ margin: 10 }}></View>
        <Text style={h3}>Телефон:  {phone && phone} </Text>
        <Text style={h3}>Пол:  {enum_Gender && enum_Gender == 1 ? Gender.male : enum_Gender == 2 && Gender.female} </Text>
        {this.onModal()}
        <View style={{ margin: 255 }}><Text> </Text></View>
      </ScrollView>
    )
  }
  private onModal() {
    const { visibleModal, appointments } = this.state
    const { cardStyle, label2 } = globalStyles
    const { navigation } = this.props
    return (
      <Provider>
        <Portal>
          <Modal visible={visibleModal} onDismiss={this._hideModal.bind(this)}
            contentContainerStyle={{ position: 'absolute', top: 50, left: 0, right: 0 }}>
            <Card containerStyle={cardStyle} >
            <Text style={[label2,{marginBottom: 10}]}>Текущие записи:</Text>
            {appointments.map((item, id) => {
              return <AppointmentCard data={item} key={id} />
            })}
            </Card>
          </Modal>
        </Portal >
      </Provider >
    )
  }

  _showModal() {
    this.setState({ visibleModal: true });
  }
  _hideModal() {
    this.setState({ visibleModal: false });
  }
  private async onRefresh() {
    this.setClearState();
    this.componentDidMount();
  }
  private setClearState() {
    this.setState({ patient: initPatient, load: false, refreshing: false, loadError: false, })
  }
}


const locStyles = StyleSheet.create({
  sectionContainer1: {
    height: 40,
    borderRadius: 7,
    marginTop: 15,
    marginHorizontal: w * 0.125,
    width: w * 0.7,
    justifyContent: 'center',
    backgroundColor: '#00B2D4',
  },
  sectionTitle1: {
    fontSize: 18,
    textAlign: 'center',
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

export { ProfileScreen };