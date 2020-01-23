import React, { PureComponent, useRef } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator,
  RefreshControl, Alert
} from 'react-native';
import { Header, globalStyles } from '..';
import { Role, Category } from '../../enum/Enums';
import { h, w, NoAvatar, serverUrl, IndicatorApp, ColorApp } from '../../constants'
import { store } from '../../store';
import { Doctor, InitialDoctor, User, HomeData, Appreciated } from '../../interfaces';
import { Rating, AirbnbRating, Badge, Divider, Card, Tooltip, } from 'react-native-elements';
import { AUTH, REGISTRATION } from '../../routes';
import { Button, Provider, Portal, Modal, TextInput, DataTable } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

interface errorBool {
  date: boolean,
  time: boolean
}
interface errorTxt {
  date: string,
  time: string
}
interface Props { }
interface State {
  data: Doctor,
  load: boolean,
  appreciated: Appreciated,
  loadError: boolean,
  refreshing: boolean,
  rating: number,
  newRating: number,
  estimate: boolean //оценить
  myRef: any,
  confirm: boolean,
  numRated: number,
  visibleModal: boolean,
  date: Date,
  time: Date[],
  dateStr: string,
  show: boolean,
  disBtn: boolean,
  submit: boolean,
  badEnter: errorBool,
  errorText: errorTxt,
  colorField: errorTxt,
  page: number,
  pageOfItems: Date[],
  pageSize: number
}
const ratingArr = ['Ужасный', 'Плохой', 'Нормальный', 'Хороший', 'Отличный']
var color = '#8b00ff'
var t: Date = new Date(0, 0, 0, 8, 45, 0, 0);
var time: Date[] = [];
for (var i = 0; i < 28; i++) {
  time.push(t);
  t = new Date(t.setMinutes(t.getMinutes() + 15));
}
var pageOfItems: Date[] = [];
for (var i = 0; i < 7; i++) {
  pageOfItems.push(time[i]);
}

class DoctorProfile extends PureComponent<any, State, Props> {
  state = {
    data: InitialDoctor, load: true, loadError: false, refreshing: false,
    appreciated: {}, rating: 0, newRating: 0, estimate: false, myRef: React.createRef(),
    confirm: false, numRated: 0, visibleModal: false, date: new Date(), time, dateStr: '',
    show: false, disBtn: false, submit: false,
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
    page: 0, pageOfItems, pageSize: 7
  } as unknown as State

  componentDidMount = async () => {
    const { userLogin, data, token } = store.state;
    console.log('token: ', token)
    console.log(' props.params: ', this.props.navigation.state.params)
    const doctor: Doctor = this.props.navigation.state.params
    this.setState({ rating: doctor.rating, loadError: false })
    var logAction = 'Профиль врача';
    try {
      if (token) {
        const response = await fetch(serverUrl + 'doctor?id_Doctor=' + doctor.id + '&id_User=' + userLogin.id)
        const data = await response.json()
        if (response.status == 200) {
          this.setState({
            appreciated: data.appreciated, rating: data.doctor.rating,
            numRated: data.doctor.numRated, load: true
          })
          console.log('Успех fetch ' + logAction, data)
        }
        else if (response.status == 404) {
          console.log('Внимание', 'Доктор не найден id=' + doctor.id);
          this.setState({ loadError: true, load: true })
        }
      }
    } catch (error) {
      console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
      if (error == 'TypeError: Network request failed') {
        Alert.alert('Внимание', 'Сервер не доступен: ' + error, [{ text: 'OK' }]);

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
    const { data, load, loadError, appreciated, refreshing, rating, estimate, myRef, confirm, numRated } = this.state
    const { images, h1, sub, link, indicator, mrgTop, buttonWG, buttonTitle,
      buttonContainerSp, buttonContenSp, cardStyle, } = globalStyles
    const { h2, h3, top, label, confirmStyle } = locStyles
    return (<View>
      <Header title='Профиль врача'
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
            {!estimate ? <View style={mrgTop}>
              <View style={[sub, { marginLeft: w * 0.25 }]}>
                <Rating
                  ratingCount={5}
                  showRating
                  readonly={token ? false : true}
                  onFinishRating={this.onEstimate.bind(this)}
                  fractions={1}
                  startingValue={rating}
                />
                {token ? <Text style={[label, { marginTop: 70 }]}>({numRated})</Text> : <Text></Text>}
              </View>
            </View>
              :
              <View>
                <AirbnbRating
                  reviews={ratingArr}
                  defaultRating={0}
                  onFinishRating={this.ratingCompleted.bind(this)}
                />
                <Button
                  mode='outlined'
                  uppercase={false}
                  onPress={this.onConfirmRating.bind(this)}
                  labelStyle={buttonTitle}
                  style={confirmStyle}
                  disabled={!confirm}
                >
                  Подтвердить
                </Button>
              </View>
            }
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
            <Button
              mode="contained"
              uppercase={false}
              onPress={this._showModal.bind(this)}
              style={[buttonContainerSp, mrgTop, buttonWG]}
              labelStyle={buttonTitle}>
              Записаться на прием
            </Button>
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

  private onModal() {

    var { visibleModal, show, date, dateStr, disBtn, submit, badEnter, colorField, errorText, page,
      pageOfItems, pageSize } = this.state
    const { cardStyle, inputStyle, buttonContainerSp, mrgTop, buttonWG, textInputPaper, inputPaper,
      fixToText, buttonTitle, h1, buttonWM, error, label } = globalStyles
    const { dataTableStyle } = locStyles
    var totalPages = Math.ceil(time.length / pageSize)
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
                    onFocus={this.datepicker.bind(this)}
                    onKeyPress={this.datepicker.bind(this)}
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
              <DataTable>

                {pageOfItems.map((el, id: number) => {
                  return (
                    el && <DataTable.Row>
                      <DataTable.Cell> </DataTable.Cell>
                      <DataTable.Cell> </DataTable.Cell>
                      <DataTable.Cell onPress={this.onSubmit.bind(this, el)} style={dataTableStyle}>
                        {el && this.toTime(el)}
                      </DataTable.Cell>
                      <DataTable.Cell> </DataTable.Cell>
                      <DataTable.Cell> </DataTable.Cell>
                    </DataTable.Row>)
                })
                }
                <DataTable.Pagination
                  page={page}
                  numberOfPages={totalPages}
                  onPageChange={(page) => this.paginate(page)}
                  label={'1-' + totalPages + ' of ' + (page + 1)}
                />
              </DataTable>
            </Card>
          </Modal>
        </Portal >
      </Provider >
    )
  }

  private paginate(page: number) {
    const { time, pageOfItems, pageSize } = this.state
    if (page < time.length / pageSize) {
      var stInd = page * pageSize;
      for (var i = 0, n = stInd; n < stInd + pageSize; i++ , n++) {
        pageOfItems[i] = time[n]
      }
      this.setState({ pageOfItems, page })
    }
  }

  onChangePage(pageOfItems: Date[]) {
    this.setState({ pageOfItems: pageOfItems });
  }

  _showModal = () => this.setState({ visibleModal: true });
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
    var hours = date.getHours().toString();
    hours = +hours < 0 ? (+hours + 24).toString() : hours;
    hours = hours.length === 1 ? '0' + hours : hours;
    var minutes = date.getMinutes().toString();
    minutes = minutes.length === 1 ? '0' + minutes : minutes;
    return hours + ':' + minutes;
  }

  private onChangeDate(date: any) {
    var { badEnter, errorText } = this.state
    var dn = new Date()
    var d = new Date(date.nativeEvent.timestamp);
    console.log('date now: ', dn)
    if (d < dn) {
      badEnter.date = true;
      errorText.date = 'Дата не может быть меньше текущей!'
    }
    else {
      badEnter.date = false;
    }
    console.log('date: ', date)
    console.log('date: ', d)
    var day = d.getDate().toString();
    var hours = (d.getHours() - 3).toString();
    console.log('day: ' + day + ', hours: ' + hours)
    //day = +hours < 0 ? (+day - 1).toString() : day;
    day = day.length == 1 ? '0' + day : day;
    var month = (d.getMonth() + 1).toString()
    month = month.length == 1 ? '0' + month : month;
    var dateStr = day + '.' + month + '.' + d.getFullYear();
    console.log('dateStr: ', dateStr)
    this.setState({ dateStr: dateStr, show: false, badEnter, errorText })
  }

  private onEstimate() {
    const { token } = store.state;
    var { estimate, appreciated } = this.state
    console.log('appreciated: ', appreciated)
    if (token && !appreciated) {
      this.setState({ estimate: !estimate })
    }
  }
  private onConfirmRating() {
    const { token } = store.state;
    var { estimate, confirm, appreciated } = this.state
    if (token && !appreciated) {
      this.setState({ estimate: !estimate, confirm: !confirm })
      this.sendRating();
    }
  }
  private ratingCompleted(newRating: number) {
    // var { myRef, confirm } = this.state
    // myRef.current.toggleTooltip();
    this.setState({ newRating, confirm: true })
  }

  private onSubmit(time: Date) {
    const { date } = this.state
    var $this = this;
    var obj, url, log: string;

    // if (!email) {
    //   badEnter.email = true;
    //   errorText.email = 'Поле не заполнено!'
    //   colorField.email = 'red'
    //   this.setState({ badEnter, errorText, colorField, good: false });
    // }
    // if (!password) {
    //   badEnter.password = true;
    //   errorText.password = 'Поле не заполнено!'
    //   colorField.password = 'red'
    //   this.setState({ badEnter, errorText, colorField, good: false });
    // }
    // // if (password.trim().length < 8) {
    // //   badEnter.password = true;
    // //   errorText.password = 'Пароль должен иметь длину не менее 8 знаков!'
    // //   colorField.password = 'red'
    // //   this.setState({ badEnter, errorText, colorField, good: false });
    // // }

    // if (!email || !password) {
    //   Alert.alert('Внимание', 'Поля не заполнены!',
    //     [{ text: 'OK' }],
    //     { cancelable: false },
    //   );
    //   return;
    // }
    // else if (badEnter.email || badEnter.password) {
    //   this.setState({ good: false });
    //   Alert.alert('Внимание', 'Заполните поля правильно!',
    //     [{ text: 'OK' }]);
    //   return;
    // }
    // else
    //   this.setState({ good: true });

    // console.log('email: ' + email)
    // console.log('badEnter.email: ' + badEnter.email + ' badEnter.password: ' + badEnter.password)
    // console.log('good', good)
    // obj = {
    //   Email: email,
    //   Password: password,
    // }
    // url = serverUrl + 'auth/signin';
    // log = 'Входа'

    // this.setState({ submit: true, disBtn: true })
    // fetch(url, {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //   headers: {
    //     'Accept': "application/json",
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(obj), //JSON.stringify(
    // })
    //   .then(function (response) {
    //     if (response.status == 200 || response.status == 201) {
    //       console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
    //       console.log(response);
    //       $this.setClearState();
    //       return response.json();
    //     }
    //     if (response.status == 500) {
    //       console.log('Server Error', "Status: " + response.status + ' ' + response)
    //       Alert.alert('Внимание', 'Ошибка сервера! Status: ' + response.status + ' ' + response,
    //         [{ text: 'OK' }]);
    //     }
    //     if (response.status == 400) {
    //       console.log('Bad Request', "Status: " + response.status + ' ' + response)
    //       Alert.alert('Внимание', 'Логин или пароль не верны!',
    //         [{ text: 'OK' }]);
    //     }
    //     else {
    //       console.log(response.statusText, "Status: " + response.status + ' ' + response)
    //       Alert.alert('Внимание', response.statusText + " Status: " + response.status + ' ' + response,
    //         [{ text: 'OK' }]);
    //     }
    //     $this.setState({ submit: false, disBtn: false });
    //     return
    //   })
    //   .then(function (data: AuthData) {
    //     if (data) {
    //       if (!store.state.token) {
    //         actions.Login(data.token, data.patient, data.userLogin)
    //       }
    //       if (data.userLogin.enum_Role == Role.admin) {
    //         navigation.navigate(NAVIGATIONAdmin);
    //       }
    //       else if (data.userLogin.enum_Role == Role.user) {
    //         navigation.navigate(NAVIGATIONUser);
    //       }
    //     }
    //   })
    //   .catch(error => {
    //     console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
    //     if (error == 'TypeError: Network request failed') {
    //       Alert.alert('Внимание', 'Сервер не доступен: ' + error, [{ text: 'OK' }]);
    //     }
    //     else {
    //       Alert.alert('Внимание', 'Ошибка входа: ' + error, [{ text: 'OK' }]);
    //     }
    //     $this.setState({ submit: false, disBtn: false })
    //     return
    //   });
  }

  private async onRefresh() {
    this.setClearState();
    this.componentDidMount();
  }
  private setClearState() {
    this.setState({ data: InitialDoctor, load: false, refreshing: false, loadError: false })
  }
  private async sendRating() {
    this.setState({ load: false })
    var logAction = 'Отправить рейтинг';
    const { userLogin, data, token } = store.state;
    var doctor: Doctor = this.props.navigation.state.params
    var { newRating, numRated, rating } = this.state
    console.log('newRating: ' + newRating + ', numRated: ' + numRated + ', rating: ' + rating);
    var totalSumRating = doctor.totalSumRating + newRating
    numRated += 1;
    rating = totalSumRating / numRated;
    var obj = {
      TotalSumRating: totalSumRating,
      NumRated: numRated,
      Rating: rating,
      Assessment: newRating,
      Id_User: userLogin.id
    }
    console.log('totalSumRating: ' + totalSumRating + ', newRating: ' + newRating + ', numRated: ' + numRated + ', rating: ' + rating + ', Id_User: ' + userLogin.id);
    this.setState({ rating: rating, numRated: numRated })
    try {
      const response = await fetch(serverUrl + 'doctor?id_Doctor=' + doctor.id, {
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
        Alert.alert('Внимание', 'Сервер не доступен: ' + error, [{ text: 'OK' }]);

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
  dataTableStyle: {
    paddingHorizontal: w * 0.15,
    backgroundColor: '#099',
    borderRadius: 7,
    paddingVertical: 10,
    alignSelf: 'center'
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
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

export { DoctorProfile }

