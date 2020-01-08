import {Dimensions} from 'react-native'

const win = Dimensions.get('window')
export const h = win.height;
export const w = win.width;
export const ColorApp = '#92582D'
export const NoFoto = "https://i.ibb.co/wNtDpNt/NoFoto.png"
export const NoAvatar = "https://docplus.kg/img/noavatar.png"
export const serverUrl = 'http://192.168.43.80:5000/api/' 
export const BackgroundImage = require('../image/brick_texture1.jpg')
export const months = [
    'января','февраля','марта','апреля','мая','июня','июля','августа',
    'сентября','октября','ноября','декабря']