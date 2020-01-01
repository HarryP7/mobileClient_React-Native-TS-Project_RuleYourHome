import React, { Component } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity, ActivityIndicator,
  Button, Alert, Image
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { save } from '../../allSvg'
import { Header, globalStyles } from '..';//, styles 
import { Dropdown } from 'react-native-material-dropdown';
import { h, w, brown } from '../../constants'
import { HomeStatus, Role } from '../../enum/Enums'
import { backArrow } from '../../allSvg'
import { TextInput } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements'
import { CityList, VladimirStreetList } from '../auth/Lists'
import { User, adrHomeText, adrHomeBool } from '../../interfaces'
import { store } from '../../store';
//import { createStyles, makeStyles, Theme } from '@material-ui/core/locStyles';
//import {Fab} from '@material-ui/core';
//import Save from '@material-ui/icons/Save';

interface Props { }
interface State { }

var arrTxt: adrHomeText = {
  city: '', street: '', homeN: '', appartments: '',
  floors: '', porches: '', year: '', status: ''
};
var arr: adrHomeBool = {
  city: false, street: false, homeN: false, appartments: false,
  floors: false, porches: false, year: false, status: false
};
var year = new Date().getFullYear().toString();

class AddHomeScreen extends Component<any, State, Props> {
  state = {
    city: '', street: '', homeN: '', appartments: '', floors: '', porches: '',
    year: year, status: '', good: true, submit: false,
    badEnter: arr, errorText: arrTxt
  }

  render() {
    console.log('Props AddHomeScreen', this.props)
    const { submit, city, street, homeN, appartments, floors, porches, year,
      good, status, badEnter, errorText } = this.state
    const { navigation } = this.props
    const { container, fixToText, label, textInput, textInput2, iconMin,
      input, button, buttonContainer, buttonTitle} = locStyles
    var { indicator, im, imScroll, cardStyle, body, dropdownStyle, contStyle, inputMultiline, 
      error, labelDropdown, label2 } = globalStyles
    let dataStatus = [{
      value: HomeStatus.Exploited }, {
      value: HomeStatus.Emergency },];
    return (<View>
      <Header title='Добавить дом'
        leftIcon={backArrow}
        onPressLeft={() => {
          this.setClearState();
          navigation.goBack();
        }} />
      <ScrollView>          
          <Image source={require('../../../image/brick_texture1.jpg')} style={imScroll}></Image>
          {submit && <ActivityIndicator style={indicator} size={70} color={brown} />}

          <Card containerStyle={cardStyle} >
            <View>
              <View style={fixToText}>
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
                <View style={textInput}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={label}> Количество квартир <Text style={{ color: 'red' }}>*</Text></Text>
                  </View>
                  <TextInput
                    style={input}
                    onChangeText={this.onChangeNumAppart.bind(this)}
                    placeholder='Введите..'
                    value={appartments}
                    keyboardType='number-pad'
                    editable={!submit}
                  />
                  {badEnter.appartments && <Text style={error}>{errorText.appartments}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <View style={textInput}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={label}> Количество этажей <Text style={{ color: 'red' }}>*</Text></Text>
                  </View>
                  <TextInput
                    style={input}
                    onChangeText={this.onChangeFloors.bind(this)}
                    placeholder='Введите..'
                    value={floors}
                    keyboardType='number-pad'
                    editable={!submit}
                  />
                  {badEnter.floors && <Text style={error}>{errorText.floors}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <View style={textInput}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={label}> Количество подъездов <Text style={{ color: 'red' }}>*</Text></Text>
                  </View>
                  <TextInput
                    style={input}
                    onChangeText={this.onChangePorches.bind(this)}
                    placeholder='Введите..'
                    value={porches}
                    keyboardType='number-pad'
                    editable={!submit}
                  />
                  {badEnter.porches && <Text style={error}>{errorText.porches}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <View style={textInput}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={label}> Год ввода в эксплуатацию <Text style={{ color: 'red' }}>*</Text></Text>
                  </View>
                  <TextInput
                    style={input}
                    onChangeText={this.onChangeYear.bind(this)}
                    placeholder='Введите..'
                    value={year}
                    keyboardType='number-pad'
                    autoCompleteType='cc-exp-year'
                    onEndEditing={() => this.onCheckYear(year)}
                    editable={!submit}
                  />
                  {badEnter.year && <Text style={error}>{errorText.year}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <View style={textInput2}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={labelDropdown}> Статус дома <Text style={{ color: 'red' }}>*</Text></Text>
                  </View>
                  <Dropdown
                    data={dataStatus}
                    onChangeText={this.onChangeStatus.bind(this)}
                    value={status}
                    disabled={submit}
                  />
                  {badEnter.status && <Text style={error}>{errorText.status}</Text>}
                </View>
              </View>
            </View>
          </Card>

          <View style={{ alignItems: 'flex-end' }}>
            <View style={button}>
              <TouchableOpacity onPress={this.onSubmit.bind(this)} 
              disabled={submit} >
                <View style={buttonContainer}>
                  <SvgXml
                    xml={save}
                    style={iconMin} fill='#fff' />
                  <Text style={buttonTitle}>Сохранить</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ margin: 30 }}><Text> </Text></View>
      </ScrollView>
    </View>
    );
  }

  private onChangeCity(city: string) {
    var { badEnter, errorText } = this.state
    if (city == ' ') { return }
    if (!city) {
      badEnter.city = true;
      errorText.city = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, city, good: false });
      return;
    }
    else {
      badEnter.city = false;
      this.setState({ city, badEnter });
    }
  }
  private onChangeStreet(street: string) {
    var { badEnter, errorText } = this.state
    if (street == ' ') { return }
    if (!street) {
      badEnter.street = true;
      errorText.street = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, street, good: false });
      return;
    }
    else {
      badEnter.street = false;
      this.setState({ street });
    }
  }
  private onChangeHomeN(homeN: string) {
    var { badEnter, errorText } = this.state
    if (homeN == ' ') { return }
    if (!homeN) {
      badEnter.homeN = true;
      errorText.homeN = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, homeN, good: false });
      return;
    }
    else {
      badEnter.homeN = false;
      this.setState({ homeN });
    }
  }
  private onChangeNumAppart(appartments: string) {
    var { badEnter, errorText } = this.state
    if (!appartments) {
      badEnter.appartments = true;
      errorText.appartments = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, appartments, good: false });
      return;
    }
    var appart = parseInt(appartments, 10)
    if (appart != +appartments) {
      badEnter.appartments = true;
      errorText.appartments = 'Ввод только цифр!'
      this.setState({ badEnter, errorText, appartments, good: false });
      return;
    }
    if (appart < 10 || appart > 1000) {
      badEnter.appartments = true;
      errorText.appartments = 'Ограничение поля ввода: от 10 до 1000!'
      this.setState({ badEnter, errorText, appartments, good: false });
      return;
    }
    badEnter.appartments = false;
    this.setState({ appartments, badEnter, good: true });

  }
  private onChangeFloors(floors: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    if (!floors) {
      badEnter.floors = true;
      errorText.floors = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, floors, good: false });
      return;
    }
    var num = parseInt(floors, 10)
    if (num != +floors) {
      badEnter.floors = true;
      errorText.floors = 'Ввод только цифр!'
      this.setState({ badEnter, errorText, floors, good: false });
      return;
    }
    if (num < 3 || num > 50) {
      badEnter.floors = true;
      errorText.floors = 'Ограничение поля ввода: от 3 до 50!'
      this.setState({ badEnter, errorText, floors, good: false });
      return;
    }
    badEnter.floors = false;
    this.setState({ floors, badEnter, good: true });
  }
  private onChangePorches(porches: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    if (!porches) {
      badEnter.porches = true;
      errorText.porches = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, porches, good: false });
      return;
    }
    var num = parseInt(porches, 10)
    if (num != +porches) {
      badEnter.porches = true;
      errorText.porches = 'Ввод только цифр!'
      this.setState({ badEnter, errorText, porches, good: false });
      return;
    }
    if (num < 1 || num > 10) {
      badEnter.porches = true;
      errorText.porches = 'Ограничение поля ввода: от 1 до 10!'
      this.setState({ badEnter, errorText, porches, good: false });
      return;
    }
    badEnter.porches = false;
    this.setState({ porches, badEnter, good: true });
  }
  private onChangeYear(year: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    if (!year) {
      badEnter.year = true;
      errorText.year = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, year, good: false });
      return;
    }
    var num = parseInt(year, 10)
    if (num != +year) {
      badEnter.year = true;
      errorText.year = 'Ввод только цифр!'
      this.setState({ badEnter, errorText, year, good: false });
      return;
    }
    badEnter.year = false;
    this.setState({ year, badEnter, good: true });
  }
  private onCheckYear(year: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    var date = new Date().getFullYear()
    if (year.length < 4 || year.length > 4) {
      badEnter.year = true;
      errorText.year = 'Год должен иметь длину в 4 знака!'
      this.setState({ badEnter, errorText, good: false });
    }
    if (+year > date) {
      badEnter.year = true;
      errorText.year = 'Год не может быть больше текущего!'
      this.setState({ badEnter, errorText, good: false });
    }
    else if (+year < 1950) {
      badEnter.year = true;
      errorText.year = 'Год не может быть меньше 1950!'
      this.setState({ badEnter, errorText, good: false });
    }
  }
  private onChangeStatus(status: string) {
    this.setState({ status });
  }


  private onSubmit() {
    const { submit, city, street, homeN, appartments, floors, porches, year, status,
      badEnter, errorText, good } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string, check = true;
    //if (signup) {

    if (!city) {
      badEnter.city = true;
      errorText.city = 'Поле не заполнено!'
      this.setState({ badEnter, errorText });
      check = false;
    }
    if (!street) {
      badEnter.street = true;
      errorText.street = 'Поле не заполнено!'
      this.setState({ badEnter, errorText });
      check = false;
    }
    if (!homeN) {
      badEnter.homeN = true;
      errorText.homeN = 'Поле не заполнено!'
      this.setState({ badEnter, errorText });
      check = false;
    }
    if (!appartments) {
      badEnter.appartments = true;
      errorText.appartments = 'Поле не заполнено!'
      this.setState({ badEnter, errorText });
      check = false;
    }
    if (!floors) {
      badEnter.floors = true;
      errorText.floors = 'Поле не заполнено!'
      this.setState({ badEnter, errorText });
      check = false;
    }
    if (!porches) {
      badEnter.porches = true;
      errorText.porches = 'Поле не заполнено!'
      this.setState({ badEnter, errorText });
      check = false;
    }
    if (!year) {
      badEnter.year = true;
      errorText.year = 'Поле не заполнено!'
      this.setState({ badEnter, errorText });
      check = false;
    }
    if (!status) {
      badEnter.status = true;
      errorText.status = 'Статус не выбран!'
      this.setState({ badEnter, errorText });
      check = false;
    }

    if (badEnter.city || badEnter.street || badEnter.homeN, badEnter.appartments ||
      badEnter.floors || badEnter.porches || badEnter.year || badEnter.status) {
      this.setState({ good: false });
      Alert.alert('Внимание', 'Заполните поля правильно!',
        [{ text: 'OK' }]);
      return;
    }

    this.setState({ submit: true })
    const { userLogin, token } = store.state;
    
    if (userLogin.fk_Role== Role.admin) {
      obj = {
        Admin: userLogin.uid,
        City: city,
        Street: street,
        HomeNumber: homeN,
        Appartaments: appartments,
        Floors: floors,
        Porches: porches,
        Year: year,
        Status: status == HomeStatus.Exploited ? 1 : 2,
        Fk_Role: userLogin.fk_Role,
      }
      url = 'http://192.168.43.80:5000/api/home/create/';
      log = 'Добавить дом'


      fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Accept': "application/json",
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(obj), //JSON.stringify(
      })
        .then(function (response) {
          if (response.status == 200 || response.status == 201) {
            console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
            console.log(response);
            $this.setClearState();
            navigation.goBack();
          }
          else if (response.status == 500){
            console.log('Server Error', "Status: " + response.status + ' ' + response.json())
          }
          else {
            console.log(response.statusText, "Status: " + response.status + ' ' + response)
            Alert.alert('Внимание', response.statusText + " Status: " + response.status + ' ' + response,
              [{ text: 'OK' }]);
          }
        $this.setState({ submit: false });
        return
        })
        .catch(error => {
          console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
          if (error == 'TypeError: Network request failed') {
            console.log('Внимание', 'Сервер не доступен: ' + log + ' Post fetch: ' + error);
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
    else{
        Alert.alert('Внимание', 'У вас нет прав на выполнение данной операции',
          [{ text: 'OK' }]);
    }
  }
  private setClearState() {
    this.setState({      
    city: '', street: '', homeN: '', appartments: '', floors: '', porches: '',
    year: year, status: '', good: true, submit: false,
    badEnter: arr, errorText: arrTxt
    })
  }
}


const locStyles = StyleSheet.create({
  container: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    paddingVertical: 5
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 18,
  },
  textInput: {
    width: w * 0.9,
  },
  textInput2: {
    width: w * 0.85,
    //paddingHorizontal: 10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  flex: {
    margin: 120,
    textAlign: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 200,
  },
  fixToText: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginTop: 30,
    width: 160,
    marginRight: 20
  },
  label: {
    marginTop: -10,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  label2: {
    marginLeft: -8,
    marginBottom: -25,
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconMin: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  buttonContainer: {
    backgroundColor: '#15a009',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7
  },
  buttonTitle: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#fff',
  },
})
export { AddHomeScreen };