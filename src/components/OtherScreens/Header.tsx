
import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import { SvgXml } from 'react-native-svg';


const Header = ({ title, onPressLeft, leftIcon, onPressRight, rightIcon }: any) => {
  const { container, containerBtn,titleStyle,positionRight, iconLeftStyle, iconRightStyle } = styles
  return (
          <View style={container}>
            {leftIcon && 
              <TouchableOpacity 
                onPress={onPressLeft} 
                style={containerBtn}>
                <SvgXml
                  xml={leftIcon}
                  style={iconLeftStyle} fill='#fff' />
              </TouchableOpacity>
            }
            <Text style={titleStyle}>{title}</Text>
            {rightIcon && 
            <View style={positionRight}>
              <TouchableOpacity onPress={onPressRight}  
                style={containerBtn}>
                <SvgXml
                  xml={rightIcon}
                  style={iconRightStyle} fill='#fff' />
              </TouchableOpacity>
          </View>
            }
          </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#92582D',
    height: 60,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    // ...ifIphoneX(
    //   {height: 122},
    //   {height: 90}
    // })
  },
  containerBtn: {
    //backgroundColor: 'gold',
    padding:20,
    borderRadius: 35,
    marginLeft: 5,
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
  positionRight:{
    position: "absolute",
    right: -3
  },
  iconRightStyle: {    
    width: 25,
    height: 25, 
  }
})

export { Header }
