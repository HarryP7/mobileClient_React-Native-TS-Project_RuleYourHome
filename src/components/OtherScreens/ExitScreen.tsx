import React, { PureComponent } from 'react';
import {
  View, Text, TouchableOpacity,  Image
} from 'react-native';
import { Header, globalStyles } from '..';
import { Card } from 'react-native-elements'
import { actions } from '../../store'
import { initialUser } from '../../interfaces'
import SplashScreen from './SplashScreen';
import { menu } from '../../allSvg';

class ExitScreen extends PureComponent<any> {

  render() {
    const { indicator, button2, buttonContainer, buttonTitle, im, h2 } = globalStyles
    const { navigation } = this.props
    return ( <View>
      <Header title='Дом'
        leftIcon={menu}
        onPressLeft={() => {
          navigation.openDrawer()
        }} />
        <View>
      <Image source={require('../../../image/brick_texture1.jpg')} style={im}></Image>
      </View>
      <View style={indicator}>
        <Card containerStyle={{ paddingBottom: 20, borderRadius: 10 }} >
          <Image source={require('../../../icon/warning-shield.png')}
            style={{ alignSelf: 'center' }} />
          <Text style={h2}>Вы хотите выйти из дома?</Text>
            <TouchableOpacity
              onPress={() => {
                actions.Login('',initialUser)
                navigation.navigate(SplashScreen)}}>
              <View style={buttonContainer}>
                <Text style={buttonTitle}>Выйти</Text>
              </View>
            </TouchableOpacity>
        </Card>
      </View>
    </View>
    );
  }
}  

export { ExitScreen };