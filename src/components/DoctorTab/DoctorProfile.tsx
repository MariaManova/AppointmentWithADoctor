import React, { PureComponent } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Button, RefreshControl, Alert
} from 'react-native';
import { Header, globalStyles } from '..';
import { Role, Category } from '../../enum/Enums';
import { h, w, NoAvatar } from '../../constants'
import { store } from '../../store';
import { Doctor, InitialDoctor, User, HomeData } from '../../interfaces';
import { Rating, AirbnbRating, Badge, Divider } from 'react-native-elements';


interface Props { }
interface State {
  data: Doctor,
  load: boolean,
  approvedTentants: User[],
  newTenants: User[],
  loadError: boolean,
  refreshing: boolean,
  rating: number
}
const ratingArr = ['Ужасный', 'Плохой', 'Нормальный', 'Хороший', 'Отличный']

class DoctorProfile extends PureComponent<any, State, Props> {

  state = {
    data: InitialDoctor, load: false, loadError: false, refreshing: false,
    rating: 4.2
  } as State

  componentDidMount = async () => {
    this.setState({ loadError: false })
    // var logAction = 'Профиль дома';
    // console.log('props: ', this.props)
    // console.log(' props.params: ', this.props.navigation.state.params)
    // try {
    //   const { userLogin, token } = store.state;
    //   var doctor: Doctor = this.props.navigation.state.params
    //   if (token && (userLogin.enum_Role != Role.user || userLogin.id == doctor.id)) {
    //     const response = await fetch(serverUrl + 'doctor/' + doctor.id,
    //       { headers: { 'Authorization': `Bearer ${token}` } })
    //     const data: HomeData = await response.json()
    //     if (response.status == 200) {
    //       this.setState({
    //         data: data.homeData, approvedTentants: data.tantains,
    //         newTenants: data.newTantains, load: true
    //       })
    //       console.log('Успех fetch ' + logAction, data)
    //     }
    //     else if (response.status == 404) {
    //       console.log('Внимание', 'Доктор не найден id=' + doctor.id);
    //       this.setState({ loadError: true })
    //     }
    //   }
    // } catch (error) {
    //   console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
    //   if (error == 'TypeError: Network request failed') {
    //     Alert.alert('Внимание', 'Сервер не доступен: ' + error, [{ text: 'OK' }]);

    //     this.setState({ loadError: true })
    //   }
    //   else if (error.status == 404) {
    //     console.log('Внимание', 'Дом не найден: ' + error, [{ text: 'OK' }]);
    //   }
    //   else {
    //     Alert.alert('Внимание', 'Ошибка сервера: ' + error, [{ text: 'OK' }]);
    //   }
    //   this.setState({ loadError: true })
    //   return
    // }
  }
  render() {
    const { userLogin, token } = store.state;
    const { navigation } = this.props
    var propsData = this.props.navigation.state.params
    const { id, photo, user, speciality, enum_Category, placeOfWork } = propsData
    const { data, load, approvedTentants, newTenants, refreshing, rating } = this.state
    //const { localGroups } = data
    const { images, h1, sub, link, indicator, mrgTop } = globalStyles
    const { status, h2, h3, sectionContainer, sectionTitle, sectionContainer1, sectionTitle1,
      homeStatusGood, homeStatusBad, top } = locStyles
    const backArrow = 'arrow-back'
    return (<View>
      <Header title='Профиль врача'
        leftIcon={backArrow}
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
          {/* {token ? (
            load ? (<View> */}
          <View style={mrgTop}>
            <Text style={h3}>Поставить оценку:</Text>

            <AirbnbRating
              showRating
              reviews={ratingArr}
              defaultRating={0}
            />

<View style={[sub,{marginLeft: w*0.2}]}>
            <Rating
              ratingCount={5}
              showRating
              readonly={false}
              onFinishRating={this.ratingCompleted.bind(this)}
              fractions={1} 
              startingValue={rating}
            />
            <Text style={[h1,{ marginTop: 50}]}>(150)</Text>
            </View>
          </View>

          {/* </View>
            ) : <ActivityIndicator style={[indicator, { marginTop: h / 2 }]} size={50} color={IndicatorApp} />
          ) : <View></View>
          }          */}

          <Text style={h3}>Категория:
          <Text style={{ color: 'black' }}> {enum_Category == 1 ? Category.first : enum_Category == 2 ?
              Category.second : Category.higher}</Text> </Text>
          <Text style={h3}>Основное место работы:
          <Text style={{ color: 'black' }}> {placeOfWork.namePlace}</Text> </Text>
          <View style={{ margin: 55 }}><Text> </Text></View>
        </ScrollView>
      </View>
    </View>
    );
  }

  private ratingCompleted(rating: number) {
    this.setState({rating})
  }

  private async onRefresh() {
    this.setClearState();
    this.componentDidMount();
  }
  private setClearState() {
    this.setState({ data: InitialDoctor, load: false, refreshing: false, loadError: false })
  }
}

const locStyles = StyleSheet.create({
  status: {
    alignSelf: 'center',
    borderRadius: 6,
    color: '#fff',
    paddingVertical: 1,
    paddingHorizontal: 7,
    marginVertical: 10
  },
  homeStatusGood: {
    backgroundColor: '#13CE66'
  },
  homeStatusBad: {
    backgroundColor: '#ff3437'
  },
  sectionContainer: {
    backgroundColor: '#15a009',
    height: 50,
    borderRadius: 7,
    marginVertical: 10,
    marginHorizontal: w * 0.1,
    width: 110,
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
  }
})

export { DoctorProfile }

