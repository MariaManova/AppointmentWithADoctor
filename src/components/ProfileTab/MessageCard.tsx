import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { h, w, NoFoto, NoAvatar, ColorApp, IndicatorApp } from '../../constants'
import { Divider, Icon } from 'react-native-elements'
import { globalStyles } from '../globalStyles'

const MessageCard = ({ data, onPress, loadError }: any) => {
    const {indicator} =globalStyles
  
    const { container, images, h1, containerText, iconStyle } = styles
    const { myGroups, address, phone, fk_Gender, user, text, uid , createdAt} = data
    return (<View>
        {loadError && 
        <ActivityIndicator style={indicator} size={50} color={IndicatorApp} />}
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
               
                <Text style={h1}>{text}</Text> 
                <Text>          {createdAt.toString().substring(11,16)}</Text>
            
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
export { MessageCard }