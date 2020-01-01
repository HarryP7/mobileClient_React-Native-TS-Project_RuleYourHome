import React, { Component } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, Alert,
  ActivityIndicator, Picker, Image
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { user, homeLoc, lock, lockRep, shield } from '../../allSvg'
import { Header, globalStyles } from '..';
import { h, w, brown, serverUrl } from '../../constants'
import { backArrow } from '../../allSvg'
import { User, arrText, arrBool } from '../../interfaces'
import { actions } from '../../store'
import { ADDRESSScreen } from '../../routes';
import { Icon, Card } from 'react-native-elements'

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
  login: brown,
  email: brown,
  name: brown,
  surname: brown,
  password: brown,
  repeatPassword: brown
};

class RegistrationScreen extends Component<any, State, Props> {
  state = {
    login: '', email: '', name: '', surname: '',
    password: '', repeatPassword: '', color: brown,
    good: true, passGood: false, submit: false, disBtn: true,
    badEnter: arr, errorText: arrTxt, colorIcon: arrColor,
  }

  render() {
    console.log('Props RegistrationScreen', this.props)
    const { login, email, name, surname, password, color, repeatPassword,
      badEnter, errorText, colorIcon, passGood, submit, good, disBtn } = this.state
    const { navigation } = this.props
    const { fixToText, icon, textInput, input, button, buttonContainer, buttonTitle, indicator,
      link, error, paddingBottom } = locStyles
    const { im, cardStyle } = globalStyles
    console.log('login: ' + login + ' city: ' + name + ' surname: ' + surname)
    console.log('badEnter.login: ' + badEnter.login + ' badEnter.name: ' + badEnter.name +
      ' badEnter.surname: ' + badEnter.surname + ' badEnter.password: ' + badEnter.password)
    console.log('good', good)
    return (
      <View style={{ height: h }}>
        <Header title={'Регистрация'}
          leftIcon={backArrow}
          onPressLeft={() => {
            //this.setClearState()
            navigation.goBack();
          }}
        />

        <View >
          <Image source={require('../../../image/brick_texture1.jpg')} style={im}></Image></View>
        <ScrollView>
          <Card containerStyle={cardStyle} >
            {submit && <ActivityIndicator style={indicator} size={70} color="#92582D" />}
            <View>
              <View style={fixToText}>
                <SvgXml xml={user} style={icon} fill={color} />
                <View style={textInput}>
                  <TextInput
                    style={input}
                    onChangeText={this.onChangeLogin.bind(this)}
                    placeholder='Логин'
                    autoCompleteType='name'
                    value={login}
                    onEndEditing={() => this.onCheckLogin(login)}
                    editable={!submit}
                  />
                  {badEnter.login && <Text style={error}>{errorText.login}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <Icon name="email" size={40} style={icon}
                  containerStyle={{ marginLeft: -2, marginRight: 8 }}
                  color={brown}></Icon>
                <View style={textInput}>
                  <TextInput
                    style={input}
                    onChangeText={this.onChangeEmail.bind(this)}
                    placeholder='Email'
                    autoCompleteType='email'
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    value={email}
                    onEndEditing={() => this.onCheckEmail(email)}
                    editable={!submit}
                  />
                  {badEnter.email && <Text style={error}>{errorText.email}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <SvgXml xml={user} style={icon} fill={color} />
                <View style={textInput}>
                  <TextInput
                    style={input}
                    onChangeText={this.onChangeName.bind(this)}
                    placeholder='Имя'
                    value={name}
                    onEndEditing={() => this.onCheckName(name)}
                    editable={!submit}
                  />
                  {badEnter.name && <Text style={error}>{errorText.name}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <SvgXml xml={user} style={icon} fill={color} />
                <View style={textInput}>
                  <TextInput
                    style={input}
                    onChangeText={this.onChangeSurname.bind(this)}
                    placeholder='Фамилия'
                    value={surname}
                    onEndEditing={() => this.onCheckSurname(surname)}
                    editable={!submit}
                  />
                  {badEnter.surname && <Text style={error}>{errorText.surname}</Text>}
                </View>
              </View>
              <View style={fixToText}>
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
                  />
                  {badEnter.password && <Text style={error}>{errorText.password}</Text>}
                </View>
              </View>
              <View style={fixToText}>
                <SvgXml xml={passGood ? shield : lockRep} style={icon}
                  fill={colorIcon.repeatPassword} />
                <View style={textInput}>
                  <TextInput
                    style={input}
                    onChangeText={this.onChangeRepeatPassword.bind(this)}
                    placeholder='Повторите пароль'
                    autoCompleteType={'password'}
                    textContentType={'password'}
                    secureTextEntry={true}
                    value={repeatPassword}
                    onEndEditing={() => this.onCheckRep(repeatPassword)}
                    editable={!submit}
                  />
                  {badEnter.repeatPassword && <Text style={error}>{errorText.repeatPassword}</Text>}
                </View>
              </View>
            </View>
          </Card>

          <View>
            <View style={{ alignItems: 'center' }}>
              <View style={button}>
                <TouchableOpacity
                  onPress={this.onSubmit.bind(this)}
                  disabled={disBtn} >
                  <View style={buttonContainer}>
                    <Text style={buttonTitle}>Подтверить и создать</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ margin: 50 }}><Text> </Text></View>
        </ScrollView>
      </View>
    );
  }


  private checkFields() {
    const { login, email, name, surname, password, repeatPassword, badEnter } = this.state
    if (login && email && name && surname && password && repeatPassword && !badEnter.login &&
      !badEnter.email && !badEnter.name && !badEnter.surname && !badEnter.password &&
      !badEnter.repeatPassword) {
      this.setState({ disBtn: false })
    }
  }

  private onChangeLogin(login: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    if (login == ' ') { return }
    if (!login) {
      badEnter.login = true;
      errorText.login = 'Поле не заполнено'
      this.setState({ badEnter, errorText, login, good: false, disBtn: true });
      return;
    }
    else {
      badEnter.login = false;
      this.setState({ login, badEnter });
      this.checkFields()
    }
  }
  private onCheckLogin(login: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    if (login.trim().length < 4 || login.trim().length > 20) {
      badEnter.login = true;
      errorText.login = 'Логин должен быть длиной от 4 до 20 символов'
      this.setState({ badEnter, errorText, login, good: false, disBtn: true });
      return;
    }
    else {
      badEnter.login = false;
      this.setState({ login: login.trim(), badEnter });
    }
  }
  private onChangeEmail(email: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    if (email == ' ') { return }
    if (!email) {
      badEnter.email = true;
      errorText.email = 'Поле не заполнено'
      this.setState({ badEnter, errorText, email, good: false, disBtn: true });
      return;
    }
    else {
      badEnter.email = false;
      this.setState({ email, badEnter });
      this.checkFields()
    }
  }
  private onCheckEmail(email: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email.trim()) == false) {
      badEnter.email = true;
      errorText.email = 'Введите корректный e-mail'
      this.setState({ badEnter, errorText, email, good: false, disBtn: true });
      return;
    }
    else {
      badEnter.email = false;
      this.setState({ email: email.trim(), badEnter });
      this.checkFields()
    }
  }
  private onChangeName(name: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    if (name == ' ') { return }
    if (!name) {
      badEnter.name = true;
      errorText.name = 'Поле не заполнено'
      this.setState({ badEnter, errorText, name, good: false, disBtn: true });
      return;
    }
    else {
      badEnter.name = false;
      this.setState({ name, badEnter });
      this.checkFields()
    }
  }
  private onCheckName(name: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    if (name.trim().length < 2 || name.trim().length > 25) {
      badEnter.name = true;
      errorText.name = 'Имя должно быть больше 1 символа и меньше 25'
      this.setState({ badEnter, errorText, name, good: false, disBtn: true });
      return;
    }
    else {
      this.setState({ name: name.trim() });
    }
  }
  private onChangeSurname(surname: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    if (surname == ' ') { return }
    if (!surname) {
      badEnter.surname = true;
      errorText.surname = 'Поле не заполнено'
      this.setState({ badEnter, errorText, surname, good: false, disBtn: true });
      return;
    }
    else {
      badEnter.surname = false;
      this.setState({ surname});
      this.checkFields()
    }
  }
  private onCheckSurname(surname: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    var colorIcon = this.state.colorIcon
    if (surname.trim().length < 2 || surname.trim().length > 25) {
      badEnter.surname = true;
      errorText.surname = 'Фамилия должна быть больше 1 символа и меньше 25'
      this.setState({ badEnter, errorText, surname, good: false, disBtn: true });
      return;
    }
    else {
      badEnter.surname = false;
      colorIcon.surname = 'green'
      this.setState({ surname: surname.trim(), badEnter, colorIcon });
    }
  }
  private onChangePassword(password: string) {
    var badEnter = this.state.badEnter
    var colorIcon = this.state.colorIcon
    var errorText = this.state.errorText
    if (password == ' ') { return }
    if (password.trim().length >= 8) {
      badEnter.password = false
      colorIcon.password = 'green'
      this.setState({ colorIcon, badPass: false });
      var repPass = this.state.repeatPassword;
      if (repPass && repPass != password) {
        badEnter.repeatPassword = true;
        errorText.repeatPassword = 'Пароли не совпадают'
        colorIcon.repeatPassword = 'red'
        this.setState({ badEnter, errorText, colorIcon, passGood: false, good: false, disBtn: true });
      }
    }
    this.setState({ password: password.trim() });
    this.checkFields()
  }
  private onCheckPass(pass: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    var colorIcon = this.state.colorIcon
    if (pass.trim().length < 8) {
      badEnter.password = true;
      errorText.password = 'Пароль должен иметь длину не менее 8 знаков'
      colorIcon.password = 'red'
      this.setState({ badEnter, errorText, colorIcon, pass, good: false, disBtn: true });
      return;
    }
  }
  private onChangeRepeatPassword(repeatPassword: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    var colorIcon = this.state.colorIcon
    var pass = this.state.password;
    if (repeatPassword == ' ') { return }
    if (pass.trim().length == repeatPassword.trim().length && pass === repeatPassword) {
      badEnter.repeatPassword = false;
      badEnter.password = false;
      colorIcon.repeatPassword = 'green'
      this.setState({ badEnter, colorIcon, passGood: true });
    }
    else if (pass.trim().length == repeatPassword.trim().length) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Пароли не совпадают'
      colorIcon.repeatPassword = 'red'
      this.setState({ badEnter, errorText, colorIcon, passGood: false, good: false, disBtn: true });
    }
    else {
      badEnter.repeatPassword = false;
      this.setState({ badEnter });
      this.checkFields()
    }
    this.setState({ repeatPassword: repeatPassword.trim() });
  }
  private onCheckRep(repeatPassword: string) {
    var badEnter = this.state.badEnter
    var errorText = this.state.errorText
    var colorIcon = this.state.colorIcon
    var pass = this.state.password;
    if (pass !== repeatPassword) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Пароли не совпадают'
      colorIcon.repeatPassword = 'red'
      this.setState({ badEnter, errorText, colorIcon, passGood: false, disBtn: true });
    }
  }

  private onSubmit() {
    const { login, email, name, surname, password, repeatPassword, badEnter, errorText,
      colorIcon, good } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string;

    if (!login) {
      badEnter.login = true;
      errorText.login = 'Поле не заполнено'
      colorIcon.login = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!email) {
      badEnter.email = true;
      errorText.email = 'Поле не заполнено'
      colorIcon.email = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!name) {
      badEnter.name = true;
      errorText.name = 'Поле не заполнено'
      colorIcon.name = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!surname) {
      badEnter.surname = true;
      errorText.surname = 'Поле не заполнено'
      colorIcon.surname = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!password) {
      badEnter.password = true;
      errorText.password = 'Поле не заполнено'
      colorIcon.password = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!repeatPassword) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Поле не заполнено'
      colorIcon.repeatPassword = 'red'
      this.setState({ badEnter, errorText, colorIcon, good: false });
    }
    if (!login || !email || !name || !surname || !password || !repeatPassword) {
      Alert.alert('Внимание', 'Не все поля заполнены',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      this.setState({disBtn: true});
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
      colorIcon.repeatPassword = 'red'
      this.setState({ badEnter, errorText, colorIcon, passGood: false, good: false })
      return;
    }
    else this.setState({ passGood: true })
    obj = {
      Login: login,
      Email: email,
      FullName: name + ' ' + surname,
      Password: password,
      Role: 2
    }
    url = serverUrl+'auth/signup/';
    log = 'Регистрации'
    debugger

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
        return
      })
      .then(function (data: AuthData) {
        $this.setClearState();
        actions.Login(data.token, data.userLogin)
        const back = false;
        navigation.navigate(ADDRESSScreen, (back));
      })
      .catch(error => {
        console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
        if (error == 'TypeError: Network request failed') {
          Alert.alert('Внимание', 'Сервер не доступен: ' + error, [{ text: 'OK' }]);
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
    var arrCol: arrText = {
      login: brown,
      email: brown,
      name: brown,
      surname: brown,
      password: brown,
      repeatPassword: brown
    };
    this.setState({
      login: '', name: '', surname: '',
      password: '', repeatPassword: '', color: brown,
      good: true, passGood: false, submit: false,
      badEnter: arr, colorIcon: arrColor,
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

export { RegistrationScreen };