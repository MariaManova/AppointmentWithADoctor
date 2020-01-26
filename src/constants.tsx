import * as React from 'react';
import { Dimensions, Image, View, StyleSheet } from 'react-native'

const win = Dimensions.get('window')
export const h = win.height;
export const w = win.width;
export const ColorApp = '#009'
export const IndicatorApp = '#009'
export const colorError='#a00'
export const BackgroundColor = 'lightsteelblue'
export const NoFoto = "https://i.ibb.co/wNtDpNt/NoFoto.png"
export const NoAvatar = "https://i.ibb.co/jL1RZKp/noAvatar.png"
export const keyPictures = "5e51bf9a518e70502062b1b4a9339b70"
export const serverUrl = 'http://192.168.43.224:5000/api/'
export const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
    'сентября', 'октября', 'ноября', 'декабря']

const styles = StyleSheet.create({
    im: {
        position: 'absolute',
        height: h,
        width: w
    }
});

const { im } = styles
export const Background = <View style={[im, { backgroundColor: BackgroundColor }]}></View> 
