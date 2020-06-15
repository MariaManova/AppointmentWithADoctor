import React, { PureComponent, useRef } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator,
  RefreshControl, Alert
} from 'react-native';
import { Header, globalStyles, AppointmentCard,DoctorACard } from '..';
import { Role, Category } from '../../enum/Enums';
import { h, w, NoAvatar, serverUrl, IndicatorApp, ColorApp, months } from '../../constants'
import { store } from '../../store';
import { Doctor, InitialDoctor, User, HomeData, Appreciated, Appointment,AuthData } from '../../interfaces';
import { Rating, AirbnbRating, Badge, Divider, Card, Tooltip, Icon, } from 'react-native-elements';
import { AUTH, REGISTRATION, DOCTORProfile } from '../../routes';
import { Button, Provider, Portal, Modal, TextInput, DataTable, List } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

interface errorBool {
  date: boolean,
  time: boolean
}
interface errorTxt {
  date: string,
  time: string
}
interface ProfileData {  
  doctor: Doctor,
  doctorapps: Appointment[],
  history: Appointment[],
}
interface Props { }
interface State {
  data: Doctor,
  load: boolean,
  doctorapps: Appointment[],
  history: Appointment[],
  appreciated: Appreciated,
  loadError: boolean,
  refreshing: boolean,
  rating: number,
  newRating: number,
  estimate: boolean //оценить
  myRef: any,
  confirmRating: boolean,
  numRated: number,
  visibleModal: boolean,
  date: Date,
  time: Date[], //список доступного времени записи
  timeAll: Date[], //весь список доступного времени записи
  timeToday: Date[], //список доступного времени записи сегодня
  dateStr: string, //строка отображения даты
  timeAppt: Date, //время записи на прием
  today: boolean,
  show: boolean,
  disBtn: boolean,
  submit: boolean,
  badEnter: errorBool,
  errorText: errorTxt,
  colorField: errorTxt,
  page: number,
  pageOfTimes: Date[],
  pageSize: number,
  confirmAppointment: boolean,
  loadTable: boolean
}
const ratingArr = ['Ужасный', 'Плохой', 'Нормальный', 'Хороший', 'Отличный']
var color = '#8b00ff'
var t: Date = new Date(0, 0, 0, (9 + 3), 45, 0, 0);
var time: Date[] = [];
var timeToday: Date[] = [];
var tInit = new Date(t)
tInit = new Date(tInit.setHours((tInit.getUTCHours()), (tInit.getMinutes() + 15), 0, 0))
var tn = new Date()
for (var i = 0; i < 28; i++) {
  time.push(t);
  if (tn.toLocaleTimeString() < tInit.toLocaleTimeString()) {
    timeToday.push(t);
  }
  t = new Date(t.setMinutes(t.getMinutes() + 15));
  tInit = new Date(tInit.setMinutes(tInit.getMinutes() + 15));
}
t = new Date();
var endOfWorkingDay = new Date(t);
endOfWorkingDay = new Date(endOfWorkingDay.setHours(16, 0, 0, 0))
var today = true;
if (t > endOfWorkingDay) {
  t = new Date(t.setUTCHours(24, 0, 0, 0))
  today = false
}
class DoctorProfileTwo extends PureComponent<any, State, Props> {
  state = {
    doctorapps: [], history: [],
    data: InitialDoctor, load: true, loadError: false, refreshing: false,
    appreciated: {}, rating: 0, newRating: 0, estimate: false, myRef: React.createRef(),
    confirmRating: false, numRated: 0, visibleModal: false, date: t, time: [],
    timeAll: time.slice(), timeToday: timeToday.slice(), dateStr: '', today,
    show: false, disBtn: false, submit: false, confirmAppointment: false, timeAppt: null,
    badEnter: {
      date: false,
      time: false,
    },
    errorText: {
      date: '',
      time: '',
    },
    colorField: {
      date: color,
      time: color,
    },
    page: 0, pageOfTimes: [], pageSize: 10, loadTable: false
  } as unknown as State

  componentDidMount = async () => {
    const { date, pageSize } = this.state
    this.setInitDate(date);
    const { userLogin, patient, token } = store.state;
    console.log('token: ', token)
    console.log('date: ', date)
    console.log(' props.params: ', this.props.navigation.state.params)
    const doctor: Doctor = this.props.navigation.state.params
    this.setState({ rating: doctor.rating, loadError: false })
    var logAction = 'Профиль врача';
    try {
      if (token) {
        const response = await fetch(serverUrl + 'doctor?id_Doctor=' + doctor.id + '&id_User=' + userLogin.id, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        if (response.status == 200) {
          this.setState({
            doctorapps: data.doctorapps, history: data.history,
            appreciated: data.appreciated, rating: data.doctor.rating, 
            numRated: data.doctor.numRated, load: true
          })
          console.log('Успех fetch ' + logAction, data)
        }
        else if (response.status == 404) {
          console.log('Внимание', 'Доктор не найден id=' + doctor.id);
          this.setState({ loadError: true, load: true })
        }
        else {console.log ('Внимание', response)}
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
    const { navigation } = this.props
    var propsData = this.props.navigation.state.params
    const { id, photo, user, speciality, enum_Category, placeOfWork } = propsData
    const { data, load, loadError, appreciated, refreshing, rating, estimate, myRef, confirmRating,
      numRated } = this.state
    const { images, h1, sub, link, indicator, mrgTop, buttonWG, buttonTitle,
      buttonContainerSp, buttonContenSp, cardStyle, } = globalStyles
    const { h2, h3, top, label, confirmStyle } = locStyles
    return (<View>
      <Header title='Записи Врачей'
        leftIcon={'arrow-back'}
        onPressLeft={() => navigation.goBack()} />

      <View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
          }
        >
          <Image source={{ uri: photo ? photo.url : NoAvatar }} style={images} />
          <View style={top}>
            <Text style={h1}>{user.fullName}</Text>
            <Text style={h2}>{speciality.nameSpeciality}</Text>
          </View>
          {load ? (<View>
           
          </View>
          ) : !loadError && <ActivityIndicator style={[indicator, { marginTop: w * 0.7 }]} size={50} color={IndicatorApp} />

          }
          {/* <Tooltip
          ref={myRef}
          width={200}
          withOverlay={false}
          popover={}>
        </Tooltip> */}
          <Divider style={{ marginVertical: 15 }} />
          <Text style={h3}>Категория:
          <Text style={{ color: 'black' }}> {enum_Category == 1 ? Category.first : enum_Category == 2 ?
              Category.second : Category.higher}</Text> </Text>
          <Text style={h3}>Основное место работы:
          <Text style={{ color: 'black' }}> {placeOfWork.namePlace}</Text> </Text>
          {token ? (
            <View>
            
            {this.myAppointments()}
        <View style={{ margin: 50 }}></View>
             </View>
            
          ) :
            (<Card containerStyle={cardStyle} >

              <Text style={label}> Чтобы иметь возможность записаться на прием, войдите</Text>
              <Button
                mode="contained"
                uppercase={false}
                onPress={() => navigation.navigate(AUTH)}
                style={buttonContainerSp}
                labelStyle={buttonTitle}>
                Войти
            </Button>
              <TouchableOpacity
                onPress={() => navigation.navigate(REGISTRATION)}>
                <Text style={link}>Зарегистрироваться</Text>
              </TouchableOpacity>
            </Card>
            )
          }
          <View style={{ margin: 55 }}><Text> </Text></View>
        </ScrollView>
      </View>
      {this.onModal()}
    </View >
    );
  }

  private myAppointments() {
    const {  sectionContainer1, sectionTitle1, } = locStyles
    var { doctorapps, history  } = this.state
    const { navigation } = this.props
    return (
      <List.Section>
      <List.Accordion
       title={"Текущие записи  (" + (doctorapps.length ? doctorapps.length : 0)+')'}
        left={props => <List.Icon {...props} icon="folder" />}
        style={sectionContainer1}
        titleStyle={sectionTitle1}
      >
        {doctorapps.map((item: Appointment, id) => {
              return <DoctorACard data={item} key={id} 
             // onPress={() => navigation.navigate('PROFILE', (item.fk_Patient ))}
              />
            })}
      </List.Accordion>

      <List.Accordion
        title={"История записей (" + (history.length ? history.length : 0)+')'}
        left={props => <List.Icon {...props} icon="history" />}
        style={sectionContainer1}
        titleStyle={sectionTitle1}
      >
      {history.map((item: Appointment, id) => {
            return <DoctorACard data={item} key={id} 
            //onPress={() => navigation.navigate(DOCTORProfile, (item.doctor))}
            />
          })}
      </List.Accordion>
    </List.Section>
    )
  }
  private onModal() {
    var { visibleModal, show, date, dateStr, disBtn, submit, badEnter, errorText, colorField, page,
      pageOfTimes, pageSize, confirmAppointment, timeAppt, loadTable, loadError, timeToday, today } = this.state
    const { cardStyle, inputStyle, buttonContainer, mrgTop, buttonWG, textInputPaper, inputPaper,
      fixToText, buttonTitle, h1, buttonWM, error, label, indicator } = globalStyles
    const { btnTableStyle, notSelectedBtnTableStyle, notSelectedSectionTitle } = locStyles
    var totalPages = 0;
    if (today) {
      totalPages = Math.ceil(timeToday.length / pageSize)
    }
    else
      totalPages = Math.ceil(time.length / pageSize)
    return (
      <Provider>
        <Portal>
          <Modal visible={visibleModal} onDismiss={this._hideModal}
            contentContainerStyle={{ position: 'absolute', top: 100, left: 0, right: 0 }}>
            <Card containerStyle={cardStyle} >
              {show && <DateTimePicker value={date}
                mode='date'
                is24Hour={true}
                display="default"
                onChange={this.onChangeDate.bind(this)}
              />
              }
              <Text style={h1}>Запись на прием</Text>
              <View style={fixToText}>
                <View style={textInputPaper}>
                  <TextInput
                    style={[inputPaper, inputStyle, { width: w * 0.83 }]}
                    mode='outlined'
                    onKeyPress={this.datepicker.bind(this)}
                    onTouchStart={this.datepicker.bind(this)}
                    label='Дата приема'
                    placeholder='Выберите..'
                    value={dateStr}
                    editable={!submit}
                    error={badEnter.date}
                    theme={{ colors: { primary: colorField.date } }}
                  />
                  {badEnter.date && <Text style={error}>{errorText.date}</Text>}
                </View>
              </View>
              <Text style={[label, mrgTop, { marginLeft: 10 }]}>Доступное время:</Text>
              {(!badEnter.date && loadTable) ?
                <DataTable>
                  {pageOfTimes.map((el, id: number, arr) => {
                    return (
                      (id & 1) ? (
                        el && <View>
                          <DataTable.Row key={id}>

                            <DataTable.Cell> </DataTable.Cell>
                            <Button
                              mode={timeAppt == arr[id - 1] ? "contained" : 'outlined'}
                              uppercase={false}
                              key={id - 1}
                              onPress={this.onConfirmTime.bind(this, arr[id - 1])}
                              disabled={disBtn}
                              style={(confirmAppointment && timeAppt != arr[id - 1]) ? notSelectedBtnTableStyle : btnTableStyle}
                              labelStyle={confirmAppointment ? (timeAppt == arr[id - 1] ? buttonTitle : notSelectedSectionTitle) : buttonTitle}
                              icon={(confirmAppointment && timeAppt == arr[id - 1]) ? 'check-circle' : ''}>
                              {arr[id - 1] && this.toTime(arr[id - 1])}
                            </Button>
                            <View style={{ width: 10 }}></View>
                            <Button
                              mode={timeAppt == el ? "contained" : 'outlined'}
                              uppercase={false}
                              key={id}
                              onPress={this.onConfirmTime.bind(this, el)}
                              disabled={disBtn}
                              style={(confirmAppointment && timeAppt != el) ? notSelectedBtnTableStyle : btnTableStyle}
                              labelStyle={confirmAppointment ? (timeAppt == el ? buttonTitle : notSelectedSectionTitle) : buttonTitle}
                              icon={(confirmAppointment && timeAppt == el) ? 'check-circle' : ''}>
                              {el && this.toTime(el)}
                            </Button>
                            <DataTable.Cell> </DataTable.Cell>
                          </DataTable.Row>
                          {((arr.length & 1) && (arr.length == (id + 2))) ? (
                            <DataTable.Row key={id + 1}>
                              <DataTable.Cell> </DataTable.Cell>
                              <Button
                                mode={timeAppt == arr[id + 1] ? "contained" : 'outlined'}
                                uppercase={false}
                                key={id + 1}
                                onPress={this.onConfirmTime.bind(this, arr[id + 1])}
                                disabled={disBtn}
                                style={(confirmAppointment && timeAppt != arr[id + 1]) ? notSelectedBtnTableStyle : btnTableStyle}
                                labelStyle={confirmAppointment ? (timeAppt == arr[id + 1] ? buttonTitle : notSelectedSectionTitle) : buttonTitle}
                                icon={(confirmAppointment && timeAppt == arr[id + 1]) ? 'check-circle' : ''}>
                                {arr[id + 1] && this.toTime(arr[id + 1])}
                              </Button>
                              <DataTable.Cell> </DataTable.Cell>
                            </DataTable.Row>
                          ) :
                            <View></View>
                          }
                        </View>
                      ) :
                        <View></View>
                    )
                  })}
                  <DataTable.Pagination
                    page={page}
                    numberOfPages={totalPages}
                    onPageChange={(page) => this.paginate(page, totalPages)}
                    label={'1-' + totalPages + ' of ' + (page + 1)}
                  />
                </DataTable>
                :
                <View style={{ margin: 10 }}>
                  {(!badEnter.date && !loadError) && <ActivityIndicator size={50} color={IndicatorApp} />}
                </View>
              }
              <Button
                mode="contained"
                uppercase={false}
                onPress={this.onSubmit.bind(this)}
                disabled={disBtn}
                style={buttonContainer}
                labelStyle={buttonTitle}>
                Подтвердить
            </Button>
            </Card>
          </Modal>
        </Portal >
      </Provider >
    )
  }

  private onConfirmTime(time: Date) {
    this.setState({ confirmAppointment: true, timeAppt: time })
    console.log(time.getUTCHours() + ':' + time.getMinutes());
  }

  private paginate(page: number, totalPages: number) {
    var { time, pageOfTimes, pageSize } = this.state
    if (page < totalPages) {
      var startInd = page * pageSize;
      var endInd = startInd + pageSize
      pageOfTimes = time.slice(startInd, endInd)
      this.setState({ pageOfTimes, page })
    }
  }

  onChangePage(pageOfTimes: Date[]) {
    this.setState({ pageOfTimes: pageOfTimes });
  }

  _showModal() {
    const { date } = this.state
    this.setState({ visibleModal: true });
    this.fetchTimes(date)
  }
  async fetchTimes(date: Date) {
    var logAction = 'Занятое время приема';
    const { userLogin, patient, token } = store.state;
    const doctor: Doctor = this.props.navigation.state.params
    const { pageSize, timeAll, timeToday, badEnter, errorText } = this.state
    var times: Date[] = []
    console.log('date: ', date);
    this.setState({ loadError: false })
    try {
      const response = await fetch(serverUrl + 'doctor/get/appointments?id_Doctor=' + doctor.id + '&date=' + date.toJSON(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()

      if (response.status == 200) {
        var appointments: string[] = [], arr: Date[] = [];
        var dn = new Date()
        data.appointments.forEach((el: Appointment) => {
          var dt = new Date(el.dateTimeReceipt)
          var dataTime = new Date(dt.setHours((dt.getHours() + 1), dt.getMinutes(), 0, 0))
          appointments.push(dataTime.toLocaleTimeString())
        });
        if (date.toLocaleDateString() == dn.toLocaleDateString()) {
          times = timeToday.slice();
        }
        else {
          times = timeAll.slice();
        }
        times.forEach((el, id) => {
          var ind = appointments.indexOf(el.toLocaleTimeString());
          if (ind != -1) {
            appointments.splice(ind, 1);
          }
          else { arr.push(el); }
        })
        var pageOfTimes: Date[] = arr.slice(0, pageSize)

        this.setState({ pageOfTimes, time: arr, loadTable: true, page: 0 })
        console.log('Успех fetch ' + logAction, data)
      }
      else if (response.status == 404) {
        console.log('Внимание', 'Доктор не найден id=' + doctor.id);
        this.setState({ loadError: true, load: true })
      }
    } catch (error) {
      console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
      if (error == 'TypeError: Network request failed') {
        Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);

        this.setState({ loadError: true, load: true })
      }
      else if (error.status == 404) {
        console.log('Внимание', 'Доктор не найден: ' + error, [{ text: 'OK' }]);
      }
      else {
        Alert.alert('Внимание', 'Ошибка сервера: ' + error, [{ text: 'OK' }]);
      }
      this.setState({ loadError: true, load: true })
      return
    }
  }
  _hideModal = () => this.setState({ visibleModal: false });
  setDate = (date: Date) => {
    date = date || this.state.date;
    this.setState({ show: false, date, });
  }
  show = (events: any) => {
    this.setState({ show: true });
  }

  datepicker = () => {
    this.show('date');
  }

  private toTime(time: Date) {
    var date = new Date(time);
    var hours = date.getUTCHours().toString();
    hours = +hours < 0 ? (+hours + 24).toString() : hours;
    hours = hours.length === 1 ? '0' + hours : hours;
    var minutes = date.getMinutes().toString();
    minutes = minutes.length === 1 ? '0' + minutes : minutes;
    return hours + ':' + minutes;
  }
  private toDate = (date: Date) => {
    var d = new Date(date);
    var day = d.getDate().toString();
    var hours = (d.getUTCHours()).toString();
    day = +hours < 0 ? (+day - 1).toString() : day;
    var month = (d.getMonth() + 1).toString()
    month = months[+month - 1];
    return day + ' ' + month + ' ' + d.getFullYear() + ' г.';
  }

  private onChangeDate(date: any) {
    var { badEnter, errorText, colorField, today } = this.state
    var dn = new Date()
    var d = new Date(date.nativeEvent.timestamp);
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 3, 0, 0, 0)
    console.log('date now: ', dn)
    if (d.toLocaleDateString() == dn.toLocaleDateString()) {
      today = true;
    }
    else today = false;
    if (d.toLocaleDateString() == dn.toLocaleDateString() && dn > endOfWorkingDay) {
      badEnter.date = true;
      errorText.date = 'На сегодня больше записываться нельзя!'
    }
    else if (d.toLocaleDateString() < dn.toLocaleDateString()) {
      badEnter.date = true;
      errorText.date = 'Дата не может быть меньше текущей!'
    }
    else {
      badEnter.date = false;
      colorField.date = 'green'
      this.fetchTimes(d)
    }
    console.log('dateFormat: ', d)
    var day = d.getDate().toString();
    day = day.length == 1 ? '0' + day : day;
    var month = (d.getMonth() + 1).toString()
    month = month.length == 1 ? '0' + month : month;
    var dateStr = day + '.' + month + '.' + d.getFullYear();
    console.log('dateStr: ', dateStr)
    this.setState({ dateStr: dateStr, date: d, show: false, badEnter, errorText, colorField, today })
  }
  private setInitDate(d: Date) {
    var day = d.getDate().toString();
    day = day.length == 1 ? '0' + day : day;
    var month = (d.getMonth() + 1).toString()
    month = month.length == 1 ? '0' + month : month;
    var dateStr = day + '.' + month + '.' + d.getFullYear();
    console.log('dateStr: ', dateStr)
    this.setState({ dateStr: dateStr, show: false })
  }

  private onEstimate() {
    const { token } = store.state;
    var { estimate, appreciated } = this.state
    console.log('appreciated: ', appreciated)
    if (token) {//&& !appreciated
      this.setState({ estimate: !estimate })
    }
  }
  private onConfirmRating() {
    const { token } = store.state;
    var { estimate, confirmRating, appreciated } = this.state
    if (token) {//&& !appreciated
      this.setState({ estimate: !estimate, confirmRating: !confirmRating })
      this.sendRating();
    }
  }
  private ratingCompleted(newRating: number) {
    // var { myRef, confirmRating } = this.state
    // myRef.current.toggleTooltip();
    this.setState({ newRating, confirmRating: true })
  }

  private onSubmit() {
    var { date, confirmAppointment, timeAppt, badEnter, errorText } = this.state
    var $this = this;
    var obj, url, log: string;

    if (!date) {
      badEnter.date = true;
      errorText.date = 'Дата не выбрана!'
      this.setState({ badEnter, errorText });
    }
    if (!confirmAppointment) {
      badEnter.time = true;
      errorText.time = 'Время не выбрано'
      this.setState({ badEnter, errorText, });
    }
    if (!date || !timeAppt) {
      Alert.alert('Внимание', 'Время не выбрано',
        [{ text: 'OK' }]
      );
      return;
    }
    if (badEnter.date) {
      Alert.alert('Внимание', 'Выберите дату больше либо равную текущей.',
        [{ text: 'OK' }]);
      return;
    }
    console.log('date: ' + date + ', time: ' + timeAppt)
    console.log('badEnter.date: ' + badEnter.date + ' badEnter.time: ' + badEnter.time)
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), (timeAppt.getHours() - 1), timeAppt.getMinutes(), 0, 0)
    console.log('dateTime: ' + date)
    const doctor: Doctor = this.props.navigation.state.params
    const { userLogin, patient, token } = store.state;
    obj = {
      Fk_Doctor: doctor.id,
      Fk_Patient: patient.id,
      DateTime: date
    }
    url = serverUrl + 'doctor/save/appointment';
    log = 'Запись к врачу'

    this.setState({ submit: true, disBtn: true })
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(obj), //JSON.stringify(
    })
      .then(function (response) {
        if (response.status == 200 || response.status == 201) {
          console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
          console.log(response);
          Alert.alert('Внимание', 'Вы успешно записались на прием! Ваш прием у врача ' +
            doctor.speciality.nameSpeciality + ' состоится ' + $this.toDate(date) + ', в ' +
            date.getUTCHours() + ':' + date.getMinutes(),
            [{ text: 'OK' }]);
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
          console.log(data);
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
      data: InitialDoctor, load: true, loadError: false, refreshing: false,
      rating: 0, newRating: 0, estimate: false, myRef: React.createRef(),
      confirmRating: false, numRated: 0, visibleModal: false, date: t, time: time.slice(), dateStr: '',
      show: false, disBtn: false, submit: false, confirmAppointment: false,
      badEnter: {
        date: false,
        time: false,
      },
      errorText: {
        date: '',
        time: '',
      },
      colorField: {
        date: color,
        time: color,
      },
      page: 0, pageOfTimes: [], loadTable: false
    })
  }
  private async sendRating() {
    this.setState({ load: false })
    var logAction = 'Отправить рейтинг';
    const { userLogin, patient, token } = store.state;
    var doctor: Doctor = this.props.navigation.state.params
    var { newRating, numRated, rating, appreciated } = this.state
    console.log('newRating: ' + newRating + ', numRated: ' + numRated + ', rating: ' + rating +
      ', appreciated: ' + appreciated);
    var totalSumRating, rout;
    if (appreciated) {
      totalSumRating = doctor.totalSumRating - appreciated.assessment
      totalSumRating = doctor.totalSumRating + newRating;
      rout = 'doctor/changeRating?id_Doctor='
    }
    else {
      totalSumRating = doctor.totalSumRating + newRating
      numRated += 1;
      rout = 'doctor/putARating?id_Doctor=';
    }
    rating = totalSumRating / numRated;
    var obj = {
      TotalSumRating: totalSumRating,
      NumRated: numRated,
      Rating: rating,
      Assessment: newRating,
      Id_User: userLogin.id,
      Id_Appreciated: appreciated ? appreciated.id : 0
    }
    console.log('totalSumRating: ' + totalSumRating + ', newRating: ' + newRating + ', numRated: ' + numRated + ', rating: ' + rating + ', Id_User: ' + userLogin.id);
    this.setState({ rating: rating, numRated: numRated })
    try {
      const response = await fetch(serverUrl + rout + doctor.id, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Accept': "application/json",
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(obj), //JSON.stringify()
      })
      const data = await response.json()
      if (response.status == 200) {
        console.log('Успех fetch ' + logAction)
        console.log('data: ' + data)
        this.setState({ appreciated: data.appreciated, rating: data.doctor.rating, load: true })
      }
      else if (response.status == 400) {
        console.log('Внимание', response.text);
        this.setState({ loadError: true, load: true })
      }
      else if (response.status == 404) {
        console.log('Внимание', 'Доктор не найден id=' + doctor.id);
        this.setState({ loadError: true, load: true })
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

}

const locStyles = StyleSheet.create({
  btnTableStyle: {
    backgroundColor: '#099',
    borderRadius: 7,
    width: w * 0.35,
    height: 40,
    alignSelf: 'center'
  },
  notSelectedBtnTableStyle: {
    borderRadius: 7,
    width: w * 0.35,
    height: 40,
    alignSelf: 'center'
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
  },
  notSelectedSectionTitle: {
    fontSize: 18,
    color: '#000',
  },
  sectionContainer1: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 15,
    marginHorizontal: w * 0.125,
    width: 90,
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
    color: '#888'
  },
  top: {
    marginTop: -65,
    backgroundColor: '#bbb',
    opacity: 0.8,
    paddingVertical: 5
  },
  label: {
    fontSize: 18,
    marginLeft: 15,
    marginBottom: 20,
    textAlign: 'center'
  },
  confirmStyle: {
    backgroundColor: '#f1c40f',
    width: w * 0.6,
    alignSelf: 'center',
    marginTop: 10
  }
})

export { DoctorProfileTwo }

