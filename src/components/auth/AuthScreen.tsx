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
import { TextInput, Modal, Portal, Button, Provider } from 'react-native-paper';


interface Props { }
interface State { }
const initAuthColor: authColor = {
  login: appColor,
  password: '#bbb',
  button: disColor
};
class AuthScreen extends PureComponent<any, State, Props> {
  state = {
    login: '', password: '', good: true, submit: false, disBtn: true, refreshing: false,
    badEnter: initAuthBool, errorText: initAuthTxt, colorField: initAuthColor, visibility: false
  
  }

  componentDidMount = async () => {
    console.log('Props AuthScreen', this.props)
    var user: User = this.props.route.params
    if (user) this.setState({ login: user.login })
  }

  render() {
    const { login, password, colorField, submit, disBtn,  visibility } = this.state
    const { navigation } = this.props
    const { fixToText, textInput, input, button, buttonContainer, buttonTitle } = locStyles
    const { cardStyle, indicator, buttonContentSp, inputStyle, link, inputPaperWhite } = globalStyles
    return (
      <View style={{ height: h }}>
        <Header title={'Вход'}
          leftIcon={'arrow-left'}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View>{Background}</View>

        <ScrollView >
          <Card containerStyle={cardStyle} >
            <View style={fixToText}>
              <View style={{width: w * 0.75}}>
                <TextInput
                  style={[inputPaperWhite,inputStyle]}
                  onChangeText={this.onChangeLogin.bind(this)}
                  placeholder='Введите..'
                  label='Логин'
                  autoCompleteType='name'
                  value={login}
                  disabled={submit}
                  theme={{ colors: { primary: colorField.login } }}
                />
                {/* {badEnter.login && <Text style={error}>{errorText.login}</Text>} */}
              </View>
            </View>

            <View style={[fixToText, { marginTop: 20, }]}>
              <View style={textInput}>
                <Input
                  inputContainerStyle={[input, { borderColor: colorField.password }]}
                  inputStyle={inputStyle}
                  onChangeText={this.onChangePassword.bind(this)}
                  onTouchStart={this.activePass.bind(this)}
                  placeholder='Пароль'
                  placeholderTextColor='#777'
                  autoCompleteType='password'
                  textContentType='password'
                  onEndEditing={this.onEndPass.bind(this)}
                  keyboardType={visibility?'visible-password':'twitter'}
                  secureTextEntry={!visibility}
                  value={password}
                  disabled={submit}
                  //onEndEditing={() => this.onCheckPass(password)}
                  //errorMessage={badEnter.password ? errorText.password : ''}
                  rightIcon={visibility ? <Icon name='visibility' onPress={this.onVisibilityPassword.bind(this)} />
                    : <Icon name='visibility-off' onPress={this.onVisibilityPassword.bind(this)} color='grey' />}
                />
                {/* {badEnter.password ? <Text style={error}>{errorText.password}</Text> : <View></View>} */}
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

          <Text style={[link, { color: 'grey' }]}>{'У вас еще нет аккаунта?'}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(REGISTRATION)}
            disabled={submit} >
            <Text style={[link, { marginTop: -20 }]}>{'Зарегистрируйтесь'}</Text>
          </TouchableOpacity>
          </Card>

        </ScrollView>
        {/* <TouchableOpacity
            onPress={this.onPress.bind(this)}
            disabled={submit} >
            <Text style={link}>{'Забыли пароль?'}</Text>
          </TouchableOpacity> */}
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
      return
    }
    else {
      this.setState({ password: password.trim() });
      this.checkFields(false);
    }
  }
  private activePass() {
    var { colorField } = this.state
    colorField.password = appColor
    this.setState({ colorField });
  }
  private onEndPass() {
    var { colorField } = this.state
    colorField.password = disColor
    this.setState({ colorField });
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
              routes: [{ name: 'NAVIGATIONAdmin'}],
            });
          }
          if (data.userLogin.fk_Role == Role.moderator) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'NAVIGATIONAdmin'}],
            });
          }
          else if (data.userLogin.fk_Role == Role.user) {
            navigation.reset({index: 0,
              routes: [{ name: 'NAVIGATIONUser'}],
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
  icon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  textInput: {
    width: w * 0.8,
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