import React, { PureComponent, useState, useEffect } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert,
  ActivityIndicator, Image, RefreshControl
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Header, globalStyles } from '..';
import { h, w, ColorApp, serverUrl, Background, IndicatorApp } from '../../constants'
import { User, AuthData, initAuthBool, initAuthTxt, initAuthColor, authBool, authText } from '../../interfaces'
import { actions, store } from '../../store'
import { NAVIGATIONAdmin, NAVIGATIONUser, REGISTRATION } from '../../routes';
import { Card, Input, Icon } from 'react-native-elements'
import { Role } from '../../enum/Enums';
import { TextInput, Modal, Portal, Button, Provider } from 'react-native-paper';


interface Props { }
interface State { }

class AuthScreen extends PureComponent<any, State, Props> {
  state = {
    email: '', password: '', good: true, submit: false, disBtn: true, refreshing: false,
    badEnter: initAuthBool, errorText: initAuthTxt, colorField: initAuthColor, visibility: false
  }

  componentDidMount = async () => {
    console.log('Props AuthScreen', this.props)
    var user: User = this.props.navigation.state.params
    if (user) this.setState({ email: user.email })
  }

  render() {
    const { email, password, badEnter, errorText, colorField, submit,
      good, disBtn, refreshing, visibility } = this.state
    const { navigation } = this.props
    const { fixToText, icon, textInput, input, button, buttonContainer, buttonTitle, inputPaperFree } = locStyles
    const { im, cardStyle, indicator, error, inputStyle, link,buttonContenSp, inputPaper } = globalStyles
    const backArrow = 'arrow-back';
    return (
      <View style={{ height: h }}>
        <Header title={'Вход'}
          leftIcon={backArrow}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View>{Background}</View>

          <Card containerStyle={cardStyle} >
            <View style={fixToText}>
              <View style={{width: w * 0.72}}>
                <TextInput
                  style={[inputPaperFree, inputStyle]}
                  onChangeText={this.onChangeEmail.bind(this)}
                  autoCompleteType='email'
                  textContentType='emailAddress'
                  keyboardType='email-address'
                  label='Email'
                  value={email}
                  editable={!submit}
                  theme={{ colors: { primary: colorField.email } }}
                  //onEndEditing={() => this.onCheckLogin(email)}
                // errorMessage={badEnter.email ? errorText.email : ''}
                />
                {badEnter.email && <Text style={error}>{errorText.email}</Text>}
              </View>
            </View>

            <View style={[fixToText, { marginTop: 20, }]}>
              <View style={textInput}>
                <Input
                  inputContainerStyle={[input, { borderColor: colorField.password }]}
                  inputStyle={inputStyle}
                  onChangeText={this.onChangePassword.bind(this)}
                  placeholder='Пароль'
                  autoCompleteType='password'
                  textContentType='password'
                  keyboardType='twitter'
                  secureTextEntry={!visibility}
                  value={password}
                  //onEndEditing={() => this.onCheckPass(password)}
                  editable={!submit}
                  //errorMessage={badEnter.password ? errorText.password : ''}
                  rightIcon={visibility ? <Icon name='visibility' onPress={this.onVisibility.bind(this)} />
                    : <Icon name='visibility-off' onPress={this.onVisibility.bind(this)} color='grey' />}
                />
                {/* {badEnter.password ? <Text style={error}>{errorText.password}</Text> : <View></View>} */}
              </View>
            </View>
            
            <View style={{ alignItems: "center", marginTop: 20 }}>
            <View style={button}>
              <Button
                mode="contained"
                uppercase={false}
                onPress={this.onSubmit.bind(this)}
                disabled={disBtn}
                contentStyle={buttonContenSp}
                style={buttonContainer}
                labelStyle={buttonTitle}>
                  Войти
              </Button>
            </View>
          </View>

          <Text style={[link,{color: 'grey'}]}>{'Нет аккаунта?'}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(REGISTRATION)}
            disabled={submit} >
            <Text style={[link, { marginTop: -20 }]}>{'Зарегистрироваться'}</Text>
          </TouchableOpacity>
          </Card>

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
  private checkFields() {
    const { email, password, badEnter } = this.state
    if (email && password && !badEnter.email && !badEnter.password) {
      this.setState({ disBtn: false })
    }
  }

  private onChangeEmail(email: string) {
    var { badEnter, errorText, colorField } = this.state
    if (email == ' ') { return }
    if (!email) {
      badEnter.email = true;
      colorField.email = 'red'
      errorText.email = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, email, good: false });
      return;
    }
    else {
      badEnter.email = false;
      colorField.email = ColorApp
      this.setState({ email });
      this.checkFields();
    }
  }

  private onChangePassword(password: string) {
    var { badEnter, errorText, colorField } = this.state
    if (password == ' ') { return }
    if (password.trim().length >= 8) {
      badEnter.password = false
      colorField.password = 'green'
      this.setState({ password: password.trim(), colorField, badPass: false });
      this.checkFields();
      return
    }
    else {
      colorField.password = ColorApp
      this.setState({ password: password.trim(), colorField });
      this.checkFields();
    }
  }
  private onVisibility() {
    var { visibility } = this.state
    this.setState({ visibility: !visibility })
  }

  private onSubmit() {
    const { email, password, badEnter, errorText,
      colorField, good } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string;

    if (!email) {
      badEnter.email = true;
      errorText.email = 'Поле не заполнено!'
      colorField.email = 'red'
      this.setState({ badEnter, errorText, colorField, good: false });
    }
    if (!password) {
      badEnter.password = true;
      errorText.password = 'Поле не заполнено!'
      colorField.password = 'red'
      this.setState({ badEnter, errorText, colorField, good: false });
    }
    // if (password.trim().length < 8) {
    //   badEnter.password = true;
    //   errorText.password = 'Пароль должен иметь длину не менее 8 знаков!'
    //   colorField.password = 'red'
    //   this.setState({ badEnter, errorText, colorField, good: false });
    // }

    if (!email || !password) {
      Alert.alert('Внимание', 'Поля не заполнены!',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      return;
    }
    else if (badEnter.email || badEnter.password) {
      this.setState({ good: false });
      Alert.alert('Внимание', 'Заполните поля правильно!',
        [{ text: 'OK' }]);
      return;
    }
    else
      this.setState({ good: true });

    console.log('email: ' + email)
    console.log('badEnter.email: ' + badEnter.email + ' badEnter.password: ' + badEnter.password)
    console.log('good', good)
    obj = {
      Email: email,
      Password: password,
    }
    url = serverUrl + 'auth/signin';
    log = 'Входа'

    this.setState({ submit: true, disBtn: true })
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj), //JSON.stringify(
    })
      .then(function (response) {
        if (response.status == 200 || response.status == 201) {
          console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
          console.log(response);
          $this.setClearState();
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
      .then(function (data: AuthData) {
        if (data) {
          if (!store.state.token) {
            actions.Login(data.token, data.patient, data.userLogin)
          }
          if (data.userLogin.enum_Role == Role.admin) {
            navigation.navigate(NAVIGATIONAdmin);
          }
          else if (data.userLogin.enum_Role == Role.user) {
            navigation.navigate(NAVIGATIONUser);
          }
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
  private setClearState() {
    var arr: authBool = {
      email: false,
      password: false,
    };
    var arrCol: authText = {
      email: ColorApp,
      password: ColorApp,
    };
    this.setState({
      email: '', password: '', color: ColorApp,
      good: true, passGood: false, submit: false,
      badEnter: arr, colorField: arrCol,
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
    width: w*0.75,
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

export { AuthScreen };