import React, { PureComponent } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, Alert,
  ActivityIndicator, Picker, SafeAreaView, Image
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { user, home, homeLoc, write, notFound } from '../../allSvg'
import { Header, globalStyles, HomeCard } from '..';
import { h, w, ColorApp, serverUrl, BackgroundImage } from '../../constants'
import { backArrow } from '../../allSvg'
import { User, adrText, adrBool } from '../../interfaces'
import { actions, store } from '../../store'
import { AUTH, HOMEProfile } from '../../routes';
import { CityList, VladimirStreetList } from './Lists'
import { Card, Input, CheckBox, Icon, ThemeConsumer } from 'react-native-elements'
import { Dropdown, DropDownMargins } from 'react-native-material-dropdown';
import { Home } from '../../interfaces'

var arrTxt: adrText = { city: '', street: '', homeN: '', appartment: '', home: '' };
var arr: adrBool = { city: false, street: false, homeN: false, appartment: false, home: false };
var arrColor: adrText = { city: ColorApp, street: ColorApp, homeN: ColorApp, appartment: ColorApp, home: ColorApp };

interface Props { }
interface State {
  appartment: string,
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
  fk_home: string
}
interface AuthData {
  token: string,
  userLogin: User,
}

class AddressScreen extends PureComponent<any, State, Props> {
  state = {
    appartment: '', city: '', street: '', homeN: '',
    good: true, submit: false, badEnter: arr, errorText: arrTxt, colorIcon: arrColor,
    search: false, searchText: '', dataHome: [], dataOld: [], loadHome: false, checked: [], fk_home: ''
  } as State

  render() {
    console.log('Props AddresScreen', this.props)
    const { appartment, city, street, homeN, badEnter, errorText, colorIcon, submit,
      good, loadHome, dataHome, search, checked }: State = this.state
    const { navigation } = this.props
    const { fixToText, icon, textInput, input, button, buttonContainer, buttonTitle, notFoundStyle, } = locStyles
    const { im, indicator, label, label2, label3, cardStyle, inputMultiline, dropdownStyle, contStyle, error,
    } = globalStyles
    console.log('good', good)
    return (
      <View>
        <Header title={'Адрес дома'}
          leftIcon={backArrow}
          onPressLeft={() => {
            //this.setClearState()
            navigation.goBack();
          }}
        />
        <View>
          <Image source={BackgroundImage} style={im}></Image>
        </View>
        <ScrollView >
          <Card containerStyle={cardStyle} >
            {submit && <ActivityIndicator style={indicator} size={70} color={ColorApp} />}
            <View>
              <View style={fixToText}>
                <SvgXml xml={homeLoc} style={icon} fill={colorIcon.city} />
                <View style={textInput}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={label2}> Город <Text style={{ color: 'red' }}>*</Text></Text>
                  </View>
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
                  <Text style={label2}> Улица <Text style={{ color: 'red' }}>*</Text></Text>
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
                  <Text style={label}> Номер дома <Text style={{ color: 'red' }}>*</Text></Text>
                  <TextInput
                    style={input}
                    onChangeText={this.onChangeHomeN.bind(this)}
                    placeholder='Номер дома'
                    value={homeN}
                    keyboardType='visible-password'
                    editable={!submit}
                  />
                  {badEnter.homeN && <Text style={error}>{errorText.homeN}</Text>}
                </View>
              </View>

              <View style={fixToText}>
                <SvgXml xml={write} style={icon} fill={colorIcon.appartment} />
                <View style={textInput}>
                  <Text style={label}> Квартира <Text style={{ color: 'red' }}>*</Text></Text>
                  <TextInput
                    style={input}
                    onChangeText={this.onChangeAppartment.bind(this)}
                    placeholder='Кваритира'
                    value={appartment}
                    onEndEditing={() => this.onCheckAppartment(appartment)}
                    keyboardType='number-pad'
                    editable={!submit}
                  />
                  {badEnter.appartment && <Text style={error}>{errorText.appartment}</Text>}
                  {badEnter.home && <Text style={[error, { marginTop: 15 }]}>{errorText.home}</Text>}
                </View>
              </View>
            </View>
          </Card>
          {search && (
            loadHome ?
              dataHome.length ?
                <View >
                  <View style={label3}>
                    <Text style={notFoundStyle}> Выберите свой дом: <Text style={{ color: 'red' }}>*</Text></Text>

                  </View>
                  {dataHome.map((item, id: number) => {
                    return <View style={{ flexDirection: 'row' }}>
                      <HomeCard data={item} key={item.uid}
                        onPress={() => navigation.navigate(HOMEProfile, (item))}
                        disabled={submit}
                      />
                      <CheckBox //title='Выбрать дом'
                        checked={checked[id]}
                        onPress={() => {
                          var { badEnter } = this.state
                          badEnter.home = false;
                          var check = checked;
                          check[id] = !check[id];
                          this.setState({ checked: check, fk_home: item.uid, badEnter })
                        }}
                        checkedColor='green'
                        right
                        containerStyle={{ marginTop: 50, marginLeft: -50, height: 40 }}

                      ></CheckBox>
                    </View>
                  })}
                </View> :
                <View style={{ alignItems: 'center' }} >
                  <Text style={notFoundStyle}> По заданным параметрам ничего не найдено! </Text>
                  <SvgXml xml={notFound} style={{ marginVertical: 10 }} />
                </View> :
              <ActivityIndicator style={indicator} size={50} color={ColorApp} />
          )
          }

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={this.onSubmit.bind(this)}
              disabled={submit} >
              <View style={[buttonContainer, button]}>
                <Text style={buttonTitle}>Подтверить</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ margin: 50 }}><Text> </Text></View>
        </ScrollView>
      </View>
    );
  }

  private async onSearchHome() {
    var { city, street, homeN } = this.state
    var obj = {
      City: city,
      Street: street,
      HomeNumber: homeN
    }
    var logAction = 'Изменение адреса дома'
    var $this = this;

    var { token, userLogin } = store.state
    this.setState({ loadHome: false })
    try {
      fetch(serverUrl+'home/search', {
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
            Alert.alert('Внимание', 'Сервер не доступен: ' + error, [{ text: 'OK' }]);
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
      badEnter.city = false;
      colorIcon.city = 'green'
      this.setState({ city, badEnter, search: true });
      this.onSearchHome();
    }
  }
  private onChangeStreet(street: string) {
    var { badEnter, errorText, colorIcon } = this.state
    if (street == ' ') { return }
    if (!street) {
      badEnter.street = true;
      colorIcon.street = 'red'
      errorText.street = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, street, good: false });
      return;
    }
    else {
      badEnter.street = false;
      colorIcon.street = 'green'
      this.setState({ street, colorIcon, search: true });
      this.onSearchHome();
    }
  }
  private onChangeHomeN(homeN: string) {
    var { badEnter, errorText, colorIcon } = this.state
    if (homeN == ' ') { return }
    if (!homeN) {
      badEnter.homeN = true;
      colorIcon.homeN = 'red'
      errorText.homeN = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, homeN, good: false });
      return;
    }
    else {
      badEnter.homeN = false;
      colorIcon.homeN = 'green'
      this.setState({ homeN, search: true });
      this.onSearchHome();
    }
  }
  private onChangeAppartment(appartment: string) {
    var { badEnter, errorText, colorIcon } = this.state
    if (appartment == ' ') { return }
    if (!appartment) {
      badEnter.appartment = true;
      errorText.appartment = 'Поле не заполнено!'
      colorIcon.appartment = 'red'
      this.setState({ badEnter, errorText, appartment, good: false });
      return;
    }
    else {
      badEnter.appartment = false;
      colorIcon.appartment = 'green'
      this.setState({ appartment, colorIcon });
    }
  }
  private onCheckAppartment(appartment: string) {
    var { badEnter, errorText, colorIcon } = this.state
    if (+appartment > 1000) {
      badEnter.appartment = true;
      errorText.appartment = 'Квартира не может быть больше 1000!'
      colorIcon.appartment = 'red'
      this.setState({ badEnter, errorText, appartment, good: false });
      return;
    }
    else {
      badEnter.appartment = false;
      colorIcon.appartment = 'green'
      this.setState({ appartment, badEnter });
    }
  }

  private onSubmit() {
    const { appartment, city, street, homeN, badEnter, errorText,
      colorIcon, fk_home } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, logAction: string;

    if (!city && !street && !homeN) {
      badEnter.city = true;
      errorText.city = 'Заполните хотябы одно поле для поиска по: Городу, улице или номеру дома'
      colorIcon.city = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }

    if (!appartment) {
      badEnter.appartment = true;
      errorText.appartment = 'Поле обязательно!'
      colorIcon.appartment = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!fk_home) {
      badEnter.home = true;
      errorText.home = 'Выберите дом! Для этого заполните поля для поиска по: Городу, улице или номеру дома'
      colorIcon.home = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }

    if (badEnter.appartment || badEnter.city || badEnter.street || badEnter.homeN || badEnter.home) {
      this.setState({ good: false });
      Alert.alert('Внимание', 'Заполните поля правильно!',
        [{ text: 'OK' }]);
      return;
    }
    else this.setState({ good: true });
    //Address: city + ' ' + street+ ' ' +homeN+' ' +appartment, 
    //this.props.navigation.state.params

    debugger;
    var { token, userLogin } = store.state
    var { back } = this.props.navigation.state.params

    url = serverUrl+'auth/address?Uid=' + userLogin.uid + '&Fk_Home=' + fk_home
      + '&Appartment=' + appartment;
    logAction = 'Изменение адреса дома'

    this.setState({ submit: true })
    fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
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
        if (back) {
          navigation.goBack();
        }
        else {
          navigation.navigate(AUTH, data.userLogin);
        }
      })
      .catch(error => {
        console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
        if (error == 'TypeError: Network request failed') {
          Alert.alert('Внимание', 'Сервер не доступен: ' + error, [{ text: 'OK' }]);
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
      city: ColorApp,
      street: ColorApp,
      homeN: ColorApp,
      appartment: ColorApp,
      home: ''
    };
    var arr: adrBool = {
      city: false,
      street: false,
      homeN: false,
      appartment: false,
      home: false
    };
    this.setState({
      appartment: '', city: '', street: '', homeN: '', good: true, submit: false,
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
    width: 35,
    height: 35,
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
    backgroundColor: '#92582D',
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
})

export { AddressScreen };