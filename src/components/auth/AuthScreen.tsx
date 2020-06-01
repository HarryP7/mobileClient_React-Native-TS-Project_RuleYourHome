import React, { PureComponent } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert,
  ActivityIndicator,
} from 'react-native';
import { Header, globalStyles } from '..';
import { h, w, appColor, serverUrl, Background, disColor } from '../../constants'
import { backArrow } from '../../allSvg'
import { User, AuthData, initAuthBool, initAuthTxt, authBool, authText, authColor } from '../../interfaces'
import { actions, store } from '../../store'
import { NAVIGATIONAdmin, NAVIGATIONUser, REGISTRATION } from '../../Navigations/routes';
import { Card, Input, Icon } from 'react-native-elements'
import { Role } from '../../enum/Enums';
import { TextInput, Modal, Portal, Button, Provider, Title } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


interface Props { }
interface State { }
const initAuthColor: authColor = {
  login: appColor,
  password: '#bbb',
  button: disColor
};
class AuthScreen extends PureComponent<any, State, Props> {
  state = {
    login: '', password: '', passwordActive: false, countPassword: 0, good: true,
    submit: false, disBtn: true, refreshing: false, badEnter: initAuthBool,
    errorText: initAuthTxt, colorField: initAuthColor, visibility: false

  }

  componentDidMount = async () => {
    console.log('Props AuthScreen', this.props)
    var user: User = this.props.route.params
    if (user) this.setState({ login: user.login })
  }

  render() {
    const { login, password, passwordActive, countPassword, colorField, submit, disBtn, visibility } = this.state
    const { navigation } = this.props
    const { fixToText, sectionTitle, textInput, input, button, buttonContainer, buttonTitle, cardStyle } = locStyles
    const { indicator, buttonContentSp, inputStyle, link, inputPaperWhite, countStyle, sub } = globalStyles
    return (
      <View style={{ height: h }}>
        <Header title={'Вход'}
          position='center' />
        <View>{Background}</View>

        <Card containerStyle={cardStyle} >
          <Title style={sectionTitle}>Управляй своим домом🏡</Title>
          <View style={fixToText}>
            <View style={textInput}>
              <TextInput
                style={[inputPaperWhite, inputStyle]}
                onChangeText={this.onChangeLogin.bind(this)}
                placeholder='Введите..'
                label='Логин'
                autoCompleteType='name'
                value={login}
                disabled={submit}
                theme={{ colors: { primary: colorField.login } }}
              // right={
              //   <MaterialCommunityIcons name={visibility ? 'eye' : 'eye-off'} 
              //   onPress={this.onVisibilityPassword.bind(this)}
              //   color={visibility ? 'black': 'grey' } size={25} />
              // }
              // render={()  =>
              //   <MaterialCommunityIcons name={visibility ? 'eye' : 'eye-off'} 
              //   onPress={this.onVisibilityPassword.bind(this)}
              //   color={visibility ? 'black': 'grey' } size={25}
              //   style={{position: 'absolute', top: 30, right: 5}}/> 
              // }
              />
              {/* {badEnter.login && <Text style={error}>{errorText.login}</Text>} */}
            </View>
          </View>

          <View style={fixToText}>
            <View style={textInput}>
              <TextInput
                style={[inputPaperWhite, inputStyle]}
                onChangeText={this.onChangePassword.bind(this)}
                onTouchStart={this.activePass.bind(this)}
                placeholder='Введите..'
                label='Пароль'
                autoCompleteType='password'
                textContentType='password'
                onEndEditing={this.onEndPass.bind(this)}
                keyboardType={visibility ? 'visible-password' : 'twitter'}
                secureTextEntry={!visibility}
                value={password}
                disabled={submit}
                theme={{ colors: { primary: colorField.login } }}
              />
              <MaterialCommunityIcons name={visibility ? 'eye' : 'eye-off'}
                onPress={this.onVisibilityPassword.bind(this)}
                color={visibility ? 'black' : 'grey'} size={25}
                style={{ position: 'absolute', top: 30, right: 5 }} />
              {passwordActive && <Text style={countStyle}>{countPassword}/8</Text>}
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
            <View style={button}>
              <Button
                mode="contained"
                uppercase={false}
                onPress={this.onSubmit.bind(this)}
                disabled={disBtn}
                contentStyle={buttonContentSp}
                style={[buttonContainer, { backgroundColor: colorField.button }]}
                labelStyle={buttonTitle}>
                Войти
              </Button>
            </View>
          </View>

          {/* <View style={[sub,{alignSelf: 'center'}]}>
              <Text style={[link, { color: 'grey' }]}>{'Забыли пароль?'}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('FindAccountScreen')}
                disabled={submit} >
                <Text style={[link, { marginLeft: 15 }]}>{'Восстановить'}</Text>
              </TouchableOpacity>
            </View> */}

          <TouchableOpacity
            onPress={() => navigation.navigate('FindAccountScreen')}
            disabled={submit} >
            <Text style={link}>{'Забыли пароль?'}</Text>
          </TouchableOpacity>

          <Text style={[link, { color: 'grey' }]}>{'У вас еще нет аккаунта?'}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(REGISTRATION)}
            disabled={submit} >
            <Text style={[link, { marginTop: -15 }]}>{'Зарегистрироваться'}</Text>
          </TouchableOpacity>
        </Card>

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
  private checkFields(good: boolean) {
    const { login, password, badEnter, colorField } = this.state
    if (good && login && password && !badEnter.login && !badEnter.password) {
      colorField.button = appColor;
      this.setState({ disBtn: false, colorField })
    }
    else {
      colorField.button = disColor;
      this.setState({ disBtn: true, colorField })
    }
  }

  private onChangeLogin(login: string) {
    var { badEnter, errorText, colorField } = this.state
    if (login == ' ') { return }
    if (!login) {
      badEnter.login = true;
      colorField.login = 'red'
      this.setState({ badEnter, errorText, login });
      return;
    }
    else {
      badEnter.login = false;
      colorField.login = appColor
      this.setState({ login });
    }
    this.checkFields(true);
  }

  private onChangePassword(password: string) {
    if (password == ' ') { return }
    if (password.trim().length >= 8) {
      this.setState({ password: password.trim() });
      this.checkFields(true);
    }
    else {
      this.setState({ password: password.trim() });
      this.checkFields(false);
    }
    this.setState({ countPassword: password.trim().length })
  }
  private activePass() {
    // var { passwordActive } = this.state
    // colorField.password = appColor
    this.setState({ passwordActive: true });
  }
  private onEndPass() {
    // var { colorField } = this.state
    // colorField.password = disColor
    // this.setState({ passwordActive: false });
  }
  private onVisibilityPassword() {
    var { visibility } = this.state
    this.setState({ visibility: !visibility })
  }

  private onSubmit() {
    const { login, password, badEnter, errorText, colorField, good } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string;

    if (!login) {
      badEnter.login = true;
      errorText.login = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, colorField, good: false });
    }
    if (!password) {
      badEnter.password = true;
      errorText.password = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, colorField, good: false });
    }
    // if (password.trim().length < 8) {
    //   badEnter.password = true;
    //   errorText.password = 'Пароль должен иметь длину не менее 8 знаков!'
    //   colorField.password = 'red'
    //   this.setState({ badEnter, errorText, colorField, good: false });
    // }

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

    console.log('login: ' + login)
    console.log('badEnter.login: ' + badEnter.login + ' badEnter.password: ' + badEnter.password)
    console.log('good', good)
    obj = {
      Login: login,
      Password: password,
    }
    url = serverUrl + 'auth/signin';
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
        $this.setState({ submit: false, disBtn: false });
        return
      })
      .then(function (data: AuthData) {
        if (data) {
          if (!store.state.token) {
            actions.Login(data.token, data.userLogin)
          }
          if (data.userLogin.fk_Role == Role.admin) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'NAVIGATIONAdmin' }],
            });
          }
          if (data.userLogin.fk_Role == Role.moderator) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'NAVIGATIONAdmin' }],
            });
          }
          else if (data.userLogin.fk_Role == Role.user) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'NAVIGATIONUser' }],
            });
          }
        }
      })
      .catch(error => {
        console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
        if (error == 'TypeError: Network request failed') {
          Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);
        }
        else {
          Alert.alert('Внимание', 'Ошибка входа: ' + error, [{ text: 'OK' }]);
        }
        $this.setState({ submit: false, disBtn: false })
        return
      });

  }
  private setClearState() {
    var arr: authBool = {
      login: false,
      password: false,
    };
    var arrCol: authText = {
      login: appColor,
      password: appColor,
    };
    this.setState({
      login: '', password: '', color: appColor,
      good: true, passGood: false, submit: false,
      badEnter: arr, colorField: arrCol,
    })
  }
}

const locStyles = StyleSheet.create({
  cardStyle: {
    borderRadius: 0,
    margin: 0,
    paddingTop: h * 0.18,
    paddingBottom: h * 0.25,
  },
  sectionTitle: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Regular2',    
    paddingBottom: 25,
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  textInput: {
    width: w * 0.75,
  },
  input: {
    borderBottomWidth: 1,
    padding: 5,
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
    width: w * 0.75,
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
  paddingBottom: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
  },
})

export { AuthScreen };