import React, { Component } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity, ActivityIndicator,
  Alert, Image
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { save } from '../../allSvg'
import { Header, globalStyles } from '..';//, styles 
import { Dropdown, DropDownData } from 'react-native-material-dropdown';
import { h, w, ColorApp, serverUrl, BackgroundImage } from '../../constants'
import { HomeStatus, Role } from '../../enum/Enums'
import { backArrow } from '../../allSvg'
import { TextInput } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements'
import { CityList, VladimirStreetList } from '../auth/Lists'
import { User, initAdrBool, initAdrTxt, adrHomeBool, adrHomeText } from '../../interfaces'
import { store } from '../../store';
import { HOMEProfile } from '../../routes';

interface Props { }
interface User_Op {
  label: string,
  value: string
}
interface State {
  uid: string,
  supervisor: string,
  city: string,
  street: string,
  homeN: string,
  appartments: string,
  floors: string,
  porches: string,
  year: string,
  status: string,
  good: boolean,
  submit: boolean,
  user_options: User_Op[],
  badEnter: adrHomeBool,
  errorText: adrHomeText,
  loadUser: boolean,
  
}

var year = new Date().getFullYear().toString();

class AddHomeScreen extends Component<any, State, Props> {
  state = {
    uid: '', supervisor: '', city: '', street: '', homeN: '', appartments: '', floors: '', porches: '',
    year: year, status: HomeStatus.Exploited, good: true, submit: false, user_options: [],
    badEnter: initAdrBool, errorText: initAdrTxt, loadUser: false
  } as State

  render() {
    console.log('Props AddHomeScreen', this.props)
    const { submit, supervisor, city, street, homeN, appartments, floors, porches, year,
      good, status, badEnter, errorText, user_options, loadUser } = this.state
    const { navigation } = this.props
    const { container, fixToText, label, textInput, textInput2, iconMin,
      input, button, buttonContainer, buttonTitle } = locStyles
    var { indicator, im, imScroll, cardStyle, body, dropdownStyle, contStyle, inputMultiline,
      error, labelDropdown, label2 } = globalStyles
    let dataStatus = [{
      value: HomeStatus.Exploited }, {
      value: HomeStatus.Emergency  },];
    return (<View>
      <Header title='Добавить дом'
        leftIcon={backArrow}
        onPressLeft={() => {
          this.setClearState();
          navigation.goBack();
        }} />
      <ScrollView>
        <Image source={BackgroundImage} style={imScroll}></Image>

        <Card containerStyle={cardStyle} >
        {submit && <ActivityIndicator style={[indicator,{marginTop: h/2}]} size={50} color={ColorApp} />}
          <View>
            <View style={fixToText}>
              <View style={textInput}>
                <Text style={label}> Управляющий <Text style={{ color: 'red' }}>*</Text></Text>
                <TextInput
                  style={input}
                  onChangeText={this.onChangeSupervisor.bind(this)}
                  placeholder='Введите..'
                  value={supervisor}
                  editable={!submit}
                />
                <Dropdown
                  data={user_options}
                  onChangeText={this.onChoiceSupervisor.bind(this)}
                  value={supervisor}
                  containerStyle={[contStyle, { marginTop: -63, width: 30, alignSelf: 'flex-end' }]}
                  pickerStyle={[dropdownStyle, inputMultiline, textInput, { marginLeft: -w * 0.78, height:200}]}
                  dropdownPosition={0}
                  disabled={submit}
                />
                {loadUser && <ActivityIndicator style={indicator} size={70} color={ColorApp} />}
                {badEnter.supervisor && <Text style={error}>{errorText.supervisor}</Text>}
              </View>
            </View>
            <View style={fixToText}>
              <View style={textInput}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={label2}> Город <Text style={{ color: 'red' }}>*</Text></Text>
                </View>
                <Dropdown
                  data={CityList}
                  onChangeText={this.onChangeCity.bind(this)}
                  value={city}
                  useNativeDriver
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

  private async onChangeSupervisor(supervisor: string) {
    var { badEnter, errorText } = this.state
    if (supervisor == ' ') { return }
    if (!supervisor) {
      badEnter.supervisor = true;
      errorText.supervisor = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, supervisor, good: false });
      return;
    }
    else if (supervisor.length > 2) {
      badEnter.city = false;
      this.setState({ supervisor, badEnter, loadUser: true });
      try {
        const { userLogin, token } = store.state;
        var url = serverUrl + 'profile/search?Name='+supervisor
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.status == 200) {
          const users: User[] = await response.json()
          if (users.length != 0) {
            var user_options: User_Op[] = [];
            users.forEach(el => {
              user_options.push({ value: el.uid, label: el.fullName});
            })
            console.log("Успех UsersSearch fetch: ", users)
            this.setState({ user_options, loadUser: false })
          }
        }
        if(response.status == 400){
          console.log("Пользователь не найден: ", "status: 400")
          this.setState({ loadUser: false })
        }
        else{
          console.log("Ошибка: ", "response.status: " + response.status+" "+response.statusText+" "+response.text)
          this.setState({ loadUser: false })
        }
      } catch (e) {
        throw e
      }
    }
    else {
      badEnter.city = false;
      this.setState({ supervisor, badEnter });
    }
  }
  private onChoiceSupervisor(uid: string ) {
    var { badEnter, errorText, user_options } = this.state
    console.log("dropdown", "value: "+uid)
    if (uid == ' ') { return }
    if (!uid) {
      badEnter.supervisor = true;
      errorText.supervisor = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, uid, good: false });
      return;
    }
    else {
      badEnter.city = false;
      var filtered = '';
      var filter = user_options.find(x => x.value == uid)?.label
      if(filter) filtered = filter
      this.setState({ uid, supervisor: filtered, badEnter });
    }
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
    var {badEnter, errorText} = this.state
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
    var date = new Date().getFullYear()
    if (+year > date) {
      badEnter.year = true;
      errorText.year = 'Год не может быть больше текущего!'
      this.setState({ year, badEnter, errorText, good: false });
      return;
    }
    else if (+year < 1950) {
      badEnter.year = true;
      errorText.year = 'Год не может быть меньше 1950!'
      this.setState({ year, badEnter, errorText, good: false });
      return;
    }
    badEnter.year = false;
    this.setState({ year, badEnter });
  }
  private onCheckYear(year: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    if (year.length < 4 || year.length > 4) {
      badEnter.year = true;
      errorText.year = 'Год должен иметь длину в 4 знака!'
      this.setState({ badEnter, errorText, good: false });
    }
  }
  private onChangeStatus(status: string) {
    var {badEnter, errorText} = this.state
    badEnter.status = false;
    this.setState({ status });
  }


  private onSubmit() {
    const { supervisor, city, street, homeN, appartments, floors, porches, year, status,
      badEnter, errorText, uid } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string, check = true;

      if (!supervisor) {
        badEnter.supervisor = true;
        errorText.supervisor = 'Поле не заполнено!'
        this.setState({ badEnter, errorText });
        check = false;
      }
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

    if (badEnter.supervisor || badEnter.city || badEnter.street || badEnter.homeN, badEnter.appartments ||
      badEnter.floors || badEnter.porches || badEnter.year || badEnter.status) {
      this.setState({ good: false });
      Alert.alert('Внимание', 'Заполните поля правильно!',
        [{ text: 'OK' }]);
      return;
    }

    this.setState({ submit: true })
    const { userLogin, token } = store.state;

    if (userLogin.fk_Role != Role.user) {
      obj = {
        Manager: uid,
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
      url = serverUrl + 'home/create/';
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
            return response.json();
          }
          else if (response.status == 500) {
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
        .then(function(data) {          
          navigation.navigate(HOMEProfile, (data));
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
    else {
      Alert.alert('Внимание', 'У вас нет прав на выполнение данной операции',
        [{ text: 'OK' }]);
    }
  }
  private setClearState() {
    this.setState({
      supervisor: '', city: '', street: '', homeN: '', appartments: '', floors: '', porches: '',
      year: year, status: '', good: true, submit: false,
      badEnter: initAdrBool, errorText: initAdrTxt
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