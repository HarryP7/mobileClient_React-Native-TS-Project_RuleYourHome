import React, { PureComponent } from 'react';
import {
  StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Button
} from 'react-native';
import { Header, globalStyles } from '..';
import { menu } from '../../allSvg'
import { HomeStatus } from '../../enum/Enums';
import { h, w, brown } from '../../constants'
import { AddGROUP, AUTH, REGISTRATION, GroupLIST } from '../../routes';
import { Home, User } from '../../interfaces'
import { useGlobal, store } from '../../store'
import { Card } from 'react-native-elements'

interface State {
  data: Home,
  load: boolean,
  userLogin: User,
  token: string
}
interface Props { }

const dataR = { uid: '94fa3436-0f41-4ae8-89ae-571682b1b304', "location": 'г.Готем-сити ул. Тейтен-Уест, д. 73', "appartaments": 208, "fk_Admin": "0000e0000-t0t-00t0-t000-00000000000", "floors": 14, "porches": 4, "fk_Status": 1, "yearCommissioning": '2015', "imageUrl": { createdAt: "2019-11-15T00:00:00", removed: false, uid: "5ddc6bd0-627b-42da-a603-d62adab55efe", url: "https://i.ibb.co/c1Tc0Pp/house-1876063-960-720.jpg" }, tenants: [{}, {}, {}, {}], localGroups: [{}, {}] }
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
    token: '',
    userLogin: {}
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
          this.setState({ load: true })
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
      {token ?
        <View>
          {userLogin.appartament ?
            <View>
              {load ? this.HomeData()
                :
                <View>
                  <Image source={require('../../../image/brick_texture1.jpg')} style={im}></Image>
                  <ActivityIndicator style={indicator} size={50} color={brown} />
                </View>
              }
            </View>
            : this.Login('Вас еще не утвердили в доме')}
        </View>
        : this.Login('Чтобы видеть на этом экране информацию по вашему дому войдите или зарегистрируйтесь!')}

    </View>
    );
  }
  private Login(text: string) {
    const { indicator, button2, buttonContainer, buttonTitle, im } = globalStyles
    const { navigation } = this.props
    const { h2 } = locStyles
    return <View>
      <Image source={require('../../../image/brick_texture1.jpg')} style={im}></Image>
      <View style={indicator}>
        {/* <Button title='Обновить' onPress={() => {
        this.componentDidMount(); this.render();
      }}></Button> */}
        <Card containerStyle={{ paddingBottom: 20, borderRadius: 10 }} >
          <Image source={require('../../../icon/warning-shield.png')}
            style={{ alignSelf: 'center' }} />
          <Text style={h2}>{text}</Text>
          <View style={button2}>
            <TouchableOpacity
              onPress={() => navigation.navigate(AUTH)}>
              <View style={buttonContainer}>
                <Text style={buttonTitle}>Войти</Text>
              </View>
            </TouchableOpacity>
            <View style={{ width: 20 }}></View>
            <TouchableOpacity
              onPress={() => navigation.navigate(REGISTRATION)}>
              <View style={buttonContainer}>
                <Text style={buttonTitle}>Зарегистрироваться</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </View>
  }
  private HomeData() {
    const { userLogin } = store.state;
    const { navigation } = this.props
    const { images, h1 } = globalStyles
    const { status, h3, sectionContainer, sectionTitle, container,
      sectionContainer1, sectionTitle1, } = locStyles
    const { data } = this.state
    const { imageUrl, city, street, homeNumber, appartaments, floors, porches, fk_Status,
      yearCommissioning, tenants, localGroups } = data
    return <ScrollView>
      <Image source={{ uri: imageUrl.url }} style={images} />
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

      <Text style={h3}>Кол-во квартир: {appartaments} </Text>
      <Text style={h3}>Кол-во этажей: {floors} </Text>
      <Text style={h3}>Кол-во подъездов: {porches} </Text>
      <Text style={h3}>Год ввода в эксплуатацию: {yearCommissioning} </Text>
      <View style={{ margin: 55 }}><Text> </Text></View>
    </ScrollView>
  }
  private onAddTenant() {

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
})

export default (HomeScreen)

