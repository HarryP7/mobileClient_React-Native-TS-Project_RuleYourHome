import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Alert, ActivityIndicator
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { user, homeLoc, lock, lockRep, shield } from '../../allSvg'
import { Header, globalStyles } from '..';
import { h, w, appColor, serverUrl, Background, disColor, BackgroundWhite } from '../../constants'
import { User, arrText, arrBool, arrColor } from '../../interfaces'
import { actions } from '../../store'
import { ADDRESSScreen } from '../../Navigations/routes';
import { Icon, Card, Input } from 'react-native-elements'
import { TextInput, Modal, Portal, Button, Provider, HelperText } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  password: appColor,
  repeatPassword: appColor,
  button: disColor
};
var initActive = {login: false, name: false, password: false, repeatPassword: false}
var initCount = {login: 0, name: 0, password: 0, repeatPassword: 0}
const red = "red"

class RegistrationScreen extends Component<any, State, Props> {
  state = {
    login: '', email: '', name: '', password: '', repeatPassword: '', width: 1,
    visibility: false, visibilityRep: false, passwordActive: false, countPass: 0,
    passGood: false, submit: false, disBtn: true, refreshing: false,
    badEnter: initArrBool, errorText: initArrTxt, colorField: initArrColor,
    active: initActive, count: initCount
  }

  componentDidMount = () => {
    console.log('Props RegistrationScreen', this.props.route.params)
  }
  render() {
    const { login, email, name, password, repeatPassword, visibility,
      badEnter, errorText, colorField, passGood, count, active, submit, 
      disBtn, passwordActive, countPass } = this.state
    const { navigation } = this.props
    const { fixToText, icon, textInput, input, button, buttonContainer, buttonTitle, indicator,
      link, error, paddingBottom } = locStyles
    const { cardStyle,  inputStyle, inputPaper, buttonContentSp, inputPaperWhite, countStyle } = globalStyles
    return (
      <View >
        <Header title={'Регистрация'}
          leftIcon={'arrow-left'}
          position='center'
          onPressLeft={() => {
            navigation.pop();
          }}
        />
          {Background}
        <ScrollView >
          <Card containerStyle={cardStyle} >
            <View style={fixToText}>
              <SvgXml xml={user} style={[icon,{marginTop:15}]} fill={colorField.login} />
              <View style={textInput}>
                <TextInput
                  style={[inputPaperWhite,inputStyle]}
                  onChangeText={this.onChangeLogin.bind(this)}
                  onTouchStart={this.activeLogin.bind(this)}
                  // placeholder='Введите..'
                  label='Логин'
                  autoCompleteType='username'
                  dense={true}
                  value={login}
                  onEndEditing={() => this.onCheckLogin(login)}
                  disabled={submit}
                  theme={{ colors: { primary: colorField.login, error: red } }}
                  error={badEnter.login}
                />
                {active.login && <Text style={[countStyle, {color: colorField.login}]}>{count.login}/20</Text>}
                {badEnter.login && <HelperText type="error" visible={badEnter.login} style={{marginBottom: -10, fontSize: 14, color: red}} >
                  {errorText.login} 
                  </HelperText> }
                {/* {badEnter.login && <Text style={error}>{errorText.login}</Text>} */}
              </View>
            </View>
            <View style={fixToText}>
              <Icon name="email" size={40} style={icon}
                containerStyle={{ marginTop: 25, marginRight: 5}}
                color={colorField.email}></Icon>
              <View style={textInput}>
                <TextInput
                  // mode='outlined'
                  style={[inputPaperWhite, inputStyle]}
                  onChangeText={this.onChangeEmail.bind(this)}
                  // placeholder='Введите..'
                  label='Email'
                  autoCompleteType='email'
                  textContentType='emailAddress'
                  keyboardType='email-address'
                  value={email}
                  onEndEditing={() => this.onCheckEmail(email)}
                  disabled={submit}
                  theme={{ colors: { primary: colorField.email, error: red } }}
                  error={badEnter.email}
                />
                {badEnter.email && <HelperText type="error" visible={badEnter.email} style={{marginBottom: -10, fontSize: 14, color: red}} >
                  {errorText.email} 
                  </HelperText> }
                {/* {badEnter.email && <Text style={error}>{errorText.email}</Text>} */}
              </View>
            </View>
            <View style={fixToText}>
              <SvgXml xml={user} style={icon} fill={colorField.name} />
              <View style={textInput}>
                <TextInput
                  style={[inputPaperWhite,inputStyle]}
                  onChangeText={this.onChangeName.bind(this)}
                  onTouchStart={this.activeName.bind(this)}
                  // placeholder='Введите..'
                  label='ФИО'
                  autoCompleteType='name'
                  value={name}
                  onEndEditing={() => this.onCheckName(name)}
                  disabled={submit}
                  theme={{ colors: { primary: colorField.name, error: red } }}
                  error={badEnter.name}
                />                
                {active.name && <Text style={[countStyle, {color: colorField.name}]}>{count.name}/50</Text>}
                {badEnter.name && 
                <HelperText type="error" visible={badEnter.name} style={{marginBottom: -10, fontSize: 14, color: red}} >
                  {errorText.name} 
                  </HelperText> }
                {/* {badEnter.name && <Text style={error}>{errorText.name}</Text>} */}
              </View>
            </View>
            <View style={fixToText}>
              <SvgXml xml={lock} style={icon} fill={colorField.password} />
              <View style={textInput}>
                <TextInput
                  // mode='outlined'
                  style={[inputPaperWhite,inputStyle]}
                  onChangeText={this.onChangePassword.bind(this)}
                  onTouchStart={this.activePass.bind(this)}
                  // placeholder='Введите..'
                  label='Пароль'
                  // placeholderTextColor='#666'
                  autoCompleteType='password'
                  textContentType='password'
                  secureTextEntry={!visibility}
                  value={password}
                  onEndEditing={() => this.onCheckPass(password)}
                  disabled={submit}
                  theme={{ colors: { primary: colorField.password, error: red } }}
                  // rightIcon={visibility ? <Icon name='visibility' onPress={this.onVisibility.bind(this)} />
                  //   : <Icon name='visibility-off' onPress={this.onVisibility.bind(this)} color='grey' />}
                  error={badEnter.password}
                />                
                {active.password && <Text style={[countStyle, {color: colorField.password}]}>{count.password}/8</Text>}
                <MaterialCommunityIcons name={visibility ? 'eye' : 'eye-off'} 
                  onPress={this.onVisibility.bind(this)}
                  color={visibility ? 'black': 'grey' } size={25}
                  style={{position: 'absolute', top: 30, right: 0, }}/> 
                {badEnter.password ? 
                  <HelperText type="error" visible={badEnter.password} style={{marginBottom: -10, fontSize: 14, color: red}} >
                    {errorText.password} 
                  </HelperText> :
                    !badEnter.password && errorText.infoPassword.length != 0 &&
                  <HelperText type="info" visible={!badEnter.password} style={{  color: '#666', fontSize:14 }}>{errorText.infoPassword}</HelperText>}
              </View>
            </View>
            <View style={fixToText}>
              <SvgXml xml={passGood ? shield : lockRep} style={icon}
                fill={colorField.repeatPassword} />
              <View style={textInput}>
                <TextInput
                  // mode='outlined'
                  style={[inputPaperWhite,inputStyle]}
                  onChangeText={this.onChangeRepeatPassword.bind(this)}
                  onTouchStart={this.activeRepPass.bind(this)}
                  // placeholder='Введите..'
                  label='Повторите пароль'
                  autoCompleteType={'password'}
                  textContentType={'password'}
                  secureTextEntry={!visibility}
                  value={repeatPassword}
                  onEndEditing={() => this.onCheckRep(repeatPassword)}
                  disabled={submit}
                  theme={{ colors: { primary: colorField.repeatPassword, error: red } }}
                  error={badEnter.repeatPassword}
                />                
                {active.repeatPassword && <Text style={[countStyle, {color: colorField.repeatPassword}]}>{count.repeatPassword}/8</Text>}
                {badEnter.repeatPassword && 
                  <HelperText type="error" visible={badEnter.repeatPassword} style={{marginBottom: -10, fontSize: 14, color: red}} >
                    {errorText.repeatPassword} 
                  </HelperText> }
                {/* {badEnter.repeatPassword && <Text style={error}>{errorText.repeatPassword}</Text>} */}
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
    var { badEnter, errorText, colorField, count } = this.state
    if (login == ' ') { return }
    var reg = /^([A-Za-z0-9_\-\.])+$/;
    if (reg.test(login.trim()) == false) {
      badEnter.login = true;
      errorText.login = 'Логин должен состоять только из латинских букв'
      colorField.login = red
      this.setState({ badEnter, errorText, login, disBtn: true });
    }
    else if (login.trim().length > 20) {
      badEnter.login = true;
      errorText.login = 'Логин должен быть меньше 20 символов'
      colorField.login = red
      this.setState({ badEnter, errorText, login, colorField, disBtn: true });
    }
    else {
      badEnter.login = false;
      colorField.login = appColor
      this.setState({ login, badEnter, colorField });
      this.checkFields()
    }
    count.login = login.trim().length
    this.setState({count})
  }
  private onCheckLogin(login: string) {
    var { badEnter, errorText, colorField } = this.state
    if (login.trim().length < 4 || login.trim().length > 20) {
      badEnter.login = true;
      errorText.login = 'Логин должен быть длиной от 4 до 20 символов'
      colorField.login = red
      this.setState({ badEnter, errorText, login, colorField, disBtn: true });
      return;
    }
    var reg = /^([A-Za-z0-9_\-\.])+$/;
    if (reg.test(login.trim()) == false) {
      badEnter.login = true;
      errorText.login = 'login должен состоять из латинских букв'
      colorField.login = red
      this.setState({ badEnter, errorText, login, disBtn: true });
      return;
    }
  }
  private onChangeEmail(email: string) {
    var { badEnter, errorText, colorField } = this.state
    if (email == ' ') { return }
    if (!email) {
      badEnter.email = true;
      errorText.email = 'Поле не заполнено'
      colorField.email = red
      this.setState({ badEnter, errorText, colorField, email, disBtn: true });
      return;
    }
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email.trim()) == false) {
      badEnter.email = true;
      errorText.email = 'Введите корректный e-mail'
      colorField.email = red
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
    if (email.trim() == '') {
      badEnter.email = true;
      errorText.email = 'Введите корректный e-mail'
      colorField.email = red
      this.setState({ badEnter, errorText,  disBtn: true });
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
    var { badEnter, errorText, colorField, count } = this.state
    if (name == ' ') { return }
    else if (name.trim().length > 50) {
      badEnter.name = true;
      colorField.name = red
      errorText.name = 'ФИО должно быть больше 1 символа и меньше 50'
      this.setState({ badEnter, errorText, name, disBtn: true, colorField });
    }
    else {
      badEnter.name = false;
      colorField.name = appColor
      this.setState({ name, badEnter, colorField });
      this.checkFields()
    }
    count.name = name.trim().length
    this.setState({count})
  }
  private onCheckName(name: string) {
    var { badEnter, errorText, colorField } = this.state
    if (name.trim().length < 2 || name.trim().length > 25) {
      badEnter.name = true;
      colorField.name = red
      errorText.name = 'ФИО должно быть больше 1 символа и меньше 50'
      this.setState({ badEnter, errorText, name, disBtn: true, colorField });
      return;
    }
  }
  private activeLogin() {
    var { active } = this.state
    active.login = true
    this.setState({  active });
  }
  private activeName() {
    var { active } = this.state
    active.name = true
    this.setState({  active });
  }
  private activePass() {
    var { colorField, errorText, badEnter, active } = this.state
    active.password = true
    badEnter.password = false;
    errorText.infoPassword = 'Придумайте пароль от 8 символов с обязательной комбинацией цифр и латинских букв'
    this.setState({ colorField, errorText, badEnter, active });
  }
  private activeRepPass() {
    var { active } = this.state
    active.repeatPassword = true
    this.setState({  active });
  }
  private onChangePassword(password: string) {
    var { badEnter, errorText, colorField, count } = this.state
    if (password == ' ') { return }
    if (password.trim().length >= 8) {
      badEnter.password = false
      colorField.password = appColor
      this.setState({ colorField, badPass: false });
      var repPass = this.state.repeatPassword;
      if (repPass && repPass != password) {
        badEnter.password = true;
        errorText.password = 'Пароли не совпадают'
        colorField.password = red
        this.setState({ badEnter, errorText, colorField, passGood: false, disBtn: true });
      }
    }
    else {
      colorField.password = red
    }
    count.password = password.trim().length
    this.setState({ password: password.trim(), colorField, count });
    this.checkFields()
  }
  private onCheckPass(pass: string) {
    var { badEnter, errorText, colorField } = this.state
    if (pass.trim().length < 8) {
      badEnter.password = true;
      errorText.password = 'Пароль должен иметь длину не менее 8 знаков'
      colorField.password = red
      this.setState({ badEnter, errorText, colorField, pass, disBtn: true });
      return;
    }
    var { colorField, errorText } = this.state
    errorText.infoPassword = ''
    this.setState({ colorField, width: 1 });
  }
  private onChangeRepeatPassword(repeatPassword: string) {
    var { badEnter, errorText, colorField, count } = this.state
    var pass = this.state.password;
    if (repeatPassword == ' ') { return }
    if (pass.trim().length == repeatPassword.trim().length && pass == repeatPassword) {
      badEnter.repeatPassword = false;
      badEnter.password = false;
      colorField.repeatPassword = appColor
      colorField.password = appColor
      this.setState({ badEnter, colorField, passGood: true });
      this.checkFields()
    }
    else if (pass.trim().length <= repeatPassword.trim().length) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Пароли не совпадают'
      colorField.repeatPassword = red
      this.setState({ badEnter, errorText, colorField, passGood: false, disBtn: true });
    }
    else {
      colorField.repeatPassword = appColor
      badEnter.repeatPassword = false;
      this.setState({ badEnter, colorField });
      this.checkFields()
    }
    count.repeatPassword = repeatPassword.trim().length
    this.setState({ repeatPassword: repeatPassword.trim(), count });
  }
  private onCheckRep(repeatPassword: string) {
    var { badEnter, errorText, colorField } = this.state
    var pass = this.state.password;
    if (repeatPassword && pass !== repeatPassword) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Пароли не совпадают'
      colorField.repeatPassword = red
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
      colorField.login = red
      this.setState({ badEnter, errorText, colorField });
    }
    if (!email) {
      badEnter.email = true;
      errorText.email = 'Поле не заполнено'
      colorField.email = red
      this.setState({ badEnter, errorText, colorField });
    }
    if (!name) {
      badEnter.name = true;
      errorText.name = 'Поле не заполнено'
      colorField.name = red
      this.setState({ badEnter, errorText, colorField });
    }
    if (!password) {
      badEnter.password = true;
      errorText.password = 'Поле не заполнено'
      colorField.password = red
      this.setState({ badEnter, errorText, colorField });
    }
    if (!repeatPassword) {
      badEnter.repeatPassword = true;
      errorText.repeatPassword = 'Поле не заполнено'
      colorField.repeatPassword = red
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
      colorField.repeatPassword = red
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
    const propsData = this.props.route.params

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
          navigation.navigate(ADDRESSScreen, {propsData, back});
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
  cardStyle: {
    borderRadius: 0,
    margin: 0,
    paddingTop: h * 0.15,
    paddingBottom: h * 0.3,
  },
  icon: {
    marginTop: 25,
    marginRight: 5,
    width: 35,
    height: 35,
  },
  textInput: {
    width: w * 0.75,
    display: "flex"
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
    marginBottom: 5,
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
    color: red,
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