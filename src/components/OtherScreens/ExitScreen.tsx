import React, { PureComponent } from 'react';
import {
  View, Text, TouchableOpacity,  Image
} from 'react-native';
import { Header, globalStyles } from '..';
import { Card } from 'react-native-elements'
import { actions } from '../../store'
import { initialUser } from '../../interfaces'
import { menu } from '../../allSvg';
import { NotAuthNAVIGATION } from '../../routes'
import { backArrow } from '../../allSvg'
import { BackgroundImage, Background } from '../../constants';

class ExitScreen extends PureComponent<any> {

  render() {
    const {  buttonContainer, buttonTitle, im, h2, positionCard } = globalStyles
    const { navigation } = this.props
    return ( <View>
      <Header title={'Выход'}
        leftIcon={'arrow-left'}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
        <View>{Background}</View>
      <View style={positionCard}>
        <Card containerStyle={{ paddingBottom: 20, borderRadius: 10 }} >
          <Image source={require('../../../icon/doorOut.png')}
            style={{ alignSelf: 'center' }} />
          <Text style={h2}>Вы хотите выйти из дома?</Text>
            <TouchableOpacity
              onPress={() => {
                actions.Login('',initialUser)
                navigation.navigate(NotAuthNAVIGATION)}}>
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