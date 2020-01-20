import React, { useEffect } from 'react';
import {
  StatusBar, View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  Alert
} from 'react-native';
import { Header, globalStyles } from '..';
import { useGlobal, store, actions } from '../../store'
import { User, initialUser, Patient } from '../../interfaces'
import { h, w, ColorApp, serverUrl, Background, NoAvatar } from '../../constants'
import { Gender } from '../../enum/Enums';
import { AUTH, REGISTRATION, } from '../../routes';
import { Card, Icon } from 'react-native-elements'


interface State {
  data: User,
  patient: Patient,
  load: boolean,
  refreshing: boolean,
  loadError: boolean
}

class ProfileScreen extends React.Component<any, State> {
  state = {
    data: initialUser, load: false, refreshing: false, loadError: false,
    patient: { id: 0, address: '', Fk_User: 0, myAppointments: [], user: initialUser }
  };

  componentDidMount = async () => {
    this.setState({ loadError: false })
    var logAction = 'Профиль пользователя';
    try {
      const { userLogin, data, token } = store.state;
      var id = data.id;
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
        const data = await response.json()
        if (response.status == 200) {
          this.setState({ data: data.user, patient: data.patient, load: true })
          !param && actions.Login(token, data.patient, data.user)
          console.log('Успех fetch ' + logAction, data)
        }
        else if (response.status == 404) {
          console.log('Внимание', 'Пользователь не найден id=' + data.id);
          this.setState({ loadError: true })
        }
      }
    } catch (error) {
      console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
      if (error == 'TypeError: Network request failed') {
        Alert.alert('Внимание', 'Сервер не доступен: ' + error, [{ text: 'OK' }]);

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
    var { data, load, refreshing, loadError } = this.state
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
    const { noImages, h1, sub } = globalStyles
    const { images, sectionContainer1, sectionTitle1, h2, h3, top } = locStyles
    var { data, patient, refreshing } = this.state
    var { address, myAppointments } = patient
    var { phone, enum_Gender, fullName, photo, id } = data
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
        <TouchableOpacity onPress={() => myAppointments.length && navigation.navigate()} >
          <View style={[sectionContainer1, sub]}>
            <Text style={sectionTitle1}>Текущие записи    {myAppointments.length ? myAppointments.length : 0}</Text>
            <View style={{ width: w*0.1 }}></View>
            <Icon name="expand-more" />
          </View>
        </TouchableOpacity>
        <View style={{ margin: 10 }}></View>
        <Text style={h3}>Телефон:  {phone} </Text>
        <Text style={h3}>Пол:  {enum_Gender == 1 ? Gender.male : enum_Gender == 2 && Gender.female} </Text>

        <View style={{ margin: 55 }}><Text> </Text></View>
      </ScrollView>
    )
  }
  private async onRefresh() {
    this.setClearState();
    this.componentDidMount();
  }
  private setClearState() {
    this.setState({ data: initialUser, load: false })
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
    textAlign: 'center'
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