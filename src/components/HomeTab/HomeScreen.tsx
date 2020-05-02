import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView,
  ActivityIndicator, RefreshControl, Alert,
} from 'react-native';
import { Header, globalStyles } from '..';
import { menu } from '../../allSvg'
import { HomeStatus, Role } from '../../enum/Enums';
import { h, w, appColor, NoFoto, serverUrl, Background } from '../../constants'
import { AddGROUP, AUTH, REGISTRATION, GroupLIST, ADDRESSScreen, TENTENScreen, PROFILE } from '../../Navigations/routes';
import { Home, User, InitialHome, HomeData } from '../../interfaces'
import { useGlobal, store, actions } from '../../store'
import { Card, Badge, Divider } from 'react-native-elements'

interface State {
  data: Home,
  load: boolean,
  refreshing: boolean,
  loadError: boolean,
  approvedTentants: User[],
  newTenants: User[],
  reload: boolean
}

interface Props { }

class HomeScreen extends Component<any, State, Props> {
  state = {
    data: InitialHome, load: false, refreshing: false, loadError: false,
    approvedTentants: [], newTenants: [], reload: false
  } as State

  componentDidMount = async () => {
    this.setState({ loadError: false })
    var logAction = 'Профиль дома';
    try {
      const { userLogin, token } = store.state;
      var Fk_Home = userLogin.fk_Home;
      console.log('token: ', token)
      console.log('userLogin: ', userLogin)
      if ((token && userLogin.fk_Home && userLogin.isApprovedHome) ||
        (token && userLogin.fk_Home)) {
        const response = await fetch(serverUrl + 'home?Fk_Home=' + Fk_Home,
          {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
        const data: HomeData = await response.json()
        if (response.status == 200) {
          this.setState({
            data: data.homeData, approvedTentants: data.tantains,
            newTenants: data.newTantains, load: true
          })
          console.log('Успех fetch ' + logAction, data)
        }
        else if (response.status == 404) {
          console.log('Внимание', 'Дом не найден uid=' + Fk_Home);
          this.setState({ loadError: true })
        }
      }
    } catch (error) {
      console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
      if (error == 'TypeError: Network request failed') {
        Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);

        this.setState({ loadError: true })
      }
      else if (error.status == 404) {
        console.log('Внимание', 'Дом не найден: ' + error, [{ text: 'OK' }]);
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
    const { indicator, im, scrollView, screenWH } = globalStyles
    const { load, loadError, refreshing } = this.state
    var { userLogin, token } = store.state;
    const reload = false;//this.props.route.params
    if (reload) {
      this.onRefresh()
      console.log('reload: true')
    }
    console.log('userLogin.fk_Home: ' + userLogin.fk_Home + ' userLogin.isApprovedHome: ' + userLogin.isApprovedHome)
    return (<View>
      <Header title='Дом'
        bold={true}
        // leftIcon={'menu'}
        // onPressLeft={() => {
        //   navigation.openDrawer()
        // }}
      />
      {token ? (
        userLogin.fk_Home ? (
          userLogin.isApprovedHome ? (
            load ? this.HomeData()
              : <View>
                <ScrollView
                  contentContainerStyle={[scrollView, screenWH]}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
                  } >
                  {Background}
                  {!loadError && <ActivityIndicator style={indicator} size={50} color={appColor} />}
                </ScrollView>
              </View>
          )
            : this.notApprovedHome('Вас еще не утвердили в доме')
        )
          : this.notAddHome('Вы еще не добавились к дому')
      )
        : this.Login('Чтобы видеть на этом экране информацию по вашему дому войдите в систему!')
      }
    </View>
    );
  }
  private Login(text: string) {
    const { positionCard, h2, link, buttonContainer, buttonTitle, im, scrollView } = globalStyles
    const { refreshing } = this.state
    const { navigation } = this.props
    return (<View>
      {Background}
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
          }
        >
          <View style={positionCard}>
            <Card containerStyle={{ paddingBottom: 20, borderRadius: 10 }} >
              <Image source={require('../../../icon/warning-shield.png')}
                style={{ alignSelf: 'center' }} />
              <Text style={h2}>{text}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('AUTH')}>
                <View style={buttonContainer}>
                  <Text style={buttonTitle}>Войти</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate(REGISTRATION)}>
                <Text style={link}>Зарегистрироваться</Text>
              </TouchableOpacity>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
    );
  }
  private notApprovedHome(text: string) {
    const { indicator, im, scrollView, h2, positionCard } = globalStyles
    const { refreshing } = this.state
    return (<View>
      {Background}
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
          }
        >
          <View style={positionCard}>
            <Card containerStyle={{ paddingBottom: 20, borderRadius: 10 }} >
              <Image source={require('../../../icon/warning-shield.png')}
                style={{ alignSelf: 'center' }} />
              <Text style={h2}>{text}</Text>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
    );
  }
  private notAddHome(text: string) {
    const { indicator, buttonContainer, buttonTitle, im, h2, positionCard } = globalStyles
    const { refreshing } = this.state
    const { navigation } = this.props
    const back = true;
    return <View>
      {Background}
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
          }
        >
          <View style={positionCard}>
            <Card containerStyle={{ paddingBottom: 20, borderRadius: 10 }} >
              <Image source={require('../../../icon/warning-shield.png')}
                style={{ alignSelf: 'center' }} />
              <Text style={h2}>{text}</Text>
              <TouchableOpacity
                onPress={() => {
                  this.setClearState()
                  navigation.navigate(ADDRESSScreen, back)
                }}>
                <View style={buttonContainer}>
                  <Text style={buttonTitle}>Добавить дом</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  }
  private HomeData() {
    const { userLogin } = store.state;
    const { navigation } = this.props
    const { images, h1, h3, sub, link, } = globalStyles
    const { status, sectionContainer, sectionTitle, homeStatusGood, homeStatusBad,
      sectionContainer1, sectionTitle1, numberStyle } = locStyles
    const { data, refreshing, approvedTentants, newTenants } = this.state
    const { uid, imageUrl, city, street, homeNumber, appartaments, floors, porches, fk_Status,
      yearCommissioning, localGroups, fk_Manager, manager } = data
    return <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
        }
      >
        <Image source={{ uri: imageUrl ? imageUrl.url : NoFoto }} style={images} />
        <Text style={[h1, { paddingBottom: 10 }]}>г. {city}, {street}, д. {homeNumber}</Text>
        <Text style={[status, fk_Status == 1 ? homeStatusGood : homeStatusBad]}>
          {fk_Status == 1 ? HomeStatus.Exploited : HomeStatus.Emergency}</Text>

        <View style={sub}>
          <TouchableOpacity onPress={() =>
            localGroups.length ? navigation.navigate(GroupLIST, uid) : navigation.navigate(AddGROUP, (uid))} >
            <View style={sectionContainer1}>
              <Text style={sectionTitle1}>Группы</Text>
              <Text style={[sectionTitle1, numberStyle]}>{localGroups.length}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => (approvedTentants.length || newTenants.length) &&
              navigation.navigate(TENTENScreen, { approvedTentants, newTenants, uid, fk_Manager })
            } >
            <View style={sectionContainer1}>
              <Text style={sectionTitle1}>Жители</Text>
              <Text style={[sectionTitle1, numberStyle]}>{approvedTentants.length}</Text>
            </View>
            {((userLogin.fk_Role != Role.user || userLogin.uid == fk_Manager) && newTenants.length) ?
              <Badge
                status='warning'
                containerStyle={{ position: 'absolute', top: 5, right: 40 }}
                value={newTenants.length}
                textStyle={{ fontSize: 14 }}
              />
              : <View></View>
            }
          </TouchableOpacity>
        </View>

        {(userLogin.fk_Role != Role.user || userLogin.uid == fk_Manager) &&
          <TouchableOpacity onPress={() => navigation.navigate(AddGROUP, (uid))} >
            <View style={sectionContainer}>
              <Text style={sectionTitle}>Добавить группу</Text>
            </View>
          </TouchableOpacity>
        }
        <Divider style={{ margin: 5 }}></Divider>

        <View style={sub}>
          <Text style={h3}>Управляющий дома: </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(PROFILE, fk_Manager)}>
            <Text style={link}> {manager.fullName}</Text>
          </TouchableOpacity>
        </View>
        <Text style={h3}><Text style={{ color: 'grey' }}>Этажей:</Text> {floors} </Text>
        <Text style={h3}><Text style={{ color: 'grey' }}>Квартир:</Text> {appartaments} </Text>
        <Text style={h3}><Text style={{ color: 'grey' }}>Подъездов:</Text> {porches} </Text>
        <Text style={h3}><Text style={{ color: 'grey' }}>Введен в эксплуатацию:</Text> {yearCommissioning} г.</Text>
        <View style={{ margin: 55 }}><Text> </Text></View>
      </ScrollView>
    </SafeAreaView>
  }

  private async onRefresh() {
    this.setClearState();
    this.UserReload()
    this.componentDidMount();
  }
  private setClearState() {
    this.setState({ data: InitialHome, load: false, refreshing: false, loadError: false })
  }
  private async UserReload() {
    const { token, userLogin } = store.state
    try {
      if (token) {
        const response = await fetch(serverUrl + 'profile?Uid=' + userLogin.uid,
          {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
        const data: User = await response.json()
        if (response.status == 200) {
          actions.Login(token, data)
          console.log('Успех fetch UserReload', data)
        }
        else if (response.status == 404) {
          console.log('Внимание', 'Пользователь не найден uid=' + data.uid);
          this.setState({ loadError: true })
        }
      }
    } catch (error) {
      console.log('Внимание', 'Ошибка UserReload' + ' Post fetch: ' + error);
      if (error == 'TypeError: Network request failed') {
        Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);

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
}


const locStyles = StyleSheet.create({
  status: {
    alignSelf: 'center',
    borderRadius: 6,
    color: '#fff',
    paddingVertical: 1,
    paddingHorizontal: 7,
  },
  homeStatusGood: {
    backgroundColor: '#13CE66'
  },
  homeStatusBad: {
    backgroundColor: '#ff3437'
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
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 15,
    marginHorizontal: w * 0.125,
    width: 90,
  },
  sectionTitle1: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey'
  },
  numberStyle: {
    color: 'black',
  },
  containerUp: {
    flex: 0,
    marginTop: 40,
  },
})

export default (HomeScreen)

