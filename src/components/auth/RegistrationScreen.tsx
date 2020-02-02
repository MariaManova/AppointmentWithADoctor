import React, { Component } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert,
  ActivityIndicator, RefreshControl
} from 'react-native';
import { Header, globalStyles } from '..';
import { h, w, ColorApp, serverUrl, Background, IndicatorApp, colorError, BackgroundColor } from '../../constants'
import { User, arrText, arrBool, Patient } from '../../interfaces'
import { actions } from '../../store'
import { Icon, Card, Input } from 'react-native-elements'
import { TextInput, Modal, Portal, Button, Provider } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';
import { CityList, VladimirStreetList } from './Lists';
import { AUTH } from '../../routes';

interface Props { }
interface State { }
interface AuthData {
  user: User,
}
var actColor = '#8b00ff'
var disColor = '#666'

class RegistrationScreen extends Component<any, State, Props> {
  state = {
    email: '', name: '', address: '', password: '', repeatPassword: '',
    city: '', street: '', homeN: '',
    color: ColorApp, visibility: false, visibleModal: false, width: 1,
    good: true, submit: false, disBtn: true, refreshing: false, disBtnModal: true,
    cityList: CityList, cityListAll: CityList, vladimirStreetList: VladimirStreetList,
    vladimirStreetListAll: VladimirStreetList,
    badEnter: {
      email: false,
      name: false,
      address: false,
      password: false,
      repeatPassword: false,
      city: false, street: false, homeN: false
    },
    errorText: {
      email: '',
      name: '',
      address: '',
      password: '',
      repeatPassword: '',
      city: '', street: '', homeN: ''
    },
    colorField: {
      email: disColor,
      name: disColor,
      address: disColor,
      password: disColor,
      repeatPassword: disColor,
      city: disColor, street: disColor, homeN: disColor,
      button: disColor
    }
  }

  componentDidMount = () => {
    console.log('Props RegistrationScreen', this.props)
  }

  onSearchCity = (text: string) => {
    var cityList = this.state.cityListAll;
    if (text) {
      var filtered = cityList.filter((el) =>
        el.value.toLowerCase().indexOf(text.toLowerCase()) > -1
      );
      this.setState({ cityList: filtered });
    }
    else this.setState({ cityList });
  }
  onSearchStreet = (text: string) => {
    var vladimirStreetList = this.state.vladimirStreetListAll;
    if (text) {
      var filtered = vladimirStreetList.filter((el) =>
        el.value.toLowerCase().indexOf(text.toLowerCase()) > -1);
      this.setState({ vladimirStreetList: filtered });
    }
    else this.setState({ vladimirStreetList });
  }

  render() {
    const { email, name, address, password, repeatPassword, visibility, visibleModal,
      badEnter, errorText, colorField, submit, width, disBtn, refreshing } = this.state
    const { navigation } = this.props
    const { fixToText, fixToTextElem, icon, textInput, input, buttonContainer, buttonTitle,
      indicator, link, error, paddingBottom } = locStyles
    const { im, cardStyle, inputStyle, textInputPaper, inputPaper, inputMultiPaper, buttonWM } = globalStyles
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
        <ScrollView>
          <Card containerStyle={cardStyle} >
            <View style={fixToText}>
              <View style={textInputPaper}>
                <TextInput
                  style={[inputPaper, inputStyle]}
                  mode='outlined'
                  onChangeText={this.onChangeEmail.bind(this)}
                  label='Email'
                  underlineColorAndroid={colorField.email}
                  autoCompleteType='email'
                  textContentType='emailAddress'
                  keyboardType='email-address'
                  value={email}
                  onEndEditing={() => this.onCheckEmail(email)}
                  editable={!submit}
                  error={badEnter.email}
                  theme={{ colors: { primary: colorField.email } }}
                />
                {badEnter.email && <Text style={error}>{errorText.email}</Text>}
              </View>
            </View>
            <View style={fixToText}>
              <View style={textInputPaper}>
                <TextInput
                  style={[inputPaper, inputStyle]}
                  mode='outlined'
                  onChangeText={this.onChangeName.bind(this)}
                  label='ФИО'
                  autoCompleteType='name'
                  value={name}
                  onEndEditing={() => this.onCheckName(name)}
                  editable={!submit}
                  error={badEnter.name}
                  theme={{ colors: { primary: colorField.name } }}
                />
                {badEnter.name && <Text style={error}>{errorText.name}</Text>}
              </View>
            </View>
            <View style={fixToText}>
              <View style={textInputPaper}>
                <TextInput
                  style={[inputMultiPaper, inputStyle]}
                  mode='outlined'
                  //onChangeText={this.onChangeAddress.bind(this)}
                  label='Адрес'
                  onFocus={this._showModal.bind(this)}
                  onTouchStart={this._showModal.bind(this)}
                  value={address}
                  onEndEditing={() => this.onCheckAddress(address)}
                  editable={!submit}
                  multiline
                  numberOfLines={1}
                  error={badEnter.address}
                  theme={{ colors: { primary: colorField.address } }}
                />
                {badEnter.address && <Text style={error}>{errorText.address}</Text>}
              </View>
            </View>
            <View style={fixToTextElem}>
              <View style={textInput}>
                <Input
                  inputContainerStyle={[input, {
                    borderColor: colorField.password, borderWidth: width,
                    borderBottomWidth: width
                  }]}
                  inputStyle={inputStyle}
                  onChangeText={this.onChangePassword.bind(this)}
                  onTouchStart={this.activePass.bind(this)}
                  placeholder='Пароль'
                  autoCompleteType='password'
                  textContentType='password'
                  secureTextEntry={!visibility}
                  value={password}
                  onEndEditing={() => this.onCheckPass(password)}
                  editable={!submit}
                  rightIcon={visibility ? <Icon name='visibility' onPress={this.onVisibility.bind(this)} />
                    : <Icon name='visibility-off' onPress={this.onVisibility.bind(this)} color='grey' />}
                />
                {badEnter.password && <Text style={error}>{errorText.password}</Text>}
              </View>
            </View>
            <View style={fixToText}>
              <View style={textInputPaper}>
                <TextInput
                  style={[inputPaper, inputStyle]}
                  mode='outlined'
                  onChangeText={this.onChangeRepeatPassword.bind(this)}
                  label='Повторите пароль'
                  autoCompleteType={'password'}
                  textContentType={'password'}
                  secureTextEntry={!visibility}
                  value={repeatPassword}
                  onEndEditing={() => this.onCheckRep(repeatPassword)}
                  editable={!submit}
                  error={badEnter.repeatPassword}
                  theme={{ colors: { primary: colorField.repeatPassword } }}
                />
                {badEnter.repeatPassword && <Text style={error}>{errorText.repeatPassword}</Text>}
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={buttonWM}>
                <Button
                  mode="contained"
                  uppercase={false}
                  onPress={this.onSubmit.bind(this)}
                  disabled={disBtn}
                  loading={submit}
                  contentStyle={[buttonContainer, { backgroundColor: colorField.button }]}
                  labelStyle={buttonTitle}>Регистрация</Button>
              </View>
            </View>
          </Card>

          <View style={{ margin: 90 }}><Text> </Text></View>
        </ScrollView>
        {submit && <Provider>
          <Portal>
            <Modal visible={submit} >
              <ActivityIndicator style={indicator} size={70} color={IndicatorApp} />
            </Modal>
          </Portal>
        </Provider>}
        {this.onModal()}
      </View>
    );
  }

  private onModal() {
    const { visibleModal, city, street, homeN, submit, badEnter, colorField,
      errorText, disBtnModal, cityList, vladimirStreetList } = this.state
    const { cardStyle, inputStyle, contStyle, dropdownStyle, textInputPaper, 
      inputMultiline, inputPaper, buttonWM } = globalStyles
    const { fixToText, textInput, buttonContainer, buttonTitle, error } = locStyles
    return (
      <Provider>
        <Portal>
          <Modal visible={visibleModal} onDismiss={this._hideModal}
            contentContainerStyle={{ position: 'absolute', top: 100, left: 0, right: 0 }}>
            <Card containerStyle={cardStyle} >
              <View style={fixToText}>
                <View style={textInputPaper}>
                  <TextInput
                    style={[inputPaper, inputStyle, { width: w * 0.83 }]}
                    mode='outlined'
                    onChangeText={this.onChangeCity.bind(this)}
                    label='Город *'
                    placeholder='Начите вводить..'
                    value={city}
                    editable={!submit}
                    error={badEnter.city}
                    theme={{ colors: { primary: colorField.city } }}
                  />
                  <Dropdown
                    data={cityList}
                    onChangeText={this.onChangeCity.bind(this)}
                    value={city}
                    containerStyle={[contStyle, { marginTop: -66, width: 30, alignSelf: 'flex-end' }]}
                    pickerStyle={[dropdownStyle, inputMultiline, { width: w * 0.8, marginLeft: -w * 0.75, height: 300 }]}
                    dropdownPosition={0}
                    disabled={submit}
                  />
                  {badEnter.city && <Text style={error}>{errorText.city}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <View style={textInputPaper}>
                  <TextInput
                    style={[inputPaper, inputStyle, { width: w * 0.83 }]}
                    mode='outlined'
                    onChangeText={this.onChangeStreet.bind(this)}
                    label='Улица *'
                    placeholder='Начите вводить..'
                    value={street}
                    editable={!submit}
                    error={badEnter.street}
                    theme={{ colors: { primary: colorField.street } }}
                  />
                  <Dropdown
                    data={vladimirStreetList}
                    onChangeText={this.onChangeStreet.bind(this)}
                    value={street}
                    containerStyle={[contStyle, { marginTop: -66, width: 30, alignSelf: 'flex-end' }]}
                    pickerStyle={[dropdownStyle, inputMultiline, { width: w * 0.8, marginLeft: -w * 0.75, height: 300 }]}
                    dropdownPosition={0}
                    disabled={submit}
                  />
                  {badEnter.street && <Text style={error}>{errorText.street}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <View style={textInput}>
                  <TextInput
                    style={[inputPaper, inputStyle, { width: w * 0.88 }]}
                    mode='outlined'
                    onChangeText={this.onChangeHomeN.bind(this)}
                    label='Номер дома *'
                    keyboardType='visible-password'
                    value={homeN}
                    editable={!submit}
                    error={badEnter.homeN}
                    theme={{ colors: { primary: colorField.homeN } }}
                  />
                  {badEnter.homeN && <Text style={error}>{errorText.homeN}</Text>}
                </View>
              </View>
              <View style={buttonWM}>
                <Button
                  mode="contained"
                  uppercase={false}
                  onPress={this._hideModal.bind(this)}
                  disabled={disBtnModal}
                  style={buttonContainer}
                  loading={submit}
                  labelStyle={buttonTitle}>Подтвердить</Button>
              </View>
            </Card>
          </Modal>
        </Portal >
      </Provider >
    )
  }

  _showModal = () => this.setState({ visibleModal: true });
  _hideModal = () => this.setState({ visibleModal: false });

  private onChangeCity(city: string) {
    this.onSearchCity(city)
    var { badEnter, errorText, colorField, street, homeN } = this.state
    var address = 'г. ' + city + ', ' + street + ' д. ' + homeN
    if (city == ' ') { return }
    if (!city) {
      badEnter.city = true;
      colorField.city = 'red'
      errorText.city = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, city, good: false });
      return;
    }
    else {
      badEnter.city = false;
      colorField.city = 'green'
      this.setState({ address, city, colorField, badEnter });
      this.checkFieldsModal(city, street, homeN);
    }
  }
  private onChangeStreet(street: string) {
    this.onSearchStreet(street)
    var { badEnter, errorText, colorField, city, homeN } = this.state
    var address = 'г. ' + city + ', ' + street + ' д. ' + homeN
    if (street == ' ') { return }
    if (!street) {
      badEnter.street = true;
      colorField.street = 'red'
      errorText.street = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, street, good: false });
      return;
    }
    else {
      badEnter.street = false;
      colorField.street = 'green'
      this.setState({ address, street, colorField, badEnter });
      this.checkFieldsModal(city, street, homeN);
    }
  }
  private onChangeHomeN(homeN: string) {
    var { badEnter, errorText, colorField, city, street } = this.state
    var address = 'г. ' + city + ', ' + street + ' д. ' + homeN
    if (homeN == ' ') { return }
    if (!homeN) {
      badEnter.homeN = true;
      colorField.homeN = 'red'
      errorText.homeN = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, homeN, good: false });
      return;
    }
    else {
      badEnter.homeN = false;
      colorField.homeN = 'green'
      this.setState({ address, homeN, badEnter });
      this.checkFieldsModal(city, street, homeN);
    }
  }

  private checkFieldsModal(city: string, street: string, homeN: string) {
    const { badEnter } = this.state
    if (city && street && homeN && !badEnter.city && !badEnter.street && !badEnter.homeN) {
      badEnter.address = false
      this.setState({ disBtnModal: false, badEnter })
    }
  }
  private checkFields() {
    const { email, name, address, password, repeatPassword, badEnter, colorField } = this.state
    if (email && name && address && password && repeatPassword &&
      !badEnter.email && !badEnter.name && !badEnter.address && !badEnter.password &&
      !badEnter.repeatPassword) {
        colorField.button = actColor;
        this.setState({ disBtn: false, colorField })
    }
  }

  private onChangeEmail(email: string) {
    var { badEnter, errorText, colorField } = this.state
    if (email == ' ') { return }
    if (!email) {
      badEnter.email = true;
      errorText.email = 'Поле не заполнено'
      colorField.email = colorError
      this.setState({ badEnter, errorText, colorField, email, good: false, disBtn: true });
      return;
    }
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email.trim()) == false) {
      badEnter.email = true;
      errorText.email = 'Введите корректный e-mail'
      colorField.email = colorError
      this.setState({ badEnter, errorText, email, good: false, disBtn: true });
      return;
    }
    else {
      colorField.email = 'green'
      badEnter.email = false;
      this.setState({ email, badEnter });
      this.checkFields()
    }
  }
  private onCheckEmail(email: string) {
    var { badEnter, errorText, colorField } = this.state
    if (!email) {
      badEnter.email = true;
      errorText.email = 'Поле не заполнено'
      colorField.email = colorError
      this.setState({ badEnter, errorText, email, good: false, disBtn: true });
      return;
    }
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email.trim()) == false) {
      badEnter.email = true;
      errorText.email = 'Введите корректный e-mail'
      colorField.email = colorError
      this.setState({ badEnter, errorText, email, good: false, disBtn: true });
      return;
    }
    else {
      badEnter.email = false;
      colorField.email = 'green'
      this.setState({ email: email.trim(), badEnter });
      this.checkFields()
    }
  }
  private onChangeName(name: string) {
    var { badEnter, errorText, colorField } = this.state
    if (name == ' ') { return }
    if (!name) {
      badEnter.name = true;
      errorText.name = 'Поле не заполнено'
      this.setState({ badEnter, errorText, name, good: false, disBtn: true });
      return;
    }
    else if (name.trim().length > 5 && name.trim().length < 100) {
      badEnter.name = false;
      colorField.name = 'green'
    }
    this.setState({ name, badEnter });
    this.checkFields()
  }
  private onCheckName(name: string) {
    var { badEnter, errorText, colorField } = this.state
    if (name.trim().length < 6 || name.trim().length > 100) {
      badEnter.name = true;
      errorText.name = 'ФИО должно быть больше 5 символов и меньше 100'
      this.setState({ badEnter, errorText, name, good: false, disBtn: true });
      return;
    }
    else {
      this.setState({ name: name.trim() });
    }
  }
  private onCheckAddress(address: string) {
    var { badEnter, errorText, colorField } = this.state
    if (!address) {
      badEnter.address = true;
      errorText.address = 'Поле не заполнено'
      this.setState({ badEnter, errorText, address, good: false, disBtn: true });
      return;
    }
    else {
      badEnter.address = false;
      colorField.address = 'green'
      this.setState({ address: address.trim(), badEnter, colorField });
    }
  }
  private activePass() {
      var {  colorField } = this.state
          colorField.password = actColor
      this.setState({ colorField, width: 2  });
  }
  private onChangePassword(password: string) {
    var { badEnter, errorText, colorField } = this.state
    if (password == ' ') { return }
    if (password.trim().length >= 8) {
      badEnter.password = false
      colorField.password = 'green'
      this.setState({ colorField, badPass: false });
      var repPass = this.state.repeatPassword;
      if (repPass && repPass != password) {
        badEnter.repeatPassword = true;
        errorText.repeatPassword = 'Пароли не совпадают'
        colorField.repeatPassword = colorError
        this.setState({ badEnter, errorText, colorField, passGood: false, good: false, disBtn: true });
      }
    }
    else {
      colorField.password = actColor
    }
    this.setState({ password: password.trim(), colorField });
    this.checkFields()
  }
  private onCheckPass(pass: string) {
    var { badEnter, errorText, colorField } = this.state
    if (pass.trim().length < 8) {
      badEnter.password = true;
      errorText.password = 'Пароль должен иметь длину не менее 8 знаков'
      colorField.password = colorError
      this.setState({ badEnter, errorText, colorField, pass, good: false, disBtn: true, width: 2 });
      return;
    }
  }
  private onChangeRepeatPassword(repeatPassword: string) {
    var { badEnter, errorText, colorField } = this.state
    var pass = this.state.password;
    if (repeatPassword == ' ') { return }
    if (pass.trim().length == repeatPassword.trim().length && pass === repeatPassword) {
      badEnter.repeatPassword = false;
      badEnter.password = false;
      colorField.repeatPassword = 'green'
      this.setState({ badEnter, colorField, passGood: true });
    }
    else if (pass.trim().length <= repeatPassword.trim().length) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Пароли не совпадают'
      colorField.repeatPassword = colorError
      this.setState({ badEnter, errorText, colorField, passGood: false, good: false, disBtn: true });
    }
    else {
      colorField.repeatPassword = actColor
      badEnter.repeatPassword = false;
      this.setState({ badEnter, colorField });
      this.checkFields()
    }
    this.setState({ repeatPassword: repeatPassword.trim() });
  }
  private onCheckRep(repeatPassword: string) {
    var { badEnter, errorText, colorField } = this.state
    var pass = this.state.password;
    if (pass !== repeatPassword) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Пароли не совпадают'
      colorField.repeatPassword = colorError
      this.setState({ badEnter, errorText, colorField, passGood: false, disBtn: true });
    }
  }
  private onVisibility() {
    var { visibility } = this.state
    this.setState({ visibility: !visibility })
  }

  private onSubmit() {
    const { email, name, address, password, repeatPassword, badEnter, errorText,
      colorField, good, city, street, homeN } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string;

    if (!email) {
      badEnter.email = true;
      errorText.email = 'Поле не заполнено'
      colorField.email = colorError
      this.setState({ badEnter, errorText, colorField, good: false });
    }
    if (!name) {
      badEnter.name = true;
      errorText.name = 'Поле не заполнено'
      colorField.name = colorError
      this.setState({ badEnter, errorText, colorField, good: false });
    }
    if (!address) {
      badEnter.address = true;
      errorText.address = 'Поле не заполнено'
      colorField.address = colorError
      this.setState({ badEnter, errorText, colorField, good: false });
    }
    if (!password) {
      badEnter.password = true;
      errorText.password = 'Поле не заполнено'
      colorField.password = colorError
      this.setState({ badEnter, errorText, colorField, good: false });
    }
    if (!repeatPassword) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Поле не заполнено'
      colorField.repeatPassword = colorError
      this.setState({ badEnter, errorText, colorField, good: false });
    }
    if (!email || !name || !address || !password || !repeatPassword) {
      Alert.alert('Внимание', 'Не все поля заполнены',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      this.setState({ disBtn: true });
      return;
    }
    if (!city || !street || !homeN || badEnter.city || badEnter.street || badEnter.homeN) {      
      badEnter.address = true;
      errorText.address = 'Адрес заполнен неверно'
      colorField.address = colorError
      Alert.alert('Внимание', 'Адрес заполнен неверно',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      this.setState({ disBtn: true });
      return;
    }

    if (badEnter.email || badEnter.name || badEnter.address ||
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
      colorField.repeatPassword = colorError
      this.setState({ badEnter, errorText, colorField, passGood: false, good: false })
      return;
    }
    else this.setState({ passGood: true })
    obj = {
      Email: email,
      FullName: name,
      Address: address,
      Gender: 0,
      Password: password,
      Role: 2
    }
    url = serverUrl + 'auth/signup/';
    log = 'Регистрации'

    console.log('email: ' + email + ' ФИО: ' + name + ' address: ' + address)
    console.log('badEnter.email: ' + badEnter.email + ' badEnter.name: ' + badEnter.name +
      ' badEnter.address: ' + badEnter.address + ' badEnter.password: ' + badEnter.password)
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
          Alert.alert('Вы зарегистрированы!', 'Пожалуйста, войдите в систему используя свой логин и пароль',
            [{ text: 'OK' }]);
          $this.setState({ submit: false, disBtn: false });
          return response.json();
        }
        else if (response.status == 500) {
          console.log('Server Error', "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', 'Ошибка сервера. Status: ' + response.status + ' ' + response,
            [{ text: 'OK' }]);
        }
        else if (response.status == 400) {
          console.log('Bad Request', "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', 'Пользователь с таким email уже существует',
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
        if (data) {
          $this.setClearState();
          navigation.navigate(AUTH, data);
        }
      })
      .catch(error => {
        console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
        if (error == 'TypeError: Network request failed') {
          Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);
        }
        else {
          Alert.alert('Внимание', 'Ошибка входа. ' + error, [{ text: 'OK' }]);
        }
        $this.setState({ submit: false, disBtn: false })
        return
      });
  }
  private setClearState() {
    this.setState({
      email: '', name: '', address: '', password: '', repeatPassword: '',
      city: '', street: '', homeN: '',
      color: ColorApp, visibility: false, visibleModal: false, width: 1,
      good: true, submit: false, disBtn: true, refreshing: false,
      badEnter: {
        email: false,
        name: false,
        address: false,
        password: false,
        repeatPassword: false
      },
      errorText: {
        email: '',
        name: '',
        address: '',
        password: '',
        repeatPassword: ''
      },
      colorField: {
        email: actColor,
        name: actColor,
        address: actColor,
        password: '#666',
        repeatPassword: actColor
      }
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
    width: w * 0.9,
  },
  input: {
    borderRadius: 3,
    padding: 10,
    height: 42,
  },
  inputMultiline: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignContent: 'center',
  },
  flex: {
    margin: 120,
    textAlign: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 200,
  },
  fixToText: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fixToTextElem: {
    marginTop: 20,
    marginBottom: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: ColorApp,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  buttonTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'normal'
  },
  link: {
    marginVertical: 20,
    color: ColorApp,
    textAlign: 'center',
    fontSize: 20,
  },
  error: {
    marginTop: 5,
    color: colorError,
    marginHorizontal: 10,
    marginBottom: -10
  },
  indicator: {
    marginTop: h * 0.4,
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