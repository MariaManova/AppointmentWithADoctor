import * as React from 'react';
import {
  View,Text, ScrollView, ActivityIndicator, Image, Alert, RefreshControl } from 'react-native';
import { Header, DoctorCard,  globalStyles } from '..';
import {  DOCTORProfile } from '../../routes';
import { ColorApp, serverUrl, Background } from '../../constants';
import { Doctor } from '../../interfaces'

interface State {
  data: Doctor[],
  dataOld: Doctor[],
  load: boolean,
  visibleSearch: boolean,
  text: string,
  refreshing: boolean,
  loadError: boolean
}

class ListDoctorsScreen extends React.PureComponent<any, State> {
  state = { data: [], dataOld: [], load: false, visibleSearch: false, 
    text: '', refreshing: false, loadError: false } as State
  
  componentDidMount = async () => {
    this.setState({loadError: false})
    var logAction = 'Doctors all';
    console.log('Rander Props: ',this.props)
    try {
      const response = await fetch(serverUrl+'doctor/all')
      if (response.status == 200) {
      const data = await response.json()
      this.setState({ data, dataOld: data, load: true })
      console.log('Успех fetch '+logAction, data)      
    }
    } catch (error) {
      console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
      if (error == 'TypeError: Network request failed') {
        Alert.alert('Внимание', 'Сервер не доступен: ' + error, [{ text: 'OK' }]);
        
      this.setState({ loadError: true })
      }
      else {
        Alert.alert('Внимание', 'Ошибка сервера: ' + error, [{ text: 'OK' }]);
      }
      this.setState({ loadError: true })
      return
    }
  }

  private async onRefresh() {
    this.setClearState();   
    this.componentDidMount();     
  }
  private setClearState() {
   this.setState({ data: [], dataOld: [], load: false, visibleSearch: false, text: '', refreshing: false})  
  }

  render() {
    const { data, load, visibleSearch, refreshing, loadError } = this.state
    const { background, container, indicator, im } = globalStyles
    const { navigation } = this.props
    const menu = 'menu'
    return (<View>
        <Header title='Врачи'
          rightIcon={menu}
          onPressRight={() => navigation.openDrawer()}
        />        
      <View>
      {Background}
      </View>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
      }
    >        
        {load ?
          <View>
            {data.map(item => {
              return <DoctorCard data={item} key={item.id}
                onPress={() => navigation.navigate(DOCTORProfile, (item))} />//
            })}
          </View> 
          :
          !loadError &&
          <ActivityIndicator style={indicator} size={50} color={ColorApp} />
        }
        <View style={{margin: 50}}><Text></Text></View>
      </ScrollView>
    </View>
    );
  }
}



export {ListDoctorsScreen} 