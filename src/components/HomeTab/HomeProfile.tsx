import React, { Component } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Button, RefreshControl
} from 'react-native';
import { Header, globalStyles } from '..';
import { backArrow } from '../../allSvg'
import { HomeStatus, Role } from '../../enum/Enums';
import { h, w, ColorApp, NoFoto, serverUrl } from '../../constants'
import { GroupLIST, TENTENScreen, PROFILE, AddGROUP } from '../../routes';
import { Badge, Divider } from 'react-native-elements';
import { store } from '../../store';
import { Home, InitialHome, User, HomeData } from '../../interfaces';


interface Props { }
interface State {
  data: Home,
  load: boolean,
  approvedTentants: User[],
  newTenants: User[],
  loadError: boolean,
  refreshing: boolean,
}

class HomeProfile extends Component<any, State, Props> {

  state = { data: InitialHome, load: false, loadError: false, refreshing: false } as State

  componentDidMount = async () => {
    this.setState({ loadError: false })
    var logAction = 'Профиль дома';
    try {
      const { userLogin, token } = store.state;
      var home: Home = this.props.navigation.state.params
      if (token && userLogin.fk_Role != Role.user) {
        const response = await fetch(serverUrl + 'home?Fk_Home=' + home.uid,
          { headers: { 'Authorization': `Bearer ${token}` } })
        const data: HomeData = await response.json()
        if (response.status == 200) {
          this.setState({
            data: data.homeData, approvedTentants: data.tantains,
            newTenants: data.newTantains, load: true
          })
          console.log('Успех fetch ' + logAction, data)
        }
        else if (response.status == 404) {
          console.log('Внимание', 'Дом не найден uid=' + home.uid);
          this.setState({ loadError: true })
        }
      }
    } catch (e) {
      throw e
    }
  }
  render() {
    const { userLogin, token } = store.state;
    const { navigation } = this.props
    var propsData = this.props.navigation.state.params
    const { uid, imageUrl, city, street, homeNumber, appartaments, floors, porches, fk_Status,
      yearCommissioning, fk_Manager, } = propsData
    const { data, load, approvedTentants, newTenants, refreshing } = this.state
    const { localGroups, manager } = data
    const { images, h1, sub, link, indicator } = globalStyles
    const { status, h3, sectionContainer, sectionTitle, sectionContainer1, sectionTitle1,
      homeStatusGood, homeStatusBad } = locStyles
    console.log('props: ', this.props)
    console.log(' props.params: ', this.props.navigation.state.params)
    return (<View>
      <Header title='Дом'
        leftIcon={backArrow}
        onPressLeft={() => navigation.goBack()} />

      <View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
          }
        >
          <Image source={{ uri: imageUrl ? imageUrl.url : NoFoto }} style={images} />
          <Text style={h1}>г. {city}, ул. {street}, д. {homeNumber}</Text>
          <Text style={[status, fk_Status == 1 ? homeStatusGood : homeStatusBad]}>
            {fk_Status == 1 ? HomeStatus.Exploited : HomeStatus.Emergency}</Text>

          {(token && userLogin.fk_Role != Role.user) ? (
            load ? (<View>
              <View style={sub}>
                <TouchableOpacity onPress={() =>
                  localGroups.length ? navigation.navigate(GroupLIST, uid) : navigation.navigate(AddGROUP, (uid))} >
                  <View style={sectionContainer1}>
                    <Text style={sectionTitle1}>Группы    {localGroups.length}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => (approvedTentants.length || newTenants.length) &&
                    navigation.navigate(TENTENScreen, { approvedTentants, newTenants })
                  } >
                  <View style={sectionContainer1}>
                    <Text style={sectionTitle1}>Жители   {approvedTentants.length}</Text>
                  </View>
                  {(userLogin.fk_Role != Role.user || userLogin.uid == fk_Manager) ?
                    newTenants.length ?
                      <Badge
                        status='warning'
                        containerStyle={{ position: 'absolute', top: 5, right: 40 }}
                        value={newTenants.length}
                        textStyle={{ fontSize: 14 }}
                      />
                      : <View></View>
                    : <View></View>
                  }
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate(AddGROUP, (uid))} >
                <View style={sectionContainer}>
                  <Text style={sectionTitle}>Добавить группу</Text>
                </View>
              </TouchableOpacity>
            </View>
            ) : <ActivityIndicator style={[indicator, { marginTop: h / 2 }]} size={50} color={ColorApp} />
          ) : <View></View>
          }

          <Divider />
          {token ?
            <View style={sub}>
              <Text style={h3}>Управляющий дома: </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(PROFILE, fk_Manager)}>
                <Text style={link}> {manager.fullName}</Text>
              </TouchableOpacity>
            </View>
            : <View></View>
          }
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
    borderRadius: 6,
    color: '#fff',
    paddingVertical: 1,
    paddingHorizontal: 7,
    marginVertical: 10
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

