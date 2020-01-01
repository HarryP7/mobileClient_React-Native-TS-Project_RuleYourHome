import React, { PureComponent, useState, useEffect } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, Alert,
  ActivityIndicator, Image
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { user, homeLoc, lock, lockRep, shield } from '../../allSvg'
import { Header, globalStyles } from '..';
import { h, w, ColorApp, serverUrl, BackgroundImage } from '../../constants'
import { backArrow } from '../../allSvg'
import { User, arrText, arrBool } from '../../interfaces'
import { actions, store } from '../../store'
import { NAVIGATIONAdmin, NAVIGATIONUser } from '../../routes';
import { Card, Input } from 'react-native-elements'
import { Role } from '../../enum/Enums';


interface Props { }
interface State { }
interface AuthData {
  token: string,
  userLogin: User,
}
var arrTxt: arrText = {
  login: '',
  email: '',
  name: '',
  surname: '',
  password: '',
  repeatPassword: ''
};
var arr: arrBool = {
  login: false,
  email: false,
  name: false,
  surname: false,
  password: false,
  repeatPassword: false
};
var arrColor: arrText = {
  login: ColorApp,
  email: ColorApp,
  name: ColorApp,
  surname: ColorApp,
  password: ColorApp,
  repeatPassword: ColorApp
};

class AuthScreen extends PureComponent<any, State, Props> {
  state = {
    login: '', password: '', good: true, submit: false, disBtn: true,
    badEnter: arr, errorText: arrTxt, colorIcon: arrColor, 
  }

  componentDidMount = async () => {
    var user: User = this.props.navigation.state.params
    if (user) this.setState({ login: user.login })
  }

  render() {
    console.log('Props AuthScreen', this.props)
    const { login, password, badEnter, errorText, colorIcon, submit,
      good, disBtn } = this.state
    const { navigation } = this.props
    const { fixToText, icon, textInput, input, button, buttonContainer, buttonTitle } = locStyles
    const { im, cardStyle, indicator, error } = globalStyles
    console.log('login: ' + login)
    console.log('badEnter.login: ' + badEnter.login + ' badEnter.password: ' + badEnter.password)
    console.log('good', good)
    return (
      <View style={{ height: h }}>
        <Header title={'Вход'}
          leftIcon={backArrow}
          onPressLeft={() => {
            //this.setClearState()
            navigation.goBack();
          }}
        />
        <View><Image source={BackgroundImage} style={im}></Image></View>

        <Card containerStyle={cardStyle} >
          <View style={fixToText}>
            <SvgXml xml={user} style={icon} fill={colorIcon.login} />
            <View style={textInput}>
              <TextInput
                style={input}
                onChangeText={this.onChangeLogin.bind(this)}
                placeholder='Логин'
                autoCompleteType='name'
                value={login}
                onEndEditing={() => this.onCheckLogin(login)}
                editable={!submit}
                // errorMessage={badEnter.login ? errorText.login : ''}
              />
              {badEnter.login && <Text style={error}>{errorText.login}</Text>}
            </View>
          </View>

          <View style={[fixToText, {marginTop: 20,}]}>
            <SvgXml xml={lock} style={icon} fill={colorIcon.password} />
            <View style={textInput}>
              <TextInput
                style={input}
                onChangeText={this.onChangePassword.bind(this)}
                placeholder='Пароль'
                autoCompleteType='password'
                textContentType='password'
                secureTextEntry={true}
                value={password}
                onEndEditing={() => this.onCheckPass(password)}
                editable={!submit}
                //errorMessage={badEnter.password ? errorText.password : ''}
              />
              {badEnter.password && <Text style={error}>{errorText.password}</Text>}
            </View>
          </View>
        </Card>

        <View style={{ alignItems: "center" }}>
          <View style={button}>
            <TouchableOpacity
              onPress={this.onSubmit.bind(this)}
              disabled={disBtn}>
              <View style={buttonContainer}>
                <Text style={buttonTitle}>Войти</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
          {submit && <ActivityIndicator style={indicator} size={70} color="#92582D" />}
        
          {/* <TouchableOpacity
            onPress={this.onPress.bind(this)}
            disabled={submit} >
            <Text style={link}>{'Забыли пароль?'}</Text>
          </TouchableOpacity> */}
          
      </View>
    );
  }
  private checkFields() {
    const {login, password, badEnter} = this.state
    if(login && password && !badEnter.login && !badEnter.password ){
      this.setState({ disBtn: false })
    }    
  }

  private onChangeLogin(login: string) {
    var { badEnter, errorText, colorIcon } = this.state
    if (login == ' ') { return }
    if (!login) {
      badEnter.login = true;
      colorIcon.login = 'red'
      errorText.login = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, login, good: false });
      return;
    }
    else {
      badEnter.login = false;
      colorIcon.login = ColorApp
      this.setState({ login });
      this.checkFields();
    }
  }
  private onCheckLogin(login: string) {
    var { badEnter, errorText, colorIcon } = this.state
    if (login.trim().length < 4 || login.trim().length > 20) {
      badEnter.login = true;
      colorIcon.login = 'red'
      errorText.login = 'Логин должен быть длиной от 4 до 20 символов!'
      this.setState({ badEnter, errorText, login, good: false });
      return;
    }
  }

  private onChangePassword(password: string) {
    var { badEnter, errorText, colorIcon } = this.state
    if (password == ' ') { return }
    if (password.trim().length >= 8) {
      badEnter.password = false
      colorIcon.password = 'green'
      this.setState({ colorIcon, badPass: false });
      this.checkFields();
    }
    this.setState({ password });
  }
  private onCheckPass(pass: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    var colorIcon = this.state.colorIcon
    if (pass.trim().length < 8) {
      badEnter.password = true;
      errorText.password = 'Пароль должен иметь длину не менее 8 знаков!'
      colorIcon.password = 'red'
      this.setState({ badEnter, errorText, colorIcon, pass, good: false });
      return;
    }
  }

  private onSubmit() {
    const { login, password, badEnter, errorText,
      colorIcon, good } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string;

    if (!login) {
      badEnter.login = true;
      errorText.login = 'Поле не заполнено!'
      colorIcon.login = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!password) {
      badEnter.password = true;
      errorText.password = 'Поле не заполнено!'
      colorIcon.password = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (password.trim().length < 8) {
      badEnter.password = true;
      errorText.password = 'Пароль должен иметь длину не менее 8 знаков!'
      colorIcon.password = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }

    if (!login || !password) {
      Alert.alert('Внимание', 'Поля не заполнены!',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      return;
    }
    else if (badEnter.login || badEnter.password) {
      this.setState({ good: false });
      Alert.alert('Внимание', 'Заполните поля правильно!',
        [{ text: 'OK' }]);
      return;
    }
    else
      this.setState({ good: true });
    obj = {
      Login: login,
      Password: password,
    }
    url = serverUrl+'auth/signin';
    log = 'Входа'

    this.setState({ submit: true, disBtn: true })
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
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
        if (response.status == 500) {
          console.log('Server Error', "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', 'Ошибка сервера! Status: ' + response.status + ' ' + response,
            [{ text: 'OK' }]);
        }
        if (response.status == 400) {
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
        if (data) {
          if (!store.state.token) {
            actions.Login(data.token, data.userLogin)
          }
          if (data.userLogin.fk_Role == Role.admin){
            navigation.navigate(NAVIGATIONAdmin);
          }
          else{
            navigation.navigate(NAVIGATIONUser);
          }
        }
      })
      .catch(error => {
        console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
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
    var arr: arrBool = {
      login: false,
      email: false,
      name: false,
      surname: false,
      password: false,
      repeatPassword: false
    };
    var arrCol: arrText = {
      login: ColorApp,
      email: ColorApp,
      name: ColorApp,
      surname: ColorApp,
      password: ColorApp,
      repeatPassword: ColorApp
    };
    this.setState({
      login: '', password: '', color: ColorApp,
      good: true, passGood: false, submit: false,
      badEnter: arr, errorText: arrTxt, colorIcon: arrCol,
    })
  }
}

const locStyles = StyleSheet.create({
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
  },
  flex: {
    margin: 120,
    textAlign: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 200,
  },
  fixToText: {
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
  paddingBottom: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
  },
})

export { AuthScreen };