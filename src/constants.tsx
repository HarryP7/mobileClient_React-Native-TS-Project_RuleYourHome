import * as React from 'react';
import { Dimensions, Image, View, StyleSheet } from 'react-native'

const win = Dimensions.get('window')
export const h = win.height;
export const w = win.width;
export const appColor = '#009999'//'#92582D'
export const disColor = '#999'
export const BackgroundColor = 'lightsteelblue'
export const NoFoto = "https://i.ibb.co/FDqTS75/default-Home.png"
export const NoAvatar = "https://i.ibb.co/jL1RZKp/noAvatar.png"
export const serverUrl = 'http://192.168.43.80:5000/api/'
export const ApiKeyImage = '5e51bf9a518e70502062b1b4a9339b70'
//export const BackgroundImage = require('../image/brick_texture1.jpg')
export const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
    'сентября', 'октября', 'ноября', 'декабря']

const styles = StyleSheet.create({
    im: {
        position: 'absolute',
        height: h+30,
        width: w
    }
});

const { im } = styles
export const Background = <View style={[im, { backgroundColor: BackgroundColor }]}></View> //<Image source={BackgroundImage} style={im}></Image>
export const BackgroundWhite = <View style={[im, { backgroundColor: 'white' }]}></View> //<Image source={BackgroundImage} style={im}></Image>

