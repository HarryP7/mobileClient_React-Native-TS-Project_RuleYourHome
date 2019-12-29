import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Button
} from 'react-native';
import { Header, globalStyles } from '..';
import { backArrow } from '../../allSvg'
import { HomeStatus } from '../../enum/Enums';
import { h, w, brown } from '../../constants'


interface Props { }

class HomeProfile extends Component<any,  Props> {

  render() {
    const { navigation } = this.props
    const { imageUrl, city, street, homeN, appartaments, floors, porches, fk_Status,
      yearCommissioning, } = this.props.navigation.state.params
    const { images, h1 } = globalStyles
    const { status, h3, } = locStyles
    console.log('props: ', this.props)
    console.log(' state.params: ', this.props.navigation.state.params)
    return (<View>
      <Header title='Дом'
        leftIcon={backArrow}
        onPressLeft={() => navigation.goBack()} />

      <View>
        <ScrollView>
          <Image source={{ uri: imageUrl.url }} style={images} />
          <Text style={h1}>г. {city}, ул. {street}, д. {homeN}</Text>
          <Text style={status}>{fk_Status == 1 ? HomeStatus.Exploited : HomeStatus.Emergency}</Text>
          <Text style={h3}>Кол-во квартир: {appartaments} </Text>
          <Text style={h3}>Кол-во этажей: {floors} </Text>
          <Text style={h3}>Кол-во подъездов: {porches} </Text>
          <Text style={h3}>Год ввода в эксплуатацию: {yearCommissioning} </Text>
          <View style={{ margin: 55 }}><Text> </Text></View>
        </ScrollView>
      </View>
    </View>
    );
  }
}

const locStyles = StyleSheet.create({
  status: {
    alignSelf: 'center',
    backgroundColor: '#13CE66',
    borderRadius: 6,
    color: '#fff',
    paddingVertical: 1,
    paddingHorizontal: 7,
    marginVertical: 10
  },
  container: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  sectionContainer: {
    backgroundColor: '#15a009',
    height: 50,
    borderRadius: 7,
    marginVertical: 10,
    marginHorizontal: w * 0.1,
    width: 110,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  },
  sectionContainer1: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 15,
    marginHorizontal: w * 0.125,
    width: 90,
  },
  sectionTitle1: {
    fontSize: 18,
    textAlign: 'center'
  },
  h2: {
    padding: 15,
    fontSize: 18,
    textAlign: 'center'
  },
  h3: {
    paddingLeft: 15,
    marginVertical: 5,
    fontSize: 18,
  },
})

export { HomeProfile }

