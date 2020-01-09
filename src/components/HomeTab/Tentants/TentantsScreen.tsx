import React, {PureComponent} from 'react';
import {
  View, Text, ScrollView, ActivityIndicator, Image, Alert, RefreshControl
} from 'react-native';
import { Header, SearchHeader, HomeCard, globalStyles, TentantCard, TentantNewCard } from '../..';
import { menu, search, backArrow, rightBack } from '../../../allSvg'
import { HOMEProfile, PROFILE, HOMEScreen, NAVIGATIONAdmin, NAVIGATIONUser } from '../../../routes';
import { ColorApp, serverUrl, BackgroundImage } from '../../../constants';
import { ListItem, Button, Icon, Card, Divider } from 'react-native-elements'
import { Home, User } from '../../../interfaces'
import { store } from '../../../store';
import { Role } from '../../../enum/Enums';

interface TentantData{  
  tantains: User[],
  newTantains: User[],
}

interface State {
  approvedTentants: User[],
  newTenants: User[],
  allTentants: User[],
  load: boolean,
  visibleSearch: boolean,
  text: string,
  refreshing: boolean,
  loadError: boolean,
  reload: boolean
}

interface Props { }

class TentantsScreen extends PureComponent<any, State, Props> {
  state = {
    approvedTentants: [], newTenants: [], allTentants: [], load: false,
    visibleSearch: false, text: '', refreshing: false, loadError: false,
    reload: false
  } as State

  componentDidMount = async () => {
    var $this = this
    const { userLogin, token } = store.state;
    var { approvedTentants, newTenants, uid } = this.props.navigation.state.params
    if (!uid) {
      Alert.alert('Внимание', 'uid: ' + uid, [{ text: 'OK' }]);
      return
      }
    this.setState({ approvedTentants, newTenants, loadError: true })
    console.log('componentDidMount approvedTentants: ', approvedTentants)
    console.log('componentDidMount newTenants: ', newTenants)
    var logAction = 'Tenants';
    try {
      const response = await fetch(serverUrl + 'profile/tentants?Fk_Home=' + uid,
      { headers: { 'Authorization': `Bearer ${token}` } })
      if (response.status == 200) {
        const data: TentantData = await response.json()
        $this.setState({
          approvedTentants: data.tantains, newTenants: data.newTantains,
          allTentants: data.tantains, loadError: false
        })
        console.log('Успех fetch ' + logAction, data)
      }
    } catch (error) {
      console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
      if (error == 'TypeError: Network request failed') {
        Alert.alert('Внимание', 'Сервер не доступен: ' + error, [{ text: 'OK' }]);
        $this.setState({ loadError: false })
      }
      else {
        Alert.alert('Внимание', 'Ошибка сервера: ' + error, [{ text: 'OK' }]);
      }
      $this.setState({ loadError: false })
      return
    }
  }

  onSearchTentants = (text: string) => {
    var txt: User[] = this.state.allTentants;
    if (text) {
      var filtered = txt.filter((el) =>
        el.fullName.toLowerCase().indexOf(text.toLowerCase()) > -1
      );
      this.setState({ approvedTentants: filtered, text });
    }
    else this.setState({ approvedTentants: this.state.allTentants, text });
  }

  private async onRefresh() {
    this.setClearState();
    this.componentDidMount();
  }
  private setClearState() {
    this.setState({
      approvedTentants: [], newTenants: [], allTentants: [], load: false,
      visibleSearch: false, text: '', refreshing: false, loadError: false
    })
  }

  render() {
    const { userLogin, token } = store.state;
    const { approvedTentants, newTenants, allTentants, load, visibleSearch, 
      refreshing, loadError, reload } = this.state
    const { h3, container, indicator, im, cardUsersStyle } = globalStyles
    const { navigation } = this.props
    var { uid, fk_Manager } = this.props.navigation.state.params
    console.log('Rander Props: ', this.props)
    console.log('Rander uid: ', uid)
    console.log('Rander approvedTentants: ', approvedTentants)
    console.log('Rander newTenants: ', newTenants)
    return (<View>
      {visibleSearch ?
        <SearchHeader
          rightIcon={rightBack}
          onChangeText={this.onSearchTentants.bind(this)}
          value={this.state.text}
          onPressRight={() => this.setState({ visibleSearch: false, approvedTentants: allTentants })}
          onBlur={() => this.setState({ visibleSearch: false })}
        /> :
        <Header title='Жители дома'
          leftIcon={backArrow}
          onPressLeft={() => {
            navigation.goBack()
          }
          } //navigation.navigate(HOMEScreen, true)
          rightIcon={search}
          onPressRight={() => this.setState({ visibleSearch: true })}
        />
      }
      <View>
        <Image source={BackgroundImage} style={im}></Image>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
        }
      >

        {(userLogin.fk_Role != Role.user || userLogin.uid == fk_Manager) && newTenants.length ?
          <Card containerStyle={cardUsersStyle}>
            <View >
              <Text style={h3}>Новые жители: </Text>
              {newTenants.map((item: User) => {
                return <TentantNewCard data={item} key={item.uid}
                  onPress={() => navigation.navigate(PROFILE, item.uid)}
                  onPressBtn={() => this.addNewTentant(item.uid)} />
              })}
            </View>
            <Divider />
          </Card>
          : <View></View>
        }

        {approvedTentants.length ?
          <Card containerStyle={cardUsersStyle}>            
            <View >
              {approvedTentants.map((item: User) => {
                return <TentantCard data={item} key={item.uid}
                  onPress={() => navigation.navigate(PROFILE, item.uid)} 
                  loadError={loadError}/>
              })
              }
            </View>
          </Card>
          : <View></View>
        }
        {/* {approvedTentants.length ?
          approvedTentants.map((l: User, i: number) => (
                <ListItem
                  key={i}
                  leftAvatar={{ rounded: true, source: l.avatar ? {uri: l.avatar.url} : require('../../../../icon/user1.png') }}
                  title={l.fullName}
                  bottomDivider
                  chevron={{ size: 30 }}
                />
              ))
              
          : <View></View>
        } */}
        <View style={{ margin: 30 }}><Text></Text></View>
      </ScrollView>
    </View>
    );
  }
  private async addNewTentant(uid: string) {
    var $this = this
    console.log("Press add btn")
    try {
      this.setState({ loadError: true })
      const { userLogin, token } = store.state;
      var url = serverUrl + 'profile/approve?Uid=' + uid
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.status == 200) {
        console.log("Успех UserApproved fetch: ")
        const data: TentantData = await response.json()
        $this.setState({
          approvedTentants: data.tantains, newTenants: data.newTantains,
          allTentants: data.tantains, loadError: false, reload: true
        })
      }
      else if (response.status == 400) {
        console.log("Пользователь не найден: ", "status: 400")
        $this.setState({ loadError: false })
      }
      else {
        console.log("Ошибка: ", "response.status: " + response.status + " " + response.statusText)
        $this.setState({ loadError: false })
      }
    } catch (e) {
      throw e
    }
  }
}



export { TentantsScreen } //connect(mapStateToProps,{searchChanged})