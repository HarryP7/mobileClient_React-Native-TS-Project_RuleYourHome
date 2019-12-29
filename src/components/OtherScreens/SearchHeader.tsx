
import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, TextInput
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { h, w, brown } from '../../constants'
import { SearchBar } from 'react-native-elements'


const SearchHeader = ({ onPressRight, rightIcon, onChangeText, value, onBlur }: any) => {
  const { container, sub, iconRightStyle, input, containerInput } = styles
  return (
    <View style={container}>
      <View style={sub}>
        <SearchBar
          containerStyle={container}
          inputContainerStyle={containerInput}
          inputStyle={input}
          onChangeText={onChangeText}
          placeholder='Поиск..'
          value={value}
          onBlur={onBlur}
        />
        <TouchableOpacity onPress={onPressRight} >
          <SvgXml xml={rightIcon}
            style={iconRightStyle} fill='#fff' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#92582D',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: brown
    // ...ifIphoneX(
    //   {height: 122},
    //   {height: 90}
    // })
  },
  containerBtn: {
    //backgroundColor: 'gold',
    padding: 15,
    borderRadius: 35,
  },
  iconLeftStyle: {
    width: 20,
    height: 20,
  },
  iconRightStyle: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  sub: {
    alignItems: 'center',
    flexDirection: 'row',

  },
  input: {
    color: '#000',
    //paddingHorizontal: 10,
  },
  containerInput:{    
    height: 40,
    width: w * 0.80,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: brown
  }
})

export { SearchHeader }
