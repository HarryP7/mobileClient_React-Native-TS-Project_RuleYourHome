import React, { useEffect } from 'react';
import {
  StatusBar, View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  Alert
} from 'react-native';
import { Header, globalStyles } from '..';
import { backArrow } from '../../allSvg'
import { useGlobal, store, actions } from '../../store'
import { User, initialUser } from '../../interfaces'
import { h, w, ColorApp, serverUrl, BackgroundImage, Background } from '../../constants'
import { Gender } from '../../enum/Enums';
import { AddGROUP, AUTH, REGISTRATION, GroupLIST } from '../../routes';
import { Card } from 'react-native-elements'


interface State {
  data: User,
  load: boolean,
  refreshing: boolean,
  loadError: boolean
}

class ProfileScreen extends React.Component<any, State> {
  state = { data: initialUser, load: false, refreshing: false, loadError: false };

  componentDidMount = async () => {
    this.setState({ loadError: false })
    var logAction = 'Профиль пользователя';
    try {
      const { userLogin, token } = store.state;
      var uid = userLogin.uid;  
      var param = this.props.navigation.state.params 
      if(param) uid = param;
      if (token) {
        const response = await fetch(serverUrl + 'profile?Uid=' + uid,
          {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
        const data: User = await response.json()
        if (response.status == 200) {
          this.setState({ data, load: true })
          !param && actions.Login(token, data)
          console.log('Успех fetch ' + logAction, data)
        }
        else if (response.status == 404) {
          console.log('Внимание', 'Пользователь не найден uid=' + data.uid);
          this.setState({ loadError: true })
        }
      }
    } catch (error) {
      console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
      if (error == 'TypeError: Network request failed') {
        Alert.alert('Внимание', 'Сервер не доступен: ' + error, [{ text: 'OK' }]);

        this.setState({ loadError: true })
      }
      else if (error.status == 404) {
        console.log('Внимание', 'Пользователь не найден: ' + error, [{ text: 'OK' }]);
      }
      else {
        Alert.alert('Внимание', 'Ошибка сервера: ' + error, [{ text: 'OK' }]);
      }
      this.setState({ loadError: true })
      return
    }
  }

  render() {
    const { navigation } = this.props
    const { indicator, im, scrollView } = globalStyles
    var { data, load, refreshing, loadError } = this.state
    var { userLogin, token } = store.state;
    return (
      <View >
        <StatusBar backgroundColor={ColorApp} barStyle="light-content" />
        <Header title='Профиль'
          leftIcon={backArrow}
          onPressLeft={() => navigation.goBack()} />
          {token ? (
            load ? (
              this.ProfileData()
            ) : <View>
                {Background}
                {!loadError && <ActivityIndicator style={indicator} size={50} color={ColorApp} />}
              </View>
          ) : this.Login()
          }
      </View>
    )
  }

  private Login() {
    const { navigation } = this.props
    const { noImages, im, button2, buttonContainer, buttonTitle, link } = globalStyles
    return <View>
      {Background}
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
    const { images, noImages, h1, } = globalStyles
    const { sectionContainer1, sectionTitle1, h3 } = locStyles
    var { data, refreshing } = this.state
    var { myGroups, address, phone, fk_Gender, fullName, avatar, uid } = data
    return <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
        }
      >
        {avatar ?
          <Image source={{ uri: avatar.url }}
            style={images} /> :
          <Image source={require('../../../icon/user1.png')}
            style={noImages} />}

        <Text style={[h1, { textAlign: "center" }]}>{fullName} </Text>
        <TouchableOpacity onPress={() => myGroups.length && navigation.navigate(GroupLIST, uid)} >
          <View style={sectionContainer1}>
            <Text style={sectionTitle1}>Группы    {myGroups.length ? myGroups.length : 0}</Text>
          </View>
        </TouchableOpacity>
        <View style={{ margin: 10 }}></View>
        <Text style={h3}>Адрес:  {address} </Text>
        <Text style={h3}>Телефон:  {phone} </Text>
        <Text style={h3}>Пол:  {fk_Gender == 1 ? Gender.male : fk_Gender == 2 && Gender.female} </Text>
        <View style={{ margin: 55 }}><Text> </Text></View>
      </ScrollView>
  }
  private async onRefresh() {
    this.setClearState();
    this.componentDidMount();
  }
  private setClearState() {
    this.setState({ data: initialUser, load: false })
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