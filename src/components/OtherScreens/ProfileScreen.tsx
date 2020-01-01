import React, { useEffect } from 'react';
import {
  StatusBar, View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { Header, globalStyles } from '..';
import { backArrow } from '../../allSvg'
import { useGlobal, store } from '../../store'
import { User, initialUser } from '../../interfaces'
import { h, w, brown, serverUrl, BackgroundImage } from '../../constants'
import { Gender } from '../../enum/Enums';
import { AddGROUP, AUTH, REGISTRATION, GroupLIST } from '../../routes';
import { Card } from 'react-native-elements'


interface State {
  data: User,
  load: boolean
}

class ProfileScreen extends React.Component<any, State> {
  state = { data: initialUser, load: false };

  componentDidMount = async () => {
    try {
      const { userLogin, token } = store.state;
      var uid = userLogin.uid;
      if (token) {
        const response = await fetch(serverUrl+'profile?Uid=' + uid,
          {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
        if (response.status == 200) {
          const data = await response.json()
          this.setState({ data, load: true })
          console.log('Успех: ', data)
        }
        else {
          console.log('Ошибка: ', response)
          this.setState({ load: true })
        }
      }
    } catch (e) {
      throw e
    }
  }

  render() {
    const { navigation } = this.props
    const { noImages, indicator, im } = globalStyles
    var { data, load } = this.state
    var { userLogin, token } = store.state;
    return (
      <View >
        <StatusBar backgroundColor={brown} barStyle="light-content" />
        <Header title='Профиль'
          leftIcon={backArrow}
          onPressLeft={() => navigation.goBack()} />
        {token ?
          load ?
            this.ProfileData()
            : <View>
              <Image source={BackgroundImage} style={im}></Image>
              <ActivityIndicator style={indicator} size={50} color={brown} />
            </View>
          : this.Login()
        }
      </View>
    )
  }

  private Login() {
    const { navigation } = this.props
    const { noImages, im, button2, buttonContainer, buttonTitle, link } = globalStyles
    return <View>
      <Image source={BackgroundImage} style={im}></Image>
      <Card containerStyle={{ paddingBottom: 20, borderRadius: 10 }} >
        <Image source={require('../../../icon/user1.png')}
          style={noImages} />
        <View style={button2}>
        <TouchableOpacity
                onPress={() => navigation.navigate(AUTH)}>
                <View style={buttonContainer}>
                  <Text style={buttonTitle}>Войти</Text>
                </View>
              </TouchableOpacity>                              
              <TouchableOpacity
                onPress={() => navigation.navigate(REGISTRATION)}>                
                  <Text style={link}>Зарегистрироваться</Text>
              </TouchableOpacity>
        </View>
      </Card>
    </View>
  }

  private ProfileData() {
    const { navigation } = this.props
    const { images, noImages, h1, container, indicator, im } = globalStyles
    const { sectionContainer1, sectionTitle1, h3 } = locStyles
    var userLogin = store.state.userLogin;
    var { data, load } = this.state
    var { myGroups, address, phone, fk_Gender } = data
    return <ScrollView>
      <SafeAreaView>
        {data.avatar ?
          <Image source={{ uri: data.avatar.url }}
            style={images} /> :
          <Image source={require('../../../icon/user1.png')}
            style={noImages} />}

        <Text style={[h1, { textAlign: "center" }]}>{userLogin.fullName} </Text>
        <TouchableOpacity onPress={() => myGroups.length && navigation.navigate(GroupLIST, userLogin.uid)} >
          <View style={sectionContainer1}>
            <Text style={sectionTitle1}>Группы    {myGroups.length ? myGroups.length : 0}</Text>
          </View>
        </TouchableOpacity>
        <View style={{ margin: 10 }}></View>
        <Text style={h3}>Адрес:  {address} </Text>
        <Text style={h3}>Телефон:  {phone} </Text>
        <Text style={h3}>Пол:  {fk_Gender == 1 ? Gender.male : fk_Gender == 2 && Gender.female} </Text>
        <View style={{ margin: 55 }}><Text> </Text></View>
      </SafeAreaView>
    </ScrollView>

  }

}

const locStyles = StyleSheet.create({
  sectionContainer1: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 15,
    marginHorizontal: w * 0.125,
    width: 90,
    alignSelf: 'center'
  },
  sectionTitle1: {
    fontSize: 18,
    textAlign: 'center'
  },
  h3: {
    paddingLeft: 15,
    marginVertical: 5,
    fontSize: 18,
  },
})

export { ProfileScreen };