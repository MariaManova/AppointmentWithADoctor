import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { h, w, NoFoto, NoAvatar, ColorApp, IndicatorApp } from '../../constants'
import { Divider, Icon } from 'react-native-elements'
import { globalStyles } from '../globalStyles'

const DoctorCard = ({ data, onPress, loadError }: any) => {
    const {indicator} =globalStyles
    const { container, images, h1, containerText, iconStyle } = styles
    const { myGroups, address, phone, fk_Gender, speciality, photo, uid } = data
    return (<View>
        {loadError &&
        <ActivityIndicator style={indicator} size={50} color={IndicatorApp} />}
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                <Image source={photo ? { uri: photo.url } : require('../../../icon/noAvatar.png')}
                    style={images} />
                <Text style={h1}>{speciality.nameSpeciality}</Text>
            <Icon name='chevron-right' style={iconStyle}/>
            </View>
        </TouchableOpacity>
        <Divider />
    </View>
    )
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
export { DoctorCard }