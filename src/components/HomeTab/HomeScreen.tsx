import React, { PureComponent } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView,
  ActivityIndicator, RefreshControl, Alert,
} from 'react-native';
import { Header, globalStyles } from '..';
import { menu } from '../../allSvg'
import { HomeStatus, Role } from '../../enum/Enums';
import { h, w, ColorApp, NoFoto, serverUrl, BackgroundImage } from '../../constants'
import { AddGROUP, AUTH, REGISTRATION, GroupLIST, ADDRESSScreen, TENTENScreen, PROFILE } from '../../routes';
import { Home, User, InitialHome } from '../../interfaces'
import { useGlobal, store } from '../../store'
import { Card, Badge } from 'react-native-elements'

interface State {
  data: Home,
  load: boolean,
  refreshing: boolean,
  loadError: boolean,
  approvedTentants: User[],
  newTenants: User[],
  reload: boolean
}

interface HomeData {
  homeData: Home,
  tantains: User[],
  newTantains: User[],
}

interface Props { }

class HomeScreen extends PureComponent<any, State, Props> {
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
      const reload = this.props.navigation.state.params
      console.log('componentDidMount token: ', token)
      console.log('componentDidMount userLogin: ', userLogin)
      console.log('componentDidMount reload: ', reload)
      if ((token && userLogin.fk_Home && userLogin.isApprovedHome) ||
        (token && userLogin.fk_Home) || (token && reload)) {
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
        Alert.alert('Внимание', 'Сервер не доступен: ' + error, [{ text: 'OK' }]);

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
    console.log('token: ', token)
    console.log('load: ', load)
    console.log('userLogin: ', userLogin)
    var reload = this.props.navigation.state.params
    this.setState({ reload })
    console.log('reload: ', reload)
    return (<View>
      <Header title='Дом'
        leftIcon={menu}
        onPressLeft={() => {
          navigation.openDrawer()
        }} />
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
                  <Image source={BackgroundImage} style={im}></Image>
                  {!loadError && <ActivityIndicator style={indicator} size={50} color={ColorApp} />}
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
    const { indicator, h2, link, buttonContainer, buttonTitle, im, scrollView } = globalStyles
    const { refreshing } = this.state
    const { navigation } = this.props
    return (<View>
      <Image source={BackgroundImage} style={im}></Image>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
          }
        >
          <View style={indicator}>
            <Card containerStyle={{ paddingBottom: 20, borderRadius: 10 }} >
              <Image source={require('../../../icon/warning-shield.png')}
                style={{ alignSelf: 'center' }} />
              <Text style={h2}>{text}</Text>
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
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
    );
  }
  private notApprovedHome(text: string) {
    const { indicator, im, scrollView, h2 } = globalStyles
    const { refreshing } = this.state
    return (<View>
      <Image source={BackgroundImage} style={im}></Image>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
          }
        >
          <View style={indicator}>
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
    const { indicator, buttonContainer, buttonTitle, im, h2 } = globalStyles
    const { refreshing } = this.state
    const { navigation } = this.props
    const back = true;
    return <View>
      <Image source={BackgroundImage} style={im}></Image>
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
          }
        >
          <View style={indicator}>
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
    const { images, h1, h3, sub, link } = globalStyles
    const { status, sectionContainer, sectionTitle, container,
      sectionContainer1, sectionTitle1, } = locStyles
    const { data, refreshing, approvedTentants, newTenants } = this.state
    const { imageUrl, city, street, homeNumber, appartaments, floors, porches, fk_Status,
      yearCommissioning, localGroups, fk_Manager, manager } = data
    return <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
        }
      >
        <Image source={{ uri: imageUrl ? imageUrl.url : NoFoto }} style={images} />
        <Text style={[h1, { paddingBottom: 10 }]}>г. {city}, {street}, д. {homeNumber}</Text>
        <Text style={status}>{fk_Status == 1 ? HomeStatus.Exploited : HomeStatus.Emergency}</Text>

        <View style={container}>          
        <TouchableOpacity onPress={() => navigation.navigate(GroupLIST, localGroups)} >
            <View style={sectionContainer1}>
              <Text style={sectionTitle1}>Группы    {localGroups.length}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(TENTENScreen, data)} >
            <View style={sectionContainer1}>
              <Text style={sectionTitle1}>Жители   {approvedTentants.length}</Text>
            </View>
            {((userLogin.fk_Role != Role.user || userLogin.uid == fk_Manager) && newTenants.length) &&
                <Badge
                  status='warning'
                  containerStyle={{ position: 'absolute', top: 5, right: 40 }}
                  value={newTenants.length}
                  textStyle={{ fontSize: 14 }}
                /> 
              }
          </TouchableOpacity>
        </View>

        {userLogin.fk_Role != Role.user &&
            <TouchableOpacity onPress={() => navigation.navigate(AddGROUP, (userLogin.uid))} >
              <View style={sectionContainer}>
                <Text style={sectionTitle}>Добавить группу</Text>
              </View>
            </TouchableOpacity>
        }

        <View style={sub}>
        <Text style={h3}>Управляющий дома: </Text> 
        <TouchableOpacity
            onPress={() => navigation.navigate(PROFILE, fk_Manager)}>
              <Text style={link}> {manager.fullName}</Text>
          </TouchableOpacity>
          </View>
        <Text style={h3}>Кол-во квартир: {appartaments} </Text>
        <Text style={h3}>Кол-во этажей: {floors} </Text>
        <Text style={h3}>Кол-во подъездов: {porches} </Text>
        <Text style={h3}>Год ввода в эксплуатацию: {yearCommissioning} </Text>
        <View style={{ margin: 55 }}><Text> </Text></View>
      </ScrollView>
    </SafeAreaView>
  }
  private onAddTenant() {

  }

  private async onRefresh() {
    this.setClearState();
    this.componentDidMount();
  }
  private setClearState() {
    this.setState({ data: InitialHome, load: false, refreshing: false, loadError: false })
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
  containerUp: {
    flex: 0,
    marginTop: 40,
  },
})

export default (HomeScreen)

