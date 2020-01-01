import React, { PureComponent } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import { Header, globalStyles } from '..';
import { menu } from '../../allSvg'
import { HomeStatus, Role } from '../../enum/Enums';
import { h, w, brown, NoFoto } from '../../constants'
import { AddGROUP, AUTH, REGISTRATION, GroupLIST, ADDRESSScreen } from '../../routes';
import { Home, User } from '../../interfaces'
import { useGlobal, store } from '../../store'
import { Card } from 'react-native-elements'

interface State {
  data: Home,
  load: boolean,
  refreshing: boolean,
}
interface Props { }

class HomeScreen extends PureComponent<any, State, Props> {
  state = {
    data: {
      uid: '',
      city: '', street: '', homeNumber: '',
      fk_Admin: '', fk_Image: '',
      fk_Status: 0, appartaments: 0,
      floors: 0, porches: 0,
      yearCommissioning: '',
      imageUrl: {
        uid: '',
        url: ''
      }
    },
    load: false,
    refreshing: false
  } as State


  componentDidMount = async () => {

    try {
      const { userLogin, token } = store.state;
      console.log('componentDidMount token: ', token)
      console.log('componentDidMount userLogin: ', userLogin)
      //console.log('Uid ',JSON.stringify(dataR.uid))
      var uid = userLogin.fk_Home;
      if (token) {
        const response = await fetch('http://192.168.43.80:5000/api/home?Uid=' + uid,
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
          this.setState({ load: true, refreshing: true })
        }
      }
    } catch (e) {
      throw e
    }
  }

  render() {
    const { navigation } = this.props
    const { indicator, im } = globalStyles
    const { load } = this.state
    var { userLogin, token } = store.state;
    console.log('token: ', token)
    console.log('load: ', load)
    console.log('userLogin: ', userLogin)

    return (<View>
      <Header title='Дом'
        leftIcon={menu}
        onPressLeft={() => {
          navigation.openDrawer()
        }} />
      {token ? (
        userLogin.fk_Home ? (
          userLogin.appartament ? (
            load ? this.HomeData()
              : <View>
                <Image source={require('../../../image/brick_texture1.jpg')} style={im}></Image>
                <ActivityIndicator style={indicator} size={50} color={brown} />
              </View>
          )
            : this.notHome('Вас еще не утвердили в доме')
        )
          : this.AddHome('Вы еще не добавилсь к дому')
      )
        : this.Login('Чтобы видеть на этом экране информацию по вашему дому войдите в систему!')
      }
    </View>
    );
  }
  private Login(text: string) {
    const { indicator, link, buttonContainer, buttonTitle, im } = globalStyles
    const { refreshing } = this.state
    const { navigation } = this.props
    const { h2, scrollView } = locStyles
    return (<View>
      <Image source={require('../../../image/brick_texture1.jpg')} style={im}></Image>
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
    </View>
    );
  }
  private notHome(text: string) {
    const { indicator, link, buttonContainer, buttonTitle, im } = globalStyles
    const { refreshing } = this.state
    const { navigation } = this.props
    const { h2, scrollView } = locStyles
    return (<View>
      <Image source={require('../../../image/brick_texture1.jpg')} style={im}></Image>
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
    </View>
    );
  }
  private AddHome(text: string) {
    const { indicator, buttonContainer, buttonTitle, im } = globalStyles
    const { refreshing } = this.state
    const { navigation } = this.props
    const { h2} = locStyles
    const back = true;
    return <View>
      <Image source={require('../../../image/brick_texture1.jpg')} style={im}></Image>
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
              onPress={() => navigation.navigate(ADDRESSScreen, back)}>
              <View style={buttonContainer}>
                <Text style={buttonTitle}>Добавить дом</Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </View>
  }
  private HomeData() {
    const { userLogin } = store.state;
    const { navigation } = this.props
    const { images, h1, im } = globalStyles
    const { status, h3, sectionContainer, sectionTitle, container,
      sectionContainer1, sectionTitle1, } = locStyles
    const { data, refreshing } = this.state
    const { imageUrl, city, street, homeNumber, appartaments, floors, porches, fk_Status,
      yearCommissioning, tenants, localGroups } = data
    return <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
      }
    >
      <Image source={{ uri: imageUrl ? imageUrl.url : NoFoto }} style={images} />
      <Text style={h1}>г. {city}, ул. {street}, д. {homeNumber}</Text>
      <Text style={status}>{fk_Status == 1 ? HomeStatus.Exploited : HomeStatus.Emergency}</Text>

      <View style={container}>
        <TouchableOpacity onPress={this.onAddTenant} >
          <View style={sectionContainer1}>
            <Text style={sectionTitle1}>Жители   {tenants.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(GroupLIST)} >
          <View style={sectionContainer1}>
            <Text style={sectionTitle1}>Группы    {localGroups.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

{userLogin.fk_Role == Role.admin &&
      <View style={container}>
        <TouchableOpacity onPress={this.onAddTenant} >
          <View style={sectionContainer}>
            <Text style={sectionTitle}>Добавить жителя</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(AddGROUP, (userLogin.uid))} >
          <View style={sectionContainer}>
            <Text style={sectionTitle}>Добавить группу</Text>
          </View>
        </TouchableOpacity>
      </View>
  }

      <Text style={h3}>Кол-во квартир: {appartaments} </Text>
      <Text style={h3}>Кол-во этажей: {floors} </Text>
      <Text style={h3}>Кол-во подъездов: {porches} </Text>
      <Text style={h3}>Год ввода в эксплуатацию: {yearCommissioning} </Text>
      <View style={{ margin: 55 }}><Text> </Text></View>
    </ScrollView>
  }
  private onAddTenant() {

  }

  private async onRefresh() {
    this.setClearState();   
    this.componentDidMount();     
  }
  private setClearState() {
    const InitialImage = { uid: '', url: '', removed: false, createdAt: '' }
    var InitialHome: Home = {
      uid: '', city: '', street: '', homeNumber: '',
      fk_Admin: '', fk_Image: '',
      fk_Status: 0, appartaments: 0,
      floors: 0, porches: 0, yearCommissioning: '',
      imageUrl: InitialImage, createdAt: new Date,
      editedAt: new Date, removed: false, tenants: [],
      localGroups: []
    }
   this.setState({ data: InitialHome, load: false, refreshing: false})  
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
  containerUp: {
    flex: 0,
    marginTop: 40,
  },
  scrollView: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default (HomeScreen)

