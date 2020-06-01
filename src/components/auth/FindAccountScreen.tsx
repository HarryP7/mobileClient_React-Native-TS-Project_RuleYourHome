import React, { Component } from 'react';
import {
  StyleSheet, ScrollView, View, Text, Alert, ActivityIndicator
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { user, homeLoc, lock, lockRep, shield } from '../../allSvg'
import { Header, globalStyles } from '..';
import { h, w, appColor, serverUrl, Background, disColor } from '../../constants'
import { User, arrText, arrBool, arrColor } from '../../interfaces'
import { actions } from '../../store'
import { ADDRESSScreen } from '../../Navigations/routes';
import { Icon, Card, Input } from 'react-native-elements'
import { TextInput, Modal, Portal, Button, Provider, HelperText, Caption } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props { }
interface State { }
interface AccountData {
  checkCod: string,
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
var initActive = { login: false, name: false, password: false, repeatPassword: false }
var initCount = { login: 0, name: 0, password: 0, repeatPassword: 0 }
const red = "red"

class FindAccountScreen extends Component<any, State, Props> {
  state = {
    email: '',
    visibility: false, visibilityRep: false, passwordActive: false, countPass: 0,
    passGood: false, submit: false, disBtn: true, refreshing: false,
    badEnter: initArrBool, errorText: initArrTxt, colorField: initArrColor,
    active: initActive, count: initCount
  }

  componentDidMount = () => {
    console.log('Props FindAccountScreen', this.props.route.params)
  }
  render() {
    const { email, visibility,
      badEnter, errorText, colorField, passGood, count, active, submit,
      disBtn, passwordActive, countPass } = this.state
    const { navigation } = this.props
    const { fixToText, icon, textInput, input, button, buttonContainer, buttonTitle, indicator,
      link, error, paddingBottom } = locStyles
    const { im, cardStyle, inputStyle, inputPaper, buttonContentSp, inputPaperWhite, countStyle } = globalStyles
    return (
      <View style={{ height: h }}>
        <Header title={'Поиск аккаунта'}
          leftIcon={'arrow-left'}
          position='center'
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

            <Caption style={{ textAlign: 'center', fontSize: 14, marginVertical: 10 }}>Введите электронный адрес, привязанный к вашему аккаунту</Caption>
            <View style={fixToText}>
              <Icon name="email" size={40} style={icon}
                containerStyle={{ marginTop: 25, marginRight: 5 }}
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
                {badEnter.email && <HelperText type="error" visible={badEnter.email} style={{ marginBottom: -10, fontSize: 14, color: red }} >
                  {errorText.email}
                </HelperText>}
                {/* {badEnter.email && <Text style={error}>{errorText.email}</Text>} */}
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
    const { email, badEnter, colorField } = this.state
    if (email && !badEnter.email) {
      colorField.button = appColor;
      this.setState({ disBtn: false, colorField })
    }
    else {
      colorField.button = disColor;
      this.setState({ disBtn: true, colorField })
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
      this.setState({ email: email.trim(), badEnter });
      this.checkFields()
    }
  }
  private onCheckEmail(email: string) {
    var { badEnter, errorText, colorField } = this.state
    if (email.trim() == '') {
      badEnter.email = true;
      errorText.email = 'Введите корректный e-mail'
      colorField.email = red
      this.setState({ badEnter, errorText, disBtn: true });
      return;
    }
    else {
      badEnter.email = false;
      colorField.email = appColor
      this.setState({ email: email.trim(), badEnter, colorField });
      this.checkFields()
    }
  }

  private async onSubmit() {
    const { email, badEnter, errorText, colorField } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string;

    if (!email) {
      badEnter.email = true;
      errorText.email = 'Поле не заполнено'
      colorField.email = red
      return;
    }

    if (badEnter.name) {
      this.setState({ good: false }); //, isVisible: true, textOverlay: txt 
      Alert.alert('Внимание', 'Заполните поля правильно',
        [{ text: 'OK' }]);

      return;
    }

    else this.setState({ passGood: true })
    obj = {
      Email: email,
    }
    url = serverUrl + 'auth/findAccount?Email='+email;
    log = 'поиск аккаунта'
    const propsData = this.props.route.params

    console.log(' Email: ' + email)

    this.setState({ submit: true, disBtn: true })
    var response =  await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
      //body: JSON.stringify(obj),
    })
        if (response.status == 200) {
          console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
          console.log(response);
          // Alert.alert('Вы зарегистрированы!', 'Пожалуйста, заполните дополнительную информацию по вашему адресу',
          //   [{ text: 'OK' }]);
         var data: AccountData = await response.json();
         if (data.userLogin) {
          console.log('data: ', data);
          this.setClearState();
          actions.Login('', data.userLogin)
          navigation.navigate('EditPassScreen', data.checkCod);
        }
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
      
        
      // })
      // .catch(error => {
      //   console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
      //   if (error == 'TypeError: Network request failed') {
      //     Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);
      //   }
      //   else {
      //     Alert.alert('Внимание', 'Ошибка входа. ' + error, [{ text: 'OK' }]);
      //   }
      //   $this.setState({ submit: false, disBtn: false })
      //   return
      // });
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

export { FindAccountScreen };