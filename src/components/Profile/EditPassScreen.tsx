import React, { Component } from 'react';
import {
  StyleSheet, ScrollView, View, Text, Alert,
  ActivityIndicator,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { user, lock, lockRep, shield } from '../../allSvg'
import { Header, globalStyles } from '..';
import { h, w, appColor, serverUrl, Background, disColor } from '../../constants'
import { User, arrText, arrBool, arrColor } from '../../interfaces'
import { actions } from '../../store'
import { ADDRESSScreen } from '../../Navigations/routes';
import { Icon, Card, Input } from 'react-native-elements'
import { TextInput, Modal, Portal, Button, Provider } from 'react-native-paper';

interface Props { }
interface State { }
interface AuthData {
  token: string,
  userLogin: User,
}
var initArrBool: arrBool = {
  login: false,
  email: false,
  name: false,
  surname: false,
  password: false,
  repeatPassword: false
};
var initArrTxt: arrText = {
  login: '',
  email: '',
  name: '',
  password: '',
  infoPassword: '',
  repeatPassword: ''
};
var initArrColor: arrColor = {
  login: appColor,
  email: appColor,
  name: appColor,
  iconPassword: appColor,
  password: '#666',
  repeatPassword: appColor,
  button: disColor
};

class EditPassScreen extends Component<any, State, Props> {
  state = {
    login: '', email: '', name: '', password: '', repeatPassword: '', width: 1,
    visibility: false, visibilityRep: false,
    passGood: false, submit: false, disBtn: true, refreshing: false,
    badEnter: initArrBool, errorText: initArrTxt, colorField: initArrColor
  }

  componentDidMount = () => {
    console.log('Props EditPassScreen', this.props)
  }
  render() {
    const { login, email, name, password, repeatPassword, visibility,
      badEnter, errorText, colorField, passGood, submit, disBtn, width } = this.state
    const { navigation } = this.props
    const { fixToText, icon, textInput, input, button, buttonContainer, buttonTitle, indicator,
      link, error, paddingBottom } = locStyles
    const { im, cardStyle, inputStyle, inputPaper, buttonContentSp } = globalStyles
    return (
      <View style={{ height: h }}>
        <Header title={'Регистрация'}
          leftIcon={'arrow-left'}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />

        <View >
          {Background}</View>
        <ScrollView
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={this.setClearState.bind(this)} /> }
        >
          <Card containerStyle={cardStyle} >
            <View style={fixToText}>
              <SvgXml xml={user} style={icon} fill={colorField.login} />
              <View style={textInput}>
                <TextInput
                  //inputContainerStyle={input}
                  mode='outlined'
                  style={[inputPaper, inputStyle]}
                  onChangeText={this.onChangeLogin.bind(this)}
                  placeholder='Введите..'
                  label='Логин'
                  autoCompleteType='username'
                  value={login}
                  onEndEditing={() => this.onCheckLogin(login)}
                  disabled={submit}
                  theme={{ colors: { primary: colorField.login } }}
                />
                {badEnter.login && <Text style={error}>{errorText.login}</Text>}
              </View>
            </View>
            <View style={fixToText}>
              <Icon name="email" size={40} style={icon}
                containerStyle={{ marginTop: 8 }}
                color={colorField.email}></Icon>
              <View style={textInput}>
                <TextInput
                  mode='outlined'
                  style={[inputPaper, inputStyle]}
                  onChangeText={this.onChangeEmail.bind(this)}
                  placeholder='Введите..'
                  label='Email'
                  autoCompleteType='email'
                  textContentType='emailAddress'
                  keyboardType='email-address'
                  value={email}
                  onEndEditing={() => this.onCheckEmail(email)}
                  disabled={submit}
                  theme={{ colors: { primary: colorField.email } }}
                />
                {badEnter.email && <Text style={error}>{errorText.email}</Text>}
              </View>
            </View>
            <View style={fixToText}>
              <SvgXml xml={user} style={icon} fill={colorField.name} />
              <View style={textInput}>
                <TextInput
                  mode='outlined'
                  style={[inputPaper, inputStyle]}
                  onChangeText={this.onChangeName.bind(this)}
                  placeholder='Введите..'
                  label='ФИО'
                  autoCompleteType='name'
                  value={name}
                  onEndEditing={() => this.onCheckName(name)}
                  disabled={submit}
                  theme={{ colors: { primary: colorField.name } }}
                />                
                {/* <HelperText type="error" visible={badEnter.name} style={{marginBottom: -20, fontSize: 14, color: 'red'}} >
                  {errorText.name} 
                </HelperText> */}
                {badEnter.name && <Text style={error}>{errorText.name}</Text>}
              </View>
            </View>
            <View style={fixToText}>
              <SvgXml xml={lock} style={icon} fill={colorField.iconPassword} />
              <View style={textInput}>
                <Input
                  inputContainerStyle={[input, {
                    borderColor: colorField.password,
                    borderWidth: width, borderBottomWidth: width, marginLeft: -5, marginTop: 10, width: w * 0.8
                  }]}
                  inputStyle={inputStyle}
                  onChangeText={this.onChangePassword.bind(this)}
                  onTouchStart={this.activePass.bind(this)}
                  placeholder='Пароль'
                  placeholderTextColor='#666'
                  autoCompleteType='password'
                  textContentType='password'
                  secureTextEntry={!visibility}
                  value={password}
                  onEndEditing={() => this.onCheckPass(password)}
                  disabled={submit}
                  rightIcon={visibility ? <Icon name='visibility' onPress={this.onVisibility.bind(this)} />
                    : <Icon name='visibility-off' onPress={this.onVisibility.bind(this)} color='grey' />}
                />
                {badEnter.password && <Text style={error}></Text>}          
                {!badEnter.password && errorText.infoPassword.length != 0 &&
                  <Text style={[error, { color: '#666' }]}>{errorText.infoPassword}</Text>}
              </View>
            </View>
            <View style={fixToText}>
              <SvgXml xml={passGood ? shield : lockRep} style={icon}
                fill={colorField.repeatPassword} />
              <View style={textInput}>
                <TextInput
                  mode='outlined'
                  style={[inputPaper, inputStyle]}
                  onChangeText={this.onChangeRepeatPassword.bind(this)}
                  placeholder='Введите..'
                  label='Повторите пароль'
                  autoCompleteType={'password'}
                  textContentType={'password'}
                  secureTextEntry={!visibility}
                  value={repeatPassword}
                  onEndEditing={() => this.onCheckRep(repeatPassword)}
                  disabled={submit}
                  theme={{ colors: { primary: colorField.repeatPassword } }}
                />
                {badEnter.repeatPassword && <Text style={error}>{errorText.repeatPassword}</Text>}
              </View>
            </View>

            <View style={{ alignItems: 'center' }}>
              <View style={button}>
                <Button
                  mode="contained"
                  uppercase={false}
                  onPress={this.onSubmit.bind(this)}
                  disabled={disBtn}
                  contentStyle={buttonContentSp}
                  style={[buttonContainer, { backgroundColor: colorField.button }]}
                  labelStyle={buttonTitle}>
                  Продолжить
              </Button>
              </View>
            </View>

          </Card>
          <View style={{ margin: 90 }}><Text> </Text></View>
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


  private checkFields() {
    const { login, email, name, password, repeatPassword, badEnter, colorField } = this.state
    if (login && email && name && password && repeatPassword && !badEnter.login &&
      !badEnter.email && !badEnter.name && !badEnter.password &&
      !badEnter.repeatPassword) {
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
      errorText.login = 'Поле не заполнено'
      colorField.login = "red"
      this.setState({ badEnter, errorText, login, disBtn: true, colorField });
      return;
    }
    else {
      badEnter.login = false;
      colorField.login = appColor
      this.setState({ login, badEnter, colorField });
      this.checkFields()
    }
  }
  private onCheckLogin(login: string) {
    var { badEnter, errorText, colorField } = this.state
    if (login.trim().length < 4 || login.trim().length > 20) {
      badEnter.login = true;
      errorText.login = 'Логин должен быть длиной от 4 до 20 символов'
      colorField.login = "red"
      this.setState({ badEnter, errorText, login, colorField, disBtn: true });
      return;
    }
  }
  private onChangeEmail(email: string) {
    var { badEnter, errorText, colorField } = this.state
    if (email == ' ') { return }
    if (!email) {
      badEnter.email = true;
      errorText.email = 'Поле не заполнено'
      colorField.email = 'red'
      this.setState({ badEnter, errorText, colorField, email, disBtn: true });
      return;
    }
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email.trim()) == false) {
      badEnter.email = true;
      errorText.email = 'Введите корректный e-mail'
      colorField.email = 'red'
      this.setState({ badEnter, errorText, email, disBtn: true });
      return;
    }
    else {
      colorField.email = appColor
      badEnter.email = false;
      this.setState({ email, badEnter });
      this.checkFields()
    }
  }
  private onCheckEmail(email: string) {
    var { badEnter, errorText, colorField } = this.state
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email.trim()) == false) {
      badEnter.email = true;
      errorText.email = 'Введите корректный e-mail'
      colorField.email = 'red'
      this.setState({ badEnter, errorText, email, disBtn: true });
      return;
    }
    else {
      badEnter.email = false;
      colorField.email = appColor
      this.setState({ email: email.trim(), badEnter, colorField });
      this.checkFields()
    }
  }
  private onChangeName(name: string) {
    var { badEnter, errorText, colorField } = this.state
    if (name == ' ') { return }
    if (!name) {
      badEnter.name = true;
      colorField.name = 'red'
      errorText.name = 'Поле не заполнено'
      this.setState({ badEnter, errorText, name, disBtn: true, colorField });
      return;
    }
    else {
      badEnter.name = false;
      colorField.name = appColor
      this.setState({ name, badEnter, colorField });
      this.checkFields()
    }
  }
  private onCheckName(name: string) {
    var { badEnter, errorText, colorField } = this.state
    if (name.trim().length < 2 || name.trim().length > 25) {
      badEnter.name = true;
      colorField.name = 'red'
      errorText.name = 'ФИО должно быть больше 1 символа и меньше 50'
      this.setState({ badEnter, errorText, name, disBtn: true, colorField });
      return;
    }
  }
  private activePass() {
    var { colorField, errorText } = this.state
    colorField.password = appColor
    errorText.infoPassword = 'Придумайте пароль от 8 символов с обяхательной комбинацией цифр и латинских букв'
    this.setState({ colorField, errorText, width: 2 });
  }
  private onChangePassword(password: string) {
    var { badEnter, errorText, colorField } = this.state
    if (password == ' ') { return }
    if (password.trim().length >= 8) {
      badEnter.password = false
      colorField.password = appColor//'green'
      this.setState({ colorField, badPass: false });
      var repPass = this.state.repeatPassword;
      if (repPass && repPass != password) {
        badEnter.repeatPassword = true;
        errorText.repeatPassword = 'Пароли не совпадают'
        colorField.repeatPassword = 'red'
        this.setState({ badEnter, errorText, colorField, passGood: false, disBtn: true });
      }
    }
    else {
      colorField.password = appColor
    }
    this.setState({ password: password.trim(), colorField });
    this.checkFields()
  }
  private onCheckPass(pass: string) {
    var { badEnter, errorText, colorField } = this.state
    if (pass.trim().length < 8) {
      badEnter.password = true;
      errorText.password = 'Пароль должен иметь длину не менее 8 знаков'
      colorField.password = 'red'
      this.setState({ badEnter, errorText, colorField, pass, disBtn: true });
      return;
    }
    var { colorField, errorText } = this.state
    colorField.password = '#666'
    errorText.infoPassword = ''
    this.setState({ colorField, width: 1 });
  }
  private onChangeRepeatPassword(repeatPassword: string) {
    var { badEnter, errorText, colorField } = this.state
    var pass = this.state.password;
    if (repeatPassword == ' ') { return }
    if (pass.trim().length == repeatPassword.trim().length && pass === repeatPassword) {
      badEnter.repeatPassword = false;
      badEnter.password = false;
      colorField.repeatPassword = appColor//'green'
      this.setState({ badEnter, colorField, passGood: true });
    }
    else if (pass.trim().length <= repeatPassword.trim().length) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Пароли не совпадают'
      colorField.repeatPassword = 'red'
      this.setState({ badEnter, errorText, colorField, passGood: false, disBtn: true });
    }
    else {
      colorField.repeatPassword = appColor
      badEnter.repeatPassword = false;
      this.setState({ badEnter, colorField });
      this.checkFields()
    }
    this.setState({ repeatPassword: repeatPassword.trim() });
  }
  private onCheckRep(repeatPassword: string) {
    var { badEnter, errorText, colorField } = this.state
    var pass = this.state.password;
    if (pass !== repeatPassword) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Пароли не совпадают'
      colorField.repeatPassword = 'red'
      this.setState({ badEnter, errorText, colorField, passGood: false, disBtn: true });
    }
  }
  private onVisibility() {
    var { visibility } = this.state
    this.setState({ visibility: !visibility })
  }

  private onSubmit() {
    const { login, email, name, password, repeatPassword, badEnter, errorText,
      colorField } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string;

    if (!login) {
      badEnter.login = true;
      errorText.login = 'Поле не заполнено'
      colorField.login = 'red'
      this.setState({ badEnter, errorText, colorField });
    }
    if (!email) {
      badEnter.email = true;
      errorText.email = 'Поле не заполнено'
      colorField.email = 'red'
      this.setState({ badEnter, errorText, colorField });
    }
    if (!name) {
      badEnter.name = true;
      errorText.name = 'Поле не заполнено'
      colorField.name = 'red'
      this.setState({ badEnter, errorText, colorField });
    }
    if (!password) {
      badEnter.password = true;
      errorText.password = 'Поле не заполнено'
      colorField.password = 'red'
      this.setState({ badEnter, errorText, colorField });
    }
    if (!repeatPassword) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Поле не заполнено'
      colorField.repeatPassword = 'red'
      this.setState({ badEnter, errorText, colorField });
    }
    if (!login || !email || !name || !password || !repeatPassword) {
      Alert.alert('Внимание', 'Не все поля заполнены',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      this.setState({ disBtn: true });
      return;
    }

    if (badEnter.login || badEnter.name || badEnter.surname ||
      badEnter.password || badEnter.repeatPassword) {
      this.setState({ good: false }); //, isVisible: true, textOverlay: txt 
      Alert.alert('Внимание', 'Заполните поля правильно',
        [{ text: 'OK' }]);

      return;
    }
    if (password.trim().length < 8 || repeatPassword.trim().length < 8) {
      this.setState({ good: false }); //, isVisible: true, textOverlay: txt 
      Alert.alert('Внимание', 'Пароль должен иметь длину не менее 8 знаков',
        [{ text: 'OK' }]);

      return;
    }
    else this.setState({ good: true, disBtn: false });

    if (password !== repeatPassword) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Пароли не совпадают'
      colorField.repeatPassword = 'red'
      this.setState({ badEnter, errorText, colorField, passGood: false })
      return;
    }
    else this.setState({ passGood: true })
    obj = {
      Login: login,
      Email: email,
      FullName: name,
      Password: password,
      Role: 2
    }
    url = serverUrl + 'auth/signup/';
    log = 'Регистрации'

    console.log('login: ' + login + ' ФИО: ' + name + ' Email: ' + email)
    console.log('badEnter.login: ' + badEnter.login + ' badEnter.name: ' + badEnter.name +
      ' badEnter.surname: ' + badEnter.surname + ' badEnter.password: ' + badEnter.password)

    this.setState({ submit: true, disBtn: true })
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
    })
      .then(function (response) {
        if (response.status == 200 || response.status == 201) {
          console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
          console.log(response);
          Alert.alert('Вы зарегистрированы!', 'Пожалуйста, заполните дополнительную информацию по вашему адресу',
            [{ text: 'OK' }]);
          return response.json();
        }
        else if (response.status == 500) {
          console.log('Server Error', "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', 'Ошибка сервера. Status: ' + response.status + ' ' + response,
            [{ text: 'OK' }]);
        }
        else if (response.status == 400) {
          console.log('Bad Request', "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', 'Пользователь с таким логином уже существует',
            [{ text: 'OK' }]);
        }
        else {
          console.log(response.statusText, "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', response.statusText + " Status: " + response.status + ' ' + response,
            [{ text: 'OK' }]);
        }
        $this.setState({ submit: false, disBtn: false });
        return response.status
      })
      .then(function (data: AuthData) {
        console.log('data: ', data);
        if (data.token) {
          $this.setClearState();
          actions.Login(data.token, data.userLogin)
          const back = false;
          navigation.navigate(ADDRESSScreen, (back));
        }
      })
      .catch(error => {
        console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
        if (error == 'TypeError: Network request failed') {
          Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);
        }
        else {
          Alert.alert('Внимание', 'Ошибка входа. ' + error, [{ text: 'OK' }]);
        }
        $this.setState({ submit: false, disBtn: false })
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
    var arrCol: arrColor = {
      login: appColor,
      email: appColor,
      name: appColor,
      iconPassword: appColor,
      password: disColor,
      repeatPassword: appColor,
      button: disColor
    };
    this.setState({
      login: '', email: '', name: '', surname: '',
      password: '', repeatPassword: '', color: appColor,
      good: true, passGood: false, submit: false, disBtn: true,
      badEnter: arr, errorText: initArrTxt, colorField: arrCol
    })
  }
}

const locStyles = StyleSheet.create({
  icon: {
    marginTop: 10,
    width: 35,
    height: 35,
  },
  textInput: {
    width: w * 0.82,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 40,
  },
  inputMultiline: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignContent: 'flex-start',
  },
  flex: {
    margin: 120,
    textAlign: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 200,
  },
  fixToText: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    width: w * 0.9
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
  link: {
    marginVertical: 20,
    color: appColor,
    textAlign: 'center',
    fontSize: 20,
  },
  error: {
    marginTop: 5,
    color: 'red',
    marginBottom: -10
  },
  indicator: {
    marginTop: 50,
    position: 'absolute',
    alignSelf: 'center',
  },
  paddingBottom: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 50,
  },
})

export { EditPassScreen };