import React from 'react';
import {
  StatusBar, View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator,
  RefreshControl, Alert
} from 'react-native';
import { Header, globalStyles } from '..';
import { store, actions } from '../../store'
import { User, initialUser } from '../../interfaces'
import { h, w, appColor, serverUrl, Background, NoAvatar } from '../../constants'
import { Gender, Role } from '../../enum/Enums';
import { AddGROUP, AUTH, REGISTRATION, GroupLIST, ADDRESSScreen, EXITScreen } from '../../Navigations/routes';
import { Card, Icon } from 'react-native-elements'
import { Avatar, List, Appbar, FAB, Menu, Button, Divider, Provider, IconButton } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';


interface State {
  data: User,
  load: boolean,
  refreshing: boolean,
  loadError: boolean,
  visible: boolean,
}

class ProfileScreen extends React.Component<any, State> {
  state = { data: initialUser, load: false, refreshing: false, loadError: false, visible: false };

  componentDidMount = async () => {
    this.setState({ loadError: false })
    var logAction = 'Профиль пользователя';
    try {
      const { userLogin, token } = store.state;
      var uid = userLogin.uid;
      var param = this.props.route.params
      if (param) uid = param;
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

  render() {
    const { navigation } = this.props
    const { indicator, im, scrollView } = globalStyles
    var { load, visible, loadError, data, refreshing } = this.state
    var { userLogin, token } = store.state;
    const { containerBtn, iconLeftStyle } = locStyles
    return (
      <View >
        {/* <StatusBar backgroundColor={appColor} barStyle="light-content" />
        <Appbar.Header
          style={{ backgroundColor: appColor }}> */}
          {/* <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={containerBtn}>
              <SvgXml xml={backArrow} style={iconLeftStyle} fill='white' />
          </TouchableOpacity> */}
          {/* <View style={{ width: w * 0.05 }}></View>
          <Appbar.Content title="Профиль" titleStyle={{ fontSize: 22, fontWeight: 'bold' }} />

          {userLogin.uid == data.uid && <Appbar.Action icon="dots-vertical" onPress={() => this.setState({ visible: true })} color='white' />}
        </Appbar.Header> */}
        <Header title={data.login}//'Профиль'
          leftIcon={load && (userLogin.uid != data.uid && token && 'arrow-left')}
          onPressLeft={() => navigation.goBack()}
          // rightIcon={ 'dots-vertical'} //userLogin.uid == data.uid && token &&
          // onPressRight={() => this.setState({ visible: true })}
          rightIcon={load && token && (userLogin.uid == data.uid ? 'menu' : userLogin.fk_Role == Role.admin && 'dots-vertical')}
          onPressRight={userLogin.fk_Role == Role.admin && userLogin.uid != data.uid ? 
            () => this.setState({ visible: true }) :
            () => { navigation.openDrawer() }
          } 
          />

        {load ? (
          this.ProfileData()
        ) : <View>
            {Background}
            {!loadError && <ActivityIndicator style={indicator} size={50} color={appColor} />}
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
              }
            >
              <View style={{ marginBottom: h }}>
                <Text> </Text>
              </View>
            </ScrollView>
          </View>
        }
      </View>
    )
  }

  private ProfileData() {
    const { navigation } = this.props
    const { images, noImages, sub, h1 } = globalStyles
    const { sectionContainer1, sectionTitle1, h3, editStyle } = locStyles
    var { data, refreshing, visible } = this.state
    var { myGroups, address, phone, fk_Gender, fullName, avatar, uid } = data
    return <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
      }
    >
      <View style={[sub, { margin: 5 }]}>
        <Avatar.Image size={w * 0.4} source={{ uri: avatar ? avatar.url : NoAvatar }} style={{ backgroundColor: 'white' }} />
        <TouchableOpacity onPress={() => myGroups.length && navigation.navigate(GroupLIST, uid)} >
          <View style={sectionContainer1}>
            <Text style={[sectionTitle1, { color: 'grey' }]}>Группы</Text>
            <Text style={sectionTitle1}>{myGroups.length ? myGroups.length : 0}</Text>
          </View>
        </TouchableOpacity>
        
      <Provider >
        <View style={{marginTop:-200}}>
          <Menu
            visible={visible}
            onDismiss={() => this.setState({ visible: false })}
            anchor={
              <IconButton icon="pencil" onPress={() => console.log('') } color={'white'} />
            }
          >
            <Menu.Item onPress={() => {
              this.setState({ visible: false })
            }} title="Изменить профиль" />
            <Menu.Item onPress={() => {
              this.setState({ visible: false })
              const back = true;
              navigation.navigate(ADDRESSScreen, (back));
            }} title="Изменить адрес" />
            <Divider />
            <Menu.Item onPress={() => {
              this.setState({ visible: false })
              navigation.navigate(EXITScreen);
            }} title="Выйти          " />
          </Menu>
        </View>
      </Provider>
        {/* <TouchableOpacity onPress={() => {
            const back = true;
            navigation.navigate(ADDRESSScreen, (back));
          }} >
          <View style={editStyle}>
           <Icon name='edit' color='grey'></Icon>
          </View>
        </TouchableOpacity> */}
      </View>
      <Text style={[h1]}>{fullName} </Text>
      <View style={{ margin: 5 }}></View>
      <View style={sub}>
        <List.Icon icon="map-marker" style={{ margin: 0 }} color='grey' />
        <Text style={h3}>{address}</Text>
      </View>
      {phone &&
        <View style={sub}>
          <List.Icon icon="phone" style={{ margin: 0 }} color='grey' />
          <Text style={h3}>{phone}</Text>
        </View>
      }
      {/* <Text style={h3}>{fk_Gender ? 'Пол: ' : ' '}{fk_Gender == 1 ? Gender.male : fk_Gender == 2 && Gender.female} </Text> */}
      <View style={{ margin: 155 }}><Text> </Text></View>

      {/* <Provider>
        <Menu
          visible={visible}
          onDismiss={() => this.setState({ visible: false })}
          anchor={
            <IconButton icon="pencil" onPress={() => console.log('')}
              size={25} color='white' style={{ marginRight: -100 }} />
          }
        >
        </Menu>
      </Provider> */}
      {/* <FAB.Group
             visible={visible}
             icon={visible ? 'calendar' : 'plus'}
             actions={[
               { icon: 'plus', onPress: () => console.log('Pressed add') },
               { icon: 'star', label: 'Star', onPress: () => console.log('Pressed star')},
               { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
               { icon: 'bell', label: 'Remind', onPress: () => console.log('Pressed notifications') },
             ]}
             visible={true}
             onStateChange={({ visible }) => this.setState({ visible })}
             onPress={() => {
               if (visible) {
                 // do something if the speed dial is visible
               }
             }}
           /> */}
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
    borderColor: 'grey',
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
  h1: {
    paddingHorizontal: 15,
    fontSize: 20,
    width: w,
    fontWeight: 'bold',
  },
  h3: {
    width: w * 0.8,
    fontSize: 18,
  },
  editStyle: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    padding: 5,
    alignSelf: 'center'
  },
  containerBtn: {
    //backgroundColor: 'gold',
    padding: 20,
    borderRadius: 35,
    marginLeft: 5,
  },
  iconLeftStyle: {
    width: 20,
    height: 20,
  },
})

export { ProfileScreen };