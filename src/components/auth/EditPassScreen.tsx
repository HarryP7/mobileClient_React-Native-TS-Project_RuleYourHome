import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Alert, ActivityIndicator
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { user, homeLoc, lock, lockRep, shield } from '../../allSvg'
import { Header, globalStyles } from '..';
import { h, w, appColor, serverUrl, Background, disColor, BackgroundWhite, NoAvatar } from '../../constants'
import { User, arrText, arrBool, arrColor, initialUser } from '../../interfaces'
import { actions, store } from '../../store'
import { ADDRESSScreen } from '../../Navigations/routes';
import { Icon, Card, Input, Divider } from 'react-native-elements'
import { TextInput, Modal, Portal, Button, Provider, HelperText, Avatar, Title } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props { }
interface State { }
var initArrBool = { password: false, repeatPassword: false};
var initArrTxt = {password: '', infoPassword: '', repeatPassword: ''};
var initArrColor = {password: appColor, repeatPassword: appColor, button: disColor};
var initActive = {password: false, repeatPassword: false}
var initCount = {password: 0, repeatPassword: 0}
const red = "red"

class EditPassScreen extends Component<any, State, Props> {
  state = {
    password: '', repeatPassword: '', userLogin: initialUser,
    visibility: false, visibilityRep: false, passwordActive: false, countPass: 0,
    passGood: false, submit: false, disBtn: true, refreshing: false,
    badEnter: initArrBool, errorText: initArrTxt, colorField: initArrColor,
    active: initActive, count: initCount
  }

  componentDidMount = () => {
    console.log('Props EditPassScreen', this.props.route.params)
    const {userLogin} = store.state
    this.setState({userLogin})
    console.log('userLogin', userLogin)
  }
  render() {
    const {  password, repeatPassword, visibility,
      badEnter, errorText, colorField, passGood, count, active, submit, 
      disBtn, userLogin } = this.state
      const {avatar, fullName} = userLogin
    const { navigation } = this.props
    const { fixToText, icon, textInput, input, button, buttonContainer, buttonTitle, indicator,
      link, error, paddingBottom } = locStyles
    const { cardStyle,  inputStyle, inputPaper, buttonContentSp, inputPaperWhite, countStyle } = globalStyles
    return (
      <View style={{ height: h }}>
        <Header title={'Изменение пароля'}
          leftIcon={'arrow-left'}
          position='center'
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
          {Background}
        <ScrollView >
          <Card containerStyle={cardStyle} >
                        
          <View style={{alignItems: 'center'}}>
          <Avatar.Image size={w * 0.3} source={{ uri: avatar ? avatar.url : NoAvatar }} style={{ backgroundColor: 'white' }} />
          <Title >{fullName} </Title>
          </View>
          <Divider/>
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
    const { password, repeatPassword, badEnter, colorField } = this.state
    if (password && repeatPassword &&
      !badEnter.password && !badEnter.repeatPassword) {
      colorField.button = appColor;
      this.setState({ disBtn: false, colorField })
    }
    else {
      colorField.button = disColor;
      this.setState({ disBtn: true, colorField })
    }
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

  private async onSubmit() {
    const { password, repeatPassword, badEnter, errorText,
      colorField } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string;

    
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
    if (!password || !repeatPassword) {
      Alert.alert('Внимание', 'Не все поля заполнены',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      this.setState({ disBtn: true });
      return;
    }

    if (badEnter.password || badEnter.repeatPassword) {
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
    
    const {userLogin} = store.state
    obj = {
      Password: password,
      Email: userLogin.email
    }
    url = serverUrl + 'auth/changePass/';
    log = 'Изменение пароля'
    const propsData = this.props.route.params

    console.log(' badEnter.password: ' + badEnter.password)

    this.setState({ submit: true, disBtn: true })
    var response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
    })
        if (response.status == 200 || response.status == 201) {
          console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
          console.log(response);
          Alert.alert('Ваш пароль изменен!', 'Войдите в свой аккаунт используя свой новый пароль',
            [{ text: 'OK' }]);
        //   var data  = response.json();
        //   console.log('data: ', data);
        // if (data.token) {
          this.setClearState();
          // actions.Login(data.token, data.userLogin)
          // const back = false;
          navigation.navigate('AUTH', propsData);
        // }
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
    var arr = {password: false, repeatPassword: false
    };
    var arrCol = {password: disColor, repeatPassword: appColor, button: disColor};
    this.setState({      
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

export { EditPassScreen };