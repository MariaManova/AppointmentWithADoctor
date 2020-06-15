import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { h, w, NoFoto, NoAvatar, ColorApp, IndicatorApp, months } from '../../constants'
import { Divider, Icon } from 'react-native-elements'
import { globalStyles } from '../globalStyles'

const DiagnosisCardTwo = ({ data, onPress }: any) => {
    const { indicator, sub } = globalStyles
    const { container, images, h1, dateStyle, iconStyle } = styles
    const { dateTimeReceipt, uid, diagnosis, recommendations, editedAt,user } = data
  
    return (
        <TouchableOpacity >
            <View style={container}>
               
                <View style={{ flexDirection: 'column' }}>
                     <Text style={h1}>Дата: {editedAt.toString().substring(0,10)} </Text>
                     <Text style={h1}>Время: {editedAt.toString().substring(11,16)}</Text>
                    <Text style={h1}>Диагноз:  </Text>
                    <Text style={h1}>{diagnosis}</Text>
                    <Text style={h1}>Лечение: </Text>
                    <Text style={h1}>{recommendations}</Text>
                   
                </View>

            </View>
            <Divider />
        </TouchableOpacity>
    )}

const toDate = (date: Date) => {
    var d = new Date(date);
    var day = d.getDate().toString();
    var hours = (d.getUTCHours()).toString();
    day = +hours < 0 ? (+day - 1).toString() : day;
    var month = (d.getMonth() + 1).toString()
    month = months[+month - 1];
    return day + ' ' + month + ' ' + d.getFullYear() + ' г.';
}
const toTime = (time: Date) => {
    var date = new Date(time);
    var hours = (date.getHours() - 3).toString();
    hours = +hours < 0 ? (+hours + 24).toString() : hours;
    hours = hours.length === 1 ? '0' + hours : hours;
    var minutes = date.getMinutes().toString();
    minutes = minutes.length === 1 ? '0' + minutes : minutes;
    return hours + ':' + minutes;
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        padding: 5,
        flexDirection: 'row',
        backgroundColor: '#e7e4f5',
        alignItems: 'center'
    },
    containerText: {
        flexDirection: 'column'
    },
    h1: {
        justifyContent: 'center',
        marginLeft: 10,
        fontSize: 18,
        width: w * 0.67,
    },
    dateStyle: {
        marginLeft: 10
    },
    iconStyle: {
        alignItems: 'flex-end'
    },
    images: {
        marginHorizontal: 10,
        marginVertical: 5,
        width: 50,
        height: 50,
        borderRadius: 30
    },

})
export { DiagnosisCardTwo }