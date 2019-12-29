import React, { PureComponent, useState, useEffect } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, Alert,
  ActivityIndicator, Picker, SafeAreaView, Image
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { user, home, homeLoc, write } from '../../allSvg'
import { Header, globalStyles } from '..';
import { h, w, brown } from '../../constants'
import { backArrow } from '../../allSvg'
import { User, adrText, adrBool } from '../../interfaces'
import { actions } from '../../store'
import { AUTH } from '../../routes';
import { CityList, VladimirStreetList } from './Lists'
import { Icon, Card } from 'react-native-elements'
import { Dropdown, DropDownMargins } from 'react-native-material-dropdown';

interface Props { }
interface State { }
interface AuthData {
  token: string,
  userLogin: User,
}
var arrTxt: adrText = { city: '', street: '', homeN: '', appartment: '', };
var arr: adrBool = { city: false, street: false, homeN: false, appartment: false, };
var arrColor: adrText = { city: brown, street: brown, homeN: brown, appartment: brown, };

class AddressScreen extends PureComponent<any, State, Props> {
  state = {
    appartment: '', city: '', street: '', homeN: '', password: '', repeatPassword: '', color: brown,
    good: true, passGood: false, submit: false, badEnter: arr, errorText: arrTxt, colorIcon: arrColor,
  }

  UNSAFE_componentWillReceiveProps = () => { }
  UNSAFE_componentWillUpdate = () => { }

  render() {
    console.log('Props AddresScreen', this.props)
    const { appartment, city, street, homeN, color, badEnter, errorText, colorIcon, submit,
      good } = this.state
    const { navigation } = this.props
    const { fixToText, icon, textInput, input, button, buttonContainer, buttonTitle, } = locStyles
      const { body, im, indicator, label2, cardStyle, inputMultiline, dropdownStyle, contStyle, error,} = globalStyles
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
        <View style={body}>
          {submit && <ActivityIndicator style={indicator} size={70} color={brown} />}
          <Image source={require('../../../image/brick_texture1.jpg')} style={im}></Image>
          
          <Card containerStyle={cardStyle} >
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
                />
                {badEnter.street && <Text style={error}>{errorText.street}</Text>}
              </View>
            </View>
            <View style={fixToText}>
              <SvgXml xml={home} style={icon} fill={colorIcon.homeN} />
              <View style={textInput}>
                <TextInput
                  style={input}
                  onChangeText={this.onChangeHomeN.bind(this)}
                  placeholder='Номер дома'
                  value={homeN}
                  keyboardType='visible-password'
                />
                {badEnter.homeN && <Text style={error}>{errorText.homeN}</Text>}
              </View>
            </View>

            <View style={fixToText}>
              <SvgXml xml={write} style={icon} fill={colorIcon.appartment} />
              <View style={textInput}>
                <TextInput
                  style={input}
                  onChangeText={this.onChangeAppartment.bind(this)}
                  placeholder='Кваритира'
                  value={appartment}
                  onEndEditing={() => this.onCheckAppartment(appartment)}
                  keyboardType='number-pad'
                />
                {badEnter.appartment && <Text style={error}>{errorText.appartment}</Text>}
              </View>
            </View>
          </View>
          </Card>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={this.onSubmit.bind(this)}
              disabled={submit} >
              <View style={[buttonContainer, button]}>
                <Text style={buttonTitle}>Подтверить</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ margin: 50 }}><Text> </Text></View>
        </View>
      </View>
    );
  }

  private onChangeCity(city: string) {
    var {badEnter, errorText, colorIcon} = this.state
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
      this.setState({ city, badEnter });
    }
  }
  private onChangeStreet(street: string) {
    var {badEnter, errorText, colorIcon} = this.state
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
      this.setState({ street, colorIcon });
    }
  }
  private onChangeHomeN(homeN: string) {
    var {badEnter, errorText, colorIcon} = this.state
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
      this.setState({ homeN });
    }
  }
  private onChangeAppartment(appartment: string) {
    var {badEnter, errorText, colorIcon} = this.state
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
    var {badEnter, errorText, colorIcon} = this.state
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
      colorIcon, good } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string;

    if (!city) {
      badEnter.city = true;
      errorText.city = 'Поле не заполнено!'
      colorIcon.city = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!street) {
      badEnter.street = true;
      errorText.street = 'Поле не заполнено!'
      colorIcon.street = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!homeN) {
      badEnter.homeN = true;
      errorText.homeN = 'Поле не заполнено!'
      colorIcon.homeN = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!appartment) {
      badEnter.appartment = true;
      errorText.appartment = 'Поле не заполнено!'
      colorIcon.appartment = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }

    if (badEnter.appartment || badEnter.city || badEnter.street || badEnter.homeN) {
      this.setState({ good: false }); 
      Alert.alert('Внимание', 'Заполните поля правильно!',
        [{ text: 'OK' }]);

      return;
    }
    else this.setState({ good: true });
//Address: city + ' ' + street+ ' ' +homeN+' ' +appartment,
    var Fk_Home = '94fa3436-0f41-4ae8-89ae-571682b1b304'

    var {token,userLogin} = this.props.navigation.state.params
    url = 'http://192.168.43.80:5000/api/auth/address?Uid='+userLogin.uid+'&Fk_Home='+Fk_Home;//userLogin.fk_Home;
    log = 'Адрес дома'

    debugger;
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
            console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
            console.log(response);
            Alert.alert('Данные сохранены!', 'Пожалуйста, войдите в систему используя свой логин и пароль',
              [{ text: 'OK' }]);
            return response.json();
          }
          else if (response.status == 500) {
            console.log('Server Error', "Status: " + response.status + ' ' + response)
            Alert.alert('Внимание', 'Ошибка сервера!',
              [{ text: 'OK' }]);
          }
          else if(response.status == 400) {
            console.log('Bad Request', "Status: " + response.status + ' ' + response)
            Alert.alert('Внимание', 'Логин или пароль не верны!',
              [{ text: 'OK' }]);
          } 
          else {
            console.log(response.statusText, "Status: " + response.status + ' ' + response)
            Alert.alert('Внимание', response.statusText+ " Status: " + response.status + ' ' + response,
              [{ text: 'OK' }]);
          } 
          $this.setState({submit: false});
          return          
        })
        .then(function (data: AuthData) {
          console.log('data: ', data);    
          $this.setClearState();
          navigation.navigate(AUTH, data.userLogin);

        })
        .catch(error => {
          console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
          Alert.alert('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error, [{ text: 'OK' }]);
          $this.setState({submit: false});
          return
        });
  }
  private setClearState() {
    var arrColor: adrText = {
      city: brown,
      street: brown,
      homeN: brown,
      appartment: brown,
    };
    var arr: adrBool = {
      city: false,
      street: false,
      homeN: false,
      appartment: false,
    };
    this.setState({
      appartment: '', city: '', street: '', homeN: '',
      password: '', repeatPassword: '', color: brown,
      signup: false, good: true, passGood: false, submit: false,
      badEnter: arr, colorIcon: arrColor,
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
  link: {
    marginVertical: 20,
    color: '#92582D',
    textAlign: 'center',
    fontSize: 20,
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
})

export { AddressScreen };