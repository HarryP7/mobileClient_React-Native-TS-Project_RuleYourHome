import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Header, globalStyles } from '..';
import { Card } from 'react-native-elements'
import { actions } from '../../store'
import { initialUser } from '../../interfaces'
import { NotAuthNAVIGATION } from '../../Navigations/routes'
import { backArrow } from '../../allSvg'
import { Background } from '../../constants';
import { Button } from 'react-native-paper';

class ExitScreen extends PureComponent<any> {

  render() {
    const { buttonContainer, buttonTitle, im, h2, positionCard } = globalStyles
    const { navigation } = this.props
    return (<View>
      <Header title={'Выход'}
        leftIcon={'arrow-left'}
        onPressLeft={() => {
          navigation.pop();
        }}
      />
      <View>{Background}</View>
      <View style={positionCard}>
        <Card containerStyle={{ paddingBottom: 20, borderRadius: 10 }} >
          <Image source={require('../../../icon/doorOut.png')}
            style={{ alignSelf: 'center' }} />
          <Text style={h2}>Вы хотите выйти из дома?</Text>
          <Button
            mode='contained'
            onPress={() => {
              actions.Login('', initialUser)
              navigation.navigate('NOTAuthNavigation')
            }}
            uppercase={false}
            style={buttonContainer}
            labelStyle={buttonTitle}>
              Выйти
            </Button>
        </Card>
      </View>
    </View>
    );
  }
}

export { ExitScreen };