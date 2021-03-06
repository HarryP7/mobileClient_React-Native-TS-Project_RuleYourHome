
import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, StatusBar
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { appColor, w } from '../../constants';
import { Icon } from 'react-native-elements';
import { Appbar, Provider, Menu, IconButton } from 'react-native-paper';
import { menu, backArrow, search } from '../../allSvg';

const Header = ({ title, onPressLeft, leftIcon, onPressRight, rightIcon, bold, position }: any) => {
  const { container, containerBtn, titleStyle, positionRight, iconLeftStyle, iconRightStyle } = styles
  return (
    <View >
      <StatusBar backgroundColor={appColor} barStyle="light-content" />
      <Appbar.Header
        style={{ backgroundColor: appColor, display: 'flex' }}>
        {leftIcon ? (

          <TouchableOpacity
            onPress={onPressLeft}
            style={containerBtn}>
            {leftIcon == 'arrow-left' ?
                <SvgXml xml={backArrow} style={iconLeftStyle} fill='white' />
              : <SvgXml xml={menu} style={iconLeftStyle} fill='white' />
            }
          </TouchableOpacity>
        )
          : position != 'center' && <View style={{ width: w * 0.001 }}></View>}
        <Appbar.Content title={title} titleStyle={{ fontSize: 22, fontWeight: bold ? 'bold' : 'normal', textAlign: position }} />
        {rightIcon && (
          rightIcon == 'search' ?
            <TouchableOpacity
              onPress={onPressRight}
              style={containerBtn}>
              <SvgXml xml={search} style={iconLeftStyle} fill='white' />
            </TouchableOpacity>
            : rightIcon == 'menu' ?
              <TouchableOpacity
                onPress={onPressRight}
                style={containerBtn}>
                <SvgXml xml={menu} style={iconLeftStyle} fill='white' />
              </TouchableOpacity>
              : <Appbar.Action icon={rightIcon} onPress={onPressRight} color='white' />
        )}
        {position == 'center' && leftIcon && <View style={{ width: w * 0.15 }}></View>}
      </Appbar.Header>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerBtn: {
    //backgroundColor: 'gold',
    padding: 20,
    borderRadius: 35,
  },
  titleStyle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  iconLeftStyle: {
    width: 20,
    height: 20,
  },
  positionRight: {
    position: "absolute",
    right: -3
  },
  iconRightStyle: {
    width: 25,
    height: 25,
  }
})

export { Header }
