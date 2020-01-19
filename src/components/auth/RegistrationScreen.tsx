import React, { Component } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, Alert,
  ActivityIndicator, Picker, Image, RefreshControl
} from 'react-native';
import { Header, globalStyles } from '..';
import { h, w, ColorApp, serverUrl,  Background } from '../../constants'
import { User, arrText, arrBool } from '../../interfaces'
import { actions } from '../../store'
import { Icon, Card, Input } from 'react-native-elements'

interface Props { }
interface State { }
interface AuthData {
  token: string,
  userLogin: User,
}
var initArrBool: arrBool = {
  email: false,
  name: false,
  surname: false,
  password: false,
  repeatPassword: false
};
var initArrTxt: arrText = {
  email: '',
  name: '',
  surname: '',
  password: '',
  repeatPassword: ''
};
var initArrColor: arrText = {
  email: ColorApp,
  name: ColorApp,
  surname: ColorApp,
  password: ColorApp,
  repeatPassword: ColorApp
};

class RegistrationScreen extends Component<any, State, Props> {
  state = {
     email: '', name: '', surname: '',
    password: '', repeatPassword: '', color: ColorApp, visibility: false, visibilityRep: false,
    good: true, passGood: false, submit: false, disBtn: true, refreshing: false,
    badEnter: initArrBool, errorText: initArrTxt, colorIcon: initArrColor
  }

  componentDidMount = () => {    
    console.log('Props RegistrationScreen', this.props)
  }
  render() {
    const { email, name, surname, password, color, repeatPassword, visibility, visibilityRep,
      badEnter, errorText, colorIcon, passGood, submit, good, disBtn, refreshing } = this.state
    const { navigation } = this.props
    const { fixToText, icon, textInput, input, button, buttonContainer, buttonTitle, indicator,
      link, error, paddingBottom } = locStyles
    const { im, cardStyle, inputStyle } = globalStyles
    const backArrow = 'arrow-back';
    return (
      <View style={{ height: h }}>
        <Header title={'Регистрация'}
          leftIcon={backArrow}
          onPressLeft={() => {
            //this.setClearState()
            navigation.goBack();
          }}
        />

        <View >
          {Background}
          </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this.setClearState.bind(this)} />
          }>
          <Card containerStyle={cardStyle} >
            {submit && <ActivityIndicator style={indicator} size={70} color={ColorApp} />}
              <View style={fixToText}>
                <View style={textInput}>
                  <Input
                    inputContainerStyle={[input, { borderColor: colorIcon.email }]}
                    inputStyle={inputStyle}
                    onChangeText={this.onChangeEmail.bind(this)}
                    placeholder='Email'
                    autoCompleteType='email'
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    value={email}
                    onEndEditing={() => this.onCheckEmail(email)}
                    editable={!submit}
                  />
                  {badEnter.email && <Text style={error}>{errorText.email}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <View style={textInput}>
                  <Input
                    inputContainerStyle={input}
                    inputStyle={inputStyle}
                    onChangeText={this.onChangeName.bind(this)}
                    placeholder='Имя'
                    value={name}
                    onEndEditing={() => this.onCheckName(name)}
                    editable={!submit}
                  />
                  {badEnter.name && <Text style={error}>{errorText.name}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <View style={textInput}>
                  <Input
                    inputContainerStyle={input}
                    inputStyle={inputStyle}
                    onChangeText={this.onChangeSurname.bind(this)}
                    placeholder='Фамилия'
                    value={surname}
                    onEndEditing={() => this.onCheckSurname(surname)}
                    editable={!submit}
                  />
                  {badEnter.surname && <Text style={error}>{errorText.surname}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <View style={textInput}>
                  <Input
                    inputContainerStyle={[input, { borderColor: colorIcon.password }]}
                    inputStyle={inputStyle}
                    onChangeText={this.onChangePassword.bind(this)}
                    placeholder='Пароль'
                    autoCompleteType='password'
                    textContentType='password'
                    secureTextEntry={!visibility}
                    value={password}
                    onEndEditing={() => this.onCheckPass(password)}
                    editable={!submit}
                    rightIcon={visibility ? <Icon name='visibility' onPress={this.onVisibility.bind(this)}/> 
                    : <Icon name='visibility-off'  onPress={this.onVisibility.bind(this)} color='grey'/>}
                  />
                  {badEnter.password && <Text style={error}>{errorText.password}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <View style={textInput}>
                  <Input
                    inputContainerStyle={[input, { borderColor: colorIcon.repeatPassword }]}
                    inputStyle={inputStyle}
                    onChangeText={this.onChangeRepeatPassword.bind(this)}
                    placeholder='Повторите пароль'
                    autoCompleteType={'password'}
                    textContentType={'password'}
                    secureTextEntry={!visibility}
                    value={repeatPassword}
                    onEndEditing={() => this.onCheckRep(repeatPassword)}
                    editable={!submit}
                  />
                  {badEnter.repeatPassword && <Text style={error}>{errorText.repeatPassword}</Text>}
                </View>
              </View> 
          </Card>
          
          <View style={{ alignItems: 'center' }}>
              <View style={button}>
                <TouchableOpacity
                  onPress={this.onSubmit.bind(this)}
                  disabled={disBtn} >
                  <View style={buttonContainer}>
                    <Text style={buttonTitle}>Подтверить и создать</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>          
          <View style={{ margin: 90 }}><Text> </Text></View>
        </ScrollView>
      </View>
    );
  }


  private checkFields() {
    const {  email, name, surname, password, repeatPassword, badEnter } = this.state
    if (email && name && surname && password && repeatPassword &&
      !badEnter.email && !badEnter.name && !badEnter.surname && !badEnter.password &&
      !badEnter.repeatPassword) {
      this.setState({ disBtn: false })
    }
  }
  
  private onChangeEmail(email: string) {
    var { badEnter, errorText, colorIcon } = this.state
    if (email == ' ') { return }
    if (!email) {
      badEnter.email = true;
      errorText.email = 'Поле не заполнено'
      colorIcon.email = 'red'
      this.setState({ badEnter, errorText, colorIcon, email, good: false, disBtn: true });
      return;
    }
    else {
      colorIcon.email = ColorApp
      badEnter.email = false;
      this.setState({ email, badEnter });
      this.checkFields()
    }
  }
  private onCheckEmail(email: string) {
    var { badEnter, errorText, colorIcon } = this.state
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email.trim()) == false) {
      badEnter.email = true;
      errorText.email = 'Введите корректный e-mail'
      colorIcon.email = 'red'
      this.setState({ badEnter, errorText, email, good: false, disBtn: true });
      return;
    }
    else {
      badEnter.email = false;
      colorIcon.email = 'green'
      this.setState({ email: email.trim(), badEnter });
      this.checkFields()
    }
  }
  private onChangeName(name: string) {
    var {badEnter, errorText, colorIcon} = this.state
    if (name == ' ') { return }
    if (!name) {
      badEnter.name = true;
      errorText.name = 'Поле не заполнено'
      this.setState({ badEnter, errorText, name, good: false, disBtn: true });
      return;
    }
    else {
      badEnter.name = false;
      this.setState({ name, badEnter });
      this.checkFields()
    }
  }
  private onCheckName(name: string) {
    var {badEnter, errorText, colorIcon} = this.state
    if (name.trim().length < 2 || name.trim().length > 25) {
      badEnter.name = true;
      errorText.name = 'Имя должно быть больше 1 символа и меньше 25'
      this.setState({ badEnter, errorText, name, good: false, disBtn: true });
      return;
    }
    else {
      this.setState({ name: name.trim() });
    }
  }
  private onChangeSurname(surname: string) {
    var {badEnter, errorText, colorIcon} = this.state
    if (surname == ' ') { return }
    if (!surname) {
      badEnter.surname = true;
      errorText.surname = 'Поле не заполнено'
      this.setState({ badEnter, errorText, surname, good: false, disBtn: true });
      return;
    }
    else {
      badEnter.surname = false;
      this.setState({ surname });
      this.checkFields()
    }
  }
  private onCheckSurname(surname: string) {
    var {badEnter, errorText, colorIcon} = this.state
    if (surname.trim().length < 2 || surname.trim().length > 25) {
      badEnter.surname = true;
      errorText.surname = 'Фамилия должна быть больше 1 символа и меньше 25'
      this.setState({ badEnter, errorText, surname, good: false, disBtn: true });
      return;
    }
    else {
      badEnter.surname = false;
      colorIcon.surname = 'green'
      this.setState({ surname: surname.trim(), badEnter, colorIcon });
    }
  }
  private onChangePassword(password: string) {
    var {badEnter, errorText, colorIcon} = this.state
    if (password == ' ') { return }
    if (password.trim().length >= 8) {
      badEnter.password = false
      colorIcon.password = 'green'
      this.setState({ colorIcon, badPass: false });
      var repPass = this.state.repeatPassword;
      if (repPass && repPass != password) {
        badEnter.repeatPassword = true;
        errorText.repeatPassword = 'Пароли не совпадают'
        colorIcon.repeatPassword = 'red'
        this.setState({ badEnter, errorText, colorIcon, passGood: false, good: false, disBtn: true });
      }
    }
    else {
      colorIcon.password = ColorApp
    }
    this.setState({ password: password.trim(), colorIcon });
    this.checkFields()
  }
  private onCheckPass(pass: string) {
    var {badEnter, errorText, colorIcon} = this.state
    if (pass.trim().length < 8) {
      badEnter.password = true;
      errorText.password = 'Пароль должен иметь длину не менее 8 знаков'
      colorIcon.password = 'red'
      this.setState({ badEnter, errorText, colorIcon, pass, good: false, disBtn: true });
      return;
    }
  }
  private onChangeRepeatPassword(repeatPassword: string) {
    var {badEnter, errorText, colorIcon} = this.state
    var pass = this.state.password;
    if (repeatPassword == ' ') { return }
    if (pass.trim().length == repeatPassword.trim().length && pass === repeatPassword) {
      badEnter.repeatPassword = false;
      badEnter.password = false;
      colorIcon.repeatPassword = 'green'
      this.setState({ badEnter, colorIcon, passGood: true });
    }
    else if (pass.trim().length <= repeatPassword.trim().length) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Пароли не совпадают'
      colorIcon.repeatPassword = 'red'
      this.setState({ badEnter, errorText, colorIcon, passGood: false, good: false, disBtn: true });
    }
    else {
      colorIcon.repeatPassword = ColorApp
      badEnter.repeatPassword = false;
      this.setState({ badEnter, colorIcon });
      this.checkFields()
    }
    this.setState({ repeatPassword: repeatPassword.trim() });
  }
  private onCheckRep(repeatPassword: string) {
    var {badEnter, errorText, colorIcon} = this.state
    var pass = this.state.password;
    if (pass !== repeatPassword) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Пароли не совпадают'
      colorIcon.repeatPassword = 'red'
      this.setState({ badEnter, errorText, colorIcon, passGood: false, disBtn: true });
    }
  }
  private onVisibility() {
    var {visibility} = this.state
    this.setState({visibility: !visibility})
  }

  private onSubmit() {
    const { email, name, surname, password, repeatPassword, badEnter, errorText,
      colorIcon, good } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string;
    
    if (!email) {
      badEnter.email = true;
      errorText.email = 'Поле не заполнено'
      colorIcon.email = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!name) {
      badEnter.name = true;
      errorText.name = 'Поле не заполнено'
      colorIcon.name = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!surname) {
      badEnter.surname = true;
      errorText.surname = 'Поле не заполнено'
      colorIcon.surname = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!password) {
      badEnter.password = true;
      errorText.password = 'Поле не заполнено'
      colorIcon.password = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!repeatPassword) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Поле не заполнено'
      colorIcon.repeatPassword = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!email || !name || !surname || !password || !repeatPassword) {
      Alert.alert('Внимание', 'Не все поля заполнены',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      this.setState({ disBtn: true });
      return;
    }

    if (badEnter.email || badEnter.name || badEnter.surname ||
      badEnter.password || badEnter.repeatPassword) {
      this.setState({ good: false }); //, isVisible: true, textOverlay: txt 
      Alert.alert('Внимание', 'Заполните поля правильно',
        [{ text: 'OK' }]);

      return;
    }
    if (password.trim().length < 8 || repeatPassword.trim().length < 8) {
      this.setState({ good: false }); //, isVisible: true, textOverlay: txt 
      Alert.alert('Внимание', 'Пароль должен иметь длину не менее 8 знаков',
        [{ text: 'OK' }]);

      return;
    }
    else this.setState({ good: true, disBtn: false });

    if (password !== repeatPassword) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Пароли не совпадают'
      colorIcon.repeatPassword = 'red'
      this.setState({ badEnter, errorText, colorIcon, passGood: false, good: false })
      return;
    }
    else this.setState({ passGood: true })
    obj = {
      Email: email,
      FullName: name + ' ' + surname,
      Password: password,
      Role: 2
    }
    url = serverUrl + 'auth/signup/';
    log = 'Регистрации'

    console.log('email: ' + email + ' city: ' + name + ' surname: ' + surname)
    console.log('badEnter.email: ' + badEnter.email + ' badEnter.name: ' + badEnter.name +
      ' badEnter.surname: ' + badEnter.surname + ' badEnter.password: ' + badEnter.password)
    console.log('good', good)

    this.setState({ submit: true, disBtn: true })
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
    })
      .then(function (response) {
        if (response.status == 200 || response.status == 201) {
          console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
          console.log(response);
          Alert.alert('Вы зарегистрированы!', 'Пожалуйста, заполните дополнительную информацию по вашему адресу',
            [{ text: 'OK' }]);
          return response.json();
        }
        else if (response.status == 500) {
          console.log('Server Error', "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', 'Ошибка сервера. Status: ' + response.status + ' ' + response,
            [{ text: 'OK' }]);
        }
        else if (response.status == 400) {
          console.log('Bad Request', "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', 'Пользователь с таким логином уже существует',
            [{ text: 'OK' }]);
        }
        else {
          console.log(response.statusText, "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', response.statusText + " Status: " + response.status + ' ' + response,
            [{ text: 'OK' }]);
        }
        $this.setState({ submit: false, disBtn: false });
        return response.status
      })
      .then(function (data: AuthData) {
        console.log('data: ', data);
        if (data.token) {
          $this.setClearState();
          actions.Login(data.token, data.userLogin)
          const back = false;
        }
      })
      .catch(error => {
        console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
        if (error == 'TypeError: Network request failed') {
          Alert.alert('Внимание', 'Сервер не доступен: ' + error, [{ text: 'OK' }]);
        }
        else {
          Alert.alert('Внимание', 'Ошибка входа. ' + error, [{ text: 'OK' }]);
        }
        $this.setState({ submit: false, disBtn: false })
        return
      });
  }
  private setClearState() {
    var arr: arrBool = {
      email: false,
      name: false,
      surname: false,
      password: false,
      repeatPassword: false
    };
    var arrCol: arrText = {
      email: ColorApp,
      name: ColorApp,
      surname: ColorApp,
      password: ColorApp,
      repeatPassword: ColorApp
    };
    this.setState({
      email: '', name: '', surname: '',
      password: '', repeatPassword: '', color: ColorApp,
      good: true, passGood: false, submit: false, disBtn: true,
      badEnter: arr, errorText: initArrTxt, colorIcon: arrCol
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
  inputMultiline: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignContent: 'flex-start',
  },
  flex: {
    margin: 120,
    textAlign: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 200,
  },
  fixToText: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    width: 250,
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
  link: {
    marginVertical: 20,
    color: ColorApp,
    textAlign: 'center',
    fontSize: 20,
  },
  error: {
    marginTop: 5,
    color: 'red',
    marginBottom: -10
  },
  indicator: {
    marginTop: 50,
    position: 'absolute',
    alignSelf: 'center',
  },
  paddingBottom: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
  },
})

export { RegistrationScreen };