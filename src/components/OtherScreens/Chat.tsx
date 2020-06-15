import React, { PureComponent, useState, useEffect } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert,
  ActivityIndicator, Image, RefreshControl
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Header, globalStyles } from '..';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationEvents } from 'react-navigation';
import { h, w, ColorApp, serverUrl, Background, IndicatorApp } from '../../constants'
import {  AuthData, initAuthBool, initAuthTxt, initAuthColor, authBool, authText, Doctor, InitialDoctorChat, DoctorChat ,User ,Messages} from '../../interfaces'
import { actions, store } from '../../store'
import { NAVIGATIONAdmin, NAVIGATIONUser, NAVIGATIONDoctor, REGISTRATION, PATIENTCARD } from '../../routes';
import { Card, Input, Icon } from 'react-native-elements'
import { Role } from '../../enum/Enums';
import { TextInput, Modal, Portal, Button, Provider, List } from 'react-native-paper';
import { MessageCard } from '../ProfileTab/MessageCard';

// interface Message {
//   user: User,
//   id: number,
//   fk_Author: Long,
//   fk_DoctorChat: number,
//   text: string,
//   createdAt: Date,
//   editedAt: Date,
//   removed: boolean,
// } 
interface Props { }
interface State {
  text: string,
  messages: Messages[],
  submit: boolean,
  disBtn: boolean,
  refreshing: boolean,
  loadError: boolean,
  load: boolean,
  data: DoctorChat,
}

class Chat extends PureComponent<any, State, Props> {
  state = { 
    text: '', messages: [], submit: false, disBtn: true, refreshing: false, loadError: false,
load: false, data: InitialDoctorChat,
  }

  componentDidMount = async () => {
    // const { date, pageSize } = this.state
    // this.setInitDate(date);
    const { userLogin, patient, token } = store.state;
    console.log('token: ', token)
    console.log(' props.params: ', this.props.navigation.state.params)
    const chat: DoctorChat = this.props.navigation.state.params
    //const doctor: Doctor = this.props.navigation.state.params
    this.setState({ loadError: false })
    var logAction = 'Профиль врача';
    // var obj = {
    //   Fk_Doctor: doctorid,
    //   Fk_Patient: patient.id

    // }
    try {
      if (token) {
        const response = await fetch(serverUrl + 'chat/get/chats?id_DoctorChat=' + chat.id, { //?id_DoctorChat=' + doctorid
          method: 'GET',
          headers: {
        'Authorization': `Bearer ${token}`,
          },
         // body: JSON.stringify(obj),
        })
        const data = await response.json()
        if (response.status == 200) {
          this.setState({
            messages: data.messages, load: true
          })
          console.log('Успех fetch ' + logAction, data)
        }
        else if (response.status == 404) {
          console.log('Внимание', 'Чат не найден id=' + chat.id);
          this.setState({ loadError: true, load: true })
        }
        else { console.log('Внимание', response) }
      }
    } catch (error) {
      console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
      if (error == 'TypeError: Network request failed') {
        Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);

        this.setState({ loadError: true, load: true })
      }
      else if (error.status == 404) {
        console.log('Внимание', 'Дом не найден: ' + error, [{ text: 'OK' }]);
      }
      else {
        Alert.alert('Внимание', 'Ошибка сервера: ' + error, [{ text: 'OK' }]);
      }
      this.setState({ loadError: true, load: true })
      return
    }
  }


  render() {
    const { userLogin, token } = store.state;
    const { text,  submit,
      disBtn, refreshing} = this.state
    const { navigation } = this.props
    const { fixToText, icon, textInput, input, button, buttonContainer, buttonTitle, inputPaperFree } = locStyles
    const { im, cardStyle, indicator, error, inputStyle, link, buttonContenSp, inputPaper } = globalStyles
   // const messages: Message = this.props.navigation.state.params
   const chat: DoctorChat = this.props.navigation.state.params
    const backArrow = 'arrow-back';
    return (
      <View style={{ height: h }}>
        <Header title={'Чат'}
          leftIcon={backArrow}
          onPressLeft={() => {
            //this.setClearState()
            navigation.goBack();
          }}
        />
        <View>{Background}</View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this.setClearState.bind(this)} />
          }>
            {/* {messages.map(item => {
              return <MessageCard data={item} key={item.id}
                 />//
            })} */}
           
          {/* {messages.map((a: Messages) => {
            return <Text>{a.text}</Text>
          })} */}
          <View style={fixToText}>
            <View style={{ width: w * 0.72 }}>
              <TextInput
                style={[inputPaperFree, inputStyle]}
                onChangeText={this.onChangeText.bind(this)}
                label='Message'
                value={text}
                editable={!submit}
                theme={{ colors: { primary: ColorApp } }}
              //onEndEditing={() => this.onCheckLogin(text)}
              // errorMessage={badEnter.text ? errorText.text : ''}
              />

            </View>
          </View>
         


          <View style={{ alignItems: "center", marginTop: 0 }}>
            <View style={button}>
              <Button
                mode="contained"
                uppercase={false}
               onPress={this.onSubmit.bind(this)}
                disabled={disBtn}
                contentStyle={buttonContenSp}
                style={buttonContainer}
                labelStyle={buttonTitle}>
                Отправить
              </Button>
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: 0 }}>
            <View style={button}>
            <Button
                mode="contained"
                uppercase={false}
                onPress={() => navigation.navigate(PATIENTCARD, chat.fk_Patient)}
                style={buttonContainer}
                labelStyle={buttonTitle}>
                Заполнить карту
            </Button>
            </View>
          </View>

          {this.myMessange()}

          <View style={{ margin: 50 }}><Text> </Text></View>

        </ScrollView>
        {/* <TouchableOpacity
            onPress={this.onPress.bind(this)}
            disabled={submit} >
            <Text style={link}>{'Забыли пароль?'}</Text>
          </TouchableOpacity> */}
        {submit && <Provider>
          <Portal>
            <Modal visible={submit} >
              <ActivityIndicator style={indicator} size={70} color={IndicatorApp} />
            </Modal>
          </Portal>
        </Provider>}

      </View>
    );
  }

 


  private myMessange() {
   
    var { messages } = this.state
    const { navigation } = this.props
    
    return (
      <List.Section>
      
        {messages.map((item: Messages, id) => {
              //return < Text>{item.editedAt.toString().substring(11,16)}  {item.text} </Text>
                return <MessageCard data={item} key={id} 
                 
                 />
             // onPress={() => navigation.navigate('PROFILE', (item.fk_Patient ))}
              
            })}
    
    </List.Section>
    )
  }
  private checkFields() {
    const { text} = this.state
    if (text) {
      this.setState({ disBtn: false })
    }
  }

  private onChangeText(text: string) {
   
    if (text == ' ') { return }
   
      this.setState({ text });
      this.checkFields();
    
  }

 

  private onSubmit() {
    const { text } = this.state
    const { userLogin, patient, token } = store.state;
    const { navigation } = this.props
    const chat: DoctorChat = this.props.navigation.state.params
    var $this = this;
   // const messages: Messages = this.props.navigation.state.params
    var obj, url, log: string;

    console.log('text: ' + text)
    console.log('chat: ' + chat.id)
    console.log('user: ' + userLogin.id)
    obj = {
      Fk_Author: userLogin.id,
      Fk_DoctorChat: chat.id,
      Text: text,
    }
    url = serverUrl + 'chat/create/messages';
    log = 'Отправка сообщения'

    this.setState({ submit: true, disBtn: true })
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': "application/json", 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj), //JSON.stringify(
    })
      .then(function (response) {
        if (response.status == 200 || response.status == 201) {
          console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
          console.log(response);
          $this.onRefresh();
          return response.json();
        }
        if (response.status == 500) {
          console.log('Server Error', "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', 'Ошибка сервера! Status: ' + response.status + ' ' + response,
            [{ text: 'OK' }]);
        }
        if (response.status == 400) {
          console.log('Bad Request', "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', 'Логин или пароль не верны!',
            [{ text: 'OK' }]);
        }
        else {
          console.log(response.statusText, "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', response.statusText + " Status: " + response.status + ' ' + response,
            [{ text: 'OK' }]);
        }
        $this.setState({ submit: false, disBtn: false });
        return
      })
      .then(function (data) {
        if (data) {
          // messages.push(data)
          // $this.setState({messages})
         console.log(data)
        }
      })
      .catch(error => {
        console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
        if (error == 'TypeError: Network request failed') {
          Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);
        }
        else {
          Alert.alert('Внимание', 'Ошибка входа: ' + error, [{ text: 'OK' }]);
        }
        $this.setState({ submit: false, disBtn: false })
        return
      });

  }
  private async onRefresh() {
    this.setClearState();
    this.componentDidMount();
  }
  private setClearState() {
    
    this.setState({
      text: '',  submit: false,
      
    })
  }
}

const locStyles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  textInput: {
    width: w * 0.8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    height: 40,
  },
  flex: {
    margin: 120,
    textAlign: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 200,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    width: w * 0.75,
  },
  buttonContainer: {
    backgroundColor: ColorApp,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  buttonTitle: {
    fontSize: 18,
    color: '#fff',
  },
  paddingBottom: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
  },
  inputPaperFree: {
    backgroundColor: '#fff',
  }
})

export { Chat };