import * as React from 'react';
import {
  View, Text, TouchableHighlight, Image,
} from 'react-native';
import { Header, globalStyles } from '..';
import { menu } from '../../allSvg'

interface Props { }

class NotificationScreen extends React.Component<any, Props> {

  render() {
    const { navigation } = this.props
    const { im, label2 } = globalStyles
    return (<View>
      <Header title='Уведомления'
        leftIcon={menu}
        onPressLeft={() => {
          navigation.openDrawer()
        }} icon={menu} />
      <View>
        <Image source={require('../../../image/brick_texture1.jpg')} style={im}></Image>
      </View >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        {/* <Text style={label2}>Нет уведомлений</Text> */}
      </View>
    </View >
    );
  }
}

export { NotificationScreen };