import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert,
  ActivityIndicator, Image
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { home, homeLoc,  } from '../../allSvg'
import { Header, globalStyles, HomeCard } from '..';
import { h, w, appColor, serverUrl, Background, disColor } from '../../constants'
import { adrText, adrBool, addressColor, AuthData, HomeData } from '../../interfaces'
import { actions, store } from '../../store'
import { AUTH, HOMEProfile, NAVIGATIONAdmin, NAVIGATIONUser } from '../../Navigations/routes';
import { CityList, VladimirStreetList } from './Lists'
import { Card, Input, CheckBox, Icon } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown';
import { Home } from '../../interfaces'
import { Role } from '../../enum/Enums';
import { List, TextInput, Provider, Portal, Modal } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
// import { Autocomplete, Layout, AutocompleteOption, ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

var arrTxt: adrText = { city: '', street: '', homeN: '', appartament: '', home: '' };
var arr: adrBool = { city: false, street: false, homeN: false, appartament: false, home: false };
var arrColor: adrText = { city: appColor, street: appColor, homeN: appColor, appartament: appColor, home: appColor };

interface Props { }
interface State {
  appartament: string,
  city: string,
  street: string,
  homeN: string,
  good: boolean,
  submit: boolean,
  badEnter: adrBool,
  errorText: adrText,
  colorIcon: adrText,
  search: boolean,
  searchText: string,
  dataHome: Home[],
  dataOld: Home[],
  loadHome: boolean,
  checked: boolean[],
  fk_home: string,
  disBtn: boolean,
  colorField: addressColor,
  latitude: number,
  longitude: number,
  errorMsg: string,
  address: string
  load: boolean,
  loadError: boolean,
  refreshing: boolean,

}
const initAddressColor: addressColor = {
  homeN: appColor,
  appartament: appColor,
  button: disColor
};

class AddressScreen extends PureComponent<any, State, Props> {
  state = {
    city: '', street: '', homeN: '', appartament: '', disBtn: true, address: '', 
    good: true, submit: false, badEnter: arr, errorText: arrTxt, colorIcon: arrColor,
    search: false, searchText: '', dataHome: [], dataOld: [], loadHome: false, checked: [], fk_home: '',
    colorField: initAddressColor, latitude: 0, longitude: 0, errorMsg: '', load: false, loadError: false, refreshing: false
  } as State

  async componentDidMount() {
    const propsData = this.props.route.params.propsData
    if (propsData !== undefined) {
      const { city, street, homeNumber, uid } = propsData
      this.setState({ city, street, homeN: homeNumber, fk_home: uid })
    }
    var { userLogin, token } = store.state;
    if (token != '') {
      console.log('userLogin: ', userLogin)
      const { appartament, fk_Home } = userLogin
      this.setState({ appartament, fk_home: fk_Home })
      var logAction = 'Профиль дома';
      try {
        const response = await fetch(serverUrl + 'home?Fk_Home=' + fk_Home,
          { headers: { 'Authorization': `Bearer ${token}` } })
        const data: HomeData = await response.json()
        if (response.status == 200) {
          this.setState({
            city: data.homeData.city, street: data.homeData.street, 
            homeN: data.homeData.homeNumber, load: true    })
          console.log('Успех fetch ' + logAction, data.homeData)
        }
        else if (response.status == 404) {
          console.log('Внимание', 'Дом не найден uid=' + fk_Home);
          this.setState({ loadError: true })
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
    Geolocation.getCurrentPosition((position: any) => {
      console.log(position);
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude )
      //   .then((response) => response.json())
      //       .then((responseJson) => {
      //         this.setState({address: JSON.stringify(responseJson)});
      // })
      //Geocoder.init('AIzaSyCJybXjiXDmOad2vmbeJQQH15yO_YH19gg', { language: "ru" });
      //   Geocoder.from(position.coords.latitude, position.coords.longitude).then((json: any) => {
      //     console.log(json);

      //     var addressComponent = json.results[0].address_components;
      //     console.log(addressComponent);
      //     this.setState({
      //       address: addressComponent
      //     });

      //     console.log(addressComponent);
      //   }).catch((error: any) => console.warn(error));

      // }, (error) => {
      //   // См. таблицы кодов ошибок выше.
      //   this.setState({ errorMsg: error.message });
      //   console.log(error.code, error.message);
      // }, {
      //   enableHighAccuracy: false,
      //   timeout: 10000,
      //   maximumAge: 100000
    });


    // // И пример использования
    // Geocoder.from(41.89, 12.49).then((json: any) => {
    //   var addressComponent = json.results[0].address_components[0];
    //   console.log(addressComponent);

    // }).catch((error: string) => {
    //   console.warn(error)
    // });
  }

  render() {
    console.log('Props AddresScreen', this.props)
    const { appartament, city, street, homeN, badEnter, errorText, colorIcon, submit,
      loadHome, dataHome, search, checked, disBtn, colorField, address, latitude, longitude, } = this.state
    const { navigation } = this.props
    const { fixToText, icon, textInput, input, button, buttonContainer, buttonTitle,
      notFoundStyle, containerList } = locStyles
    const { im, indicator, label, label2, label3, cardStyle, inputMultiline, dropdownStyle,
      contStyle, error, inputPaperWhite, inputStyle, } = globalStyles
    var uid;
    const CloseIcon = (style: any) => (
      <Icon {...style} name='close' />
    );
    return (
      <View>
        <Header title={'Адрес проживания'}
          leftIcon={'arrow-left'}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View>
          {Background}
        </View>
        <ScrollView >
          <Card containerStyle={cardStyle} >
            <View>
              {/* <Text> {errorMsg ? Error : errorMsg} </Text> */}
              {/* <Text> {latitude + " " + longitude} </Text>
              <Text> {address} </Text> */}
              <View style={[fixToText,{marginTop: 10}]}>
                <List.Icon icon="home-city" style={[icon, { margin: 0 }]} color={colorIcon.city} />
                <View style={textInput}>

                  <Text style={label2}> Город *</Text>
                  <Dropdown
                    data={CityList}
                    onChangeText={this.onChangeCity.bind(this)}
                    value={city}
                    containerStyle={contStyle}
                    pickerStyle={[dropdownStyle, inputMultiline]}
                    dropdownPosition={0}
                    disabled={submit}
                  />
                  {badEnter.city && <Text style={error}>{errorText.city}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <SvgXml xml={homeLoc} style={icon} fill={colorIcon.street} />
                <View style={textInput}>
                  <Text style={label2}> Улица *</Text>
                  <Dropdown
                    data={VladimirStreetList}
                    onChangeText={this.onChangeStreet.bind(this)}
                    value={street}
                    containerStyle={contStyle}
                    pickerStyle={[dropdownStyle, inputMultiline]}
                    dropdownPosition={0}
                    disabled={submit}
                  />
                  {badEnter.street && <Text style={error}>{errorText.street}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <SvgXml xml={home} style={icon} fill={colorIcon.homeN} />
                <View style={textInput}>
                  <Text style={label}> Номер дома *</Text>
                  <TextInput
                    style={[inputPaperWhite, inputStyle, { height: 40 }]}
                    onChangeText={this.onChangeHomeN.bind(this)}
                    // placeholder='Номер дома'
                    value={homeN}
                    keyboardType='visible-password'
                    disabled={submit}
                    theme={{ colors: { primary: colorField.homeN } }}
                  />
                  {badEnter.homeN && <Text style={error}>{errorText.homeN}</Text>}
                </View>
              </View>

              <View style={fixToText}>
                <List.Icon icon="door" style={[icon, { margin: 0 }]} color={appColor} />
                <View style={textInput}>
                  <Text style={label}> Квартира <Text style={{ color: 'red' }}>*</Text></Text>
                  <TextInput
                    style={[inputPaperWhite, inputStyle, { height: 40 }]}
                    onChangeText={this.onChangeappartament.bind(this)}
                    // placeholder='Кваритира'
                    value={appartament}
                    onEndEditing={() => this.onCheckappartament(appartament)}
                    keyboardType='number-pad'
                    disabled={submit}
                    theme={{ colors: { primary: colorField.appartament } }}
                  />
                  {badEnter.appartament && <Text style={error}>{errorText.appartament}</Text>}
                </View>
              </View>
            </View>
            {search && (
              loadHome ? (
                dataHome.length ? (
                  <View >
                    <View style={label3}>
                      <Text style={notFoundStyle}> Выберите свой дом: <Text style={{ color: 'red' }}>*</Text></Text>
                      {badEnter.home && <Text style={[error, { marginHorizontal: 20, marginBottom: 5 }]}>{errorText.home}</Text>}
                    </View>
                    {dataHome.map((item, id: number) => {
                      return <View>
                        <HomeCard data={item} key={item.uid}
                          onPress={() => navigation.navigate(HOMEProfile, (item))}
                          disabled={submit}
                        />
                        <CheckBox //title='Выбрать дом'
                          checked={checked[id]}
                          onPress={() => {
                            badEnter.home = false;
                            checked[id] = !checked[id];
                            !checked[id] ? uid = '' : uid = item.uid;
                            this.setState({ checked, fk_home: uid, badEnter })
                          }}
                          checkedColor='green'
                          right
                          containerStyle={{ marginTop: -50, marginLeft: -50, height: 40 }}
                        />
                      </View>
                    })}
                  </View>
                ) :
                  <View style={{ alignItems: 'center' }} >
                    <Card containerStyle={cardStyle}>
                      <Text style={notFoundStyle}> По заданным параметрам ничего не найдено! </Text>
                      {badEnter.home && <Text style={[error, { marginHorizontal: 20, marginBottom: 5 }]}>{errorText.home}</Text>}
                    </Card>
                    <Image source={require('../../../icon/notFound.png')} />
                  </View>
              ) :
                <ActivityIndicator style={indicator} size={50} color={appColor} />
            )}

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                onPress={this.onSubmit.bind(this)}
                disabled={disBtn} >
                <View style={[buttonContainer, button, { backgroundColor: !disBtn ? appColor : 'gray' }]}>
                  <Text style={buttonTitle}>Подтверить</Text>
                </View>
              </TouchableOpacity>
            </View>

          </Card>
          <View style={{ margin: 50 }}><Text> </Text></View>
        </ScrollView>
        {submit && <Provider>
          <Portal>
            <Modal visible={submit} >
              <ActivityIndicator style={indicator} size={70} color={appColor} />
            </Modal>
          </Portal>
        </Provider>}

      </View>
    );
  }

  private async onSearchHome() {
    var { city, street, homeN } = this.state
    var obj = {
      City: city,
      Street: street,
      HomeNumber: homeN,
    }
    var logAction = 'Изменение адреса пользователя'
    var $this = this;

    var { token, userLogin } = store.state
    this.setState({ loadHome: false })
    try {
      fetch(serverUrl + 'home/search', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Accept': "application/json",
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(obj), //JSON.stringify(
      })
        .then(function (response) {
          var dataHome = response.json()
          console.log('Успех fetch home search', dataHome)
          return dataHome;
        })
        .then(function (dataHome) {
          $this.setState({ dataHome, loadHome: true })
        })
        .catch(error => {
          console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
          if (error == 'TypeError: Network request failed') {
            Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);
            this.setState({ loadHome: false })
          }
          else {
            Alert.alert('Внимание', 'Ошибка сервера: ' + error, [{ text: 'OK' }]);
            this.setState({ loadHome: false })
          }
          return
        });

    } catch (e) {
      throw e
    }
  }

  private checkFields() {
    // const { appartament, city, street, homeN, badEnter } = this.state
    // if ((appartament || city || street || homeN) && !badEnter.appartament && !badEnter.city
    //   && !badEnter.street && !badEnter.homeN && !badEnter.home) {
    this.setState({ disBtn: false })
    // }
    // else
    // this.setState({ disBtn: true })
  }
  private clearInput() {
    this.setState({ city: '' });
  };
  private onChangeCity(city: string) {
    var { badEnter, errorText, colorIcon } = this.state
    if (city == ' ') { return }
    if (!city) {
      badEnter.city = true;
      colorIcon.city = 'red'
      errorText.city = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, city, good: false });
      return;
    }
    else {
      //CityList.filter(item => item.value.toLowerCase().includes(city.toLowerCase()));
      badEnter.city = false;
      colorIcon.city = 'green'
      this.setState({ city, badEnter, search: true });
      this.onSearchHome();
      this.checkFields();
    }
  }
  // private onSelectCity(city: AutocompleteOption) {
  //   var { badEnter, colorIcon } = this.state
  //   badEnter.city = false;
  //   colorIcon.city = 'green'
  //   this.setState({ city: city.title, badEnter, search: true });
  //   this.onSearchHome();
  //   this.checkFields();
  // }
  private onChangeStreet(street: string) {
    var { badEnter, errorText, colorIcon } = this.state
    if (street == ' ') { return }
    // if (!street) {
    //   badEnter.street = true;
    //   colorIcon.street = 'red'
    //   errorText.street = 'Поле не заполнено!'
    //   this.setState({ badEnter, errorText, street, good: false });
    //   return;
    // }
    else {
      badEnter.street = false;
      colorIcon.street = 'green'
      this.setState({ street, colorIcon, search: true });
      this.onSearchHome();
      this.checkFields();
    }
  }
  private onChangeHomeN(homeN: string) {
    var { badEnter, errorText, colorIcon } = this.state
    if (homeN == ' ') { return }
    // if (!homeN) {
    //   badEnter.homeN = true;
    //   colorIcon.homeN = 'red'
    //   errorText.homeN = 'Поле не заполнено!'
    //   this.setState({ badEnter, errorText, homeN, good: false });
    //   return;
    // }
    else {
      badEnter.homeN = false;
      colorIcon.homeN = 'green'
      this.setState({ homeN, search: true });
      this.onSearchHome();
      this.checkFields();
    }
  }
  private onChangeappartament(appartament: string) {
    var { badEnter, errorText, colorIcon } = this.state
    if (appartament == ' ') { return }
    if (!appartament) {
      badEnter.appartament = true;
      errorText.appartament = 'Поле не заполнено!'
      colorIcon.appartament = 'red'
      this.setState({ badEnter, errorText, appartament, good: false });
      return;
    }
    else {
      badEnter.appartament = false;
      colorIcon.appartament = 'green'
      const propsData = this.props.route.params.propsData
      this.setState({ appartament, colorIcon });
      this.checkFields();
    }
  }
  private onCheckappartament(appartament: string) {
    var { badEnter, errorText, colorIcon } = this.state
    if (+appartament > 1000) {
      badEnter.appartament = true;
      errorText.appartament = 'Квартира не может быть больше 1000!'
      colorIcon.appartament = 'red'
      this.setState({ badEnter, errorText, appartament, good: false });
      return;
    }
  }

  private onSubmit() {
    const { appartament, city, street, homeN, badEnter, errorText,
      colorIcon, fk_home } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, logAction: string;

    if (!city && !street && !homeN) {
      badEnter.city = true;
      errorText.city = 'Заполните хотябы одно поле для поиска по: городу, улице или номеру дома'
      colorIcon.city = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }

    if (!appartament) {
      badEnter.appartament = true;
      errorText.appartament = 'Поле обязательно!'
      colorIcon.appartament = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!fk_home) {
      badEnter.home = true;
      errorText.home = 'Выберите дом! Для этого заполните поля для поиска по: городу, улице или номеру дома'
      colorIcon.home = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }

    if (badEnter.appartament || badEnter.city || badEnter.street || badEnter.homeN || badEnter.home) {
      this.setState({ good: false });
      Alert.alert('Внимание', 'Заполните поля правильно!',
        [{ text: 'OK' }]);
      return;
    }
    else this.setState({ good: true });

    var { token, userLogin } = store.state
    var back = this.props.route.params

    var address = 'г. ' + city + ', ' + street + ', д. ' + homeN
    obj = {
      Fk_User: userLogin.uid,
      Fk_Home: fk_home,
      appartament: appartament,
      Address: address + ', кв. ' + appartament,
    }
    var reload = true
    url = serverUrl + 'auth/address';
    logAction = 'Изменение адреса дома'

    this.setState({ submit: true })
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(obj),
    })
      .then(function (response) {
        if (response.status == 200 || response.status == 201) {
          console.log('Успех ' + logAction + ' Post статус: ' + response.status + ' ok: ' + response.ok);
          console.log(response);
          if (!back) {
            Alert.alert('Данные сохранены!', 'Пожалуйста, войдите в систему используя свой логин и пароль',
              [{ text: 'OK' }]);
          }
          return response.json();
        }
        else if (response.status == 500) {
          console.log('Server Error', "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', 'Ошибка сервера!',
            [{ text: 'OK' }]);
        }
        else if (response.status == 400) {
          console.log('Bad Request', "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', 'Логин или пароль не верны!',
            [{ text: 'OK' }]);
        }
        else {
          console.log(response.statusText, "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', response.statusText + " Status: " + response.status + ' ' + response,
            [{ text: 'OK' }]);
        }
        $this.setState({ submit: false });
        return
      })
      .then(function (data: AuthData) {
        console.log('data: ', data);
        $this.setClearState();
        actions.Login(token, data.userLogin)
        if (back) {
          if (data.userLogin.fk_Role == Role.admin) {
            navigation.navigate(NAVIGATIONAdmin, reload);
          }
          else if (data.userLogin.fk_Role == Role.moderator) {
            navigation.navigate(NAVIGATIONAdmin, reload);
          }
          else if (data.userLogin.fk_Role == Role.user) {
            navigation.navigate(NAVIGATIONUser, reload);
          };
        }
        else {
          navigation.navigate(AUTH, data.userLogin);
        }
      })
      .catch(error => {
        console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
        if (error == 'TypeError: Network request failed') {
          Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);
          $this.setState({ submit: false })
        }
        else {
          Alert.alert('Внимание', 'Ошибка входа: ' + error, [{ text: 'OK' }]);
          $this.setState({ submit: false })
        }
        return
      });
  }
  private setClearState() {
    var arrColor: adrText = {
      city: appColor,
      street: appColor,
      homeN: appColor,
      appartament: appColor,
      home: ''
    };
    var arr: adrBool = {
      city: false,
      street: false,
      homeN: false,
      appartament: false,
      home: false
    };
    this.setState({
      appartament: '', city: '', street: '', homeN: '', good: true, submit: false,
      badEnter: arr, errorText: arrTxt, colorIcon: arrColor,
      search: false, searchText: '', dataHome: [], dataOld: [], loadHome: false,
    })
  }
}

const locStyles = StyleSheet.create({
  body: {
    backgroundColor: '#d9d9d9',
    height: h,
  },
  im: {
    position: 'absolute',
    height: h,
    width: w
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: 20
  },
  textInput: {
    width: w * 0.8,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    height: 40,
    backgroundColor: 'white'
  },
  inputAutoC: {
    maxHeight: 40
  },
  plus: {
    position: "absolute",
    left: 15,
    top: 10,
  },
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: w * 0.9,
    paddingHorizontal: 8,
  },
  fixToText: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    width: 250,
  },
  buttonContainer: {
    backgroundColor: appColor,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  buttonTitle: {
    fontSize: 18,
    color: '#fff',
  },
  error: {
    marginTop: 5,
    color: 'red',
    marginBottom: -10
  },
  paddingBottom: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    width: 200,
    bottom: 100,
  },
  container: {
    flex: 1
  },
  wrapper: {
    paddingVertical: 5,
    marginHorizontal: 20,
    backgroundColor: '#1A2854',
    borderRadius: 10
  },
  menuFirstOption: {
    height: 45,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 5,
    height: 38,
    borderBottomWidth: 1
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  notFoundStyle: {
    paddingTop: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerList: {
    minHeight: 100,
  },
})

export { AddressScreen };