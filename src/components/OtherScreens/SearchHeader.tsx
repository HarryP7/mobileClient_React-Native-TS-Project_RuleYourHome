
import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, TextInput, StatusBar
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { h, w, appColor } from '../../constants'
import { SearchBar, Icon } from 'react-native-elements'
import { search, menu } from '../../allSvg';
import { Appbar } from 'react-native-paper';


const SearchHeader = ({ onPressLeft, leftIcon, onChangeText, value, rightIcon, onPressRight, subjectSearch }: any) => {
  const { container, containerSearch, sub, iconLeftStyle, input, containerInput, containerBtn, iconSearch } = styles
  var widthSearch = rightIcon ? w*0.8 : w*0.95
  return (
    <View style={container}>
      <StatusBar backgroundColor={appColor} barStyle="light-content" />
      <Appbar.Header
        style={{ backgroundColor: appColor }}>
        {leftIcon && (
          leftIcon == 'menu' ?
            <TouchableOpacity
              onPress={onPressLeft}
              style={containerBtn}>
              <SvgXml xml={menu} style={iconLeftStyle} fill='white' />
            </TouchableOpacity>
            :
              <Appbar.Action icon={leftIcon} style={iconLeftStyle} onPress={onPressLeft} color='white' />
        )
        }   
        {rightIcon &&     
        <View style={{margin: 5}}></View>}
        <SearchBar
          containerStyle={containerSearch}
          inputContainerStyle={[containerInput,{ width: widthSearch}]}
          inputStyle={input}
          onChangeText={onChangeText}
          placeholder={`Начните вводить ${subjectSearch}..`}
          value={value}
          searchIcon={<SvgXml xml={search} style={iconSearch} fill='grey' />}
        />
        {rightIcon &&
          <Appbar.Action icon={rightIcon} style={iconLeftStyle} onPress={onPressRight} color='white' />
        }
      </Appbar.Header>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor,
    height: 56,
    justifyContent: 'center',
    // alignItems: 'center',
    //borderColor: appColor
    // ...ifIphoneX(
    //   {height: 122},
    //   {height: 90}
    // })
  },
  containerSearch: {
    backgroundColor: appColor,
  },
  containerBtn: {
    // backgroundColor: 'gold',
    padding: 20,
    borderRadius: 35,
  },
  iconLeftStyle: {
    width: 20,
    height: 20,
  },
  iconSearch: {
    marginLeft: 5,
    width: 20,
    height: 20,
  },
  sub: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    color: '#000',
    paddingVertical: 0
    //paddingHorizontal: 10,
  },
  containerInput: {
    width: w * 0.80,
    backgroundColor: '#eee',
    borderRadius: 20,
    height: 42
  }
})

export { SearchHeader }
