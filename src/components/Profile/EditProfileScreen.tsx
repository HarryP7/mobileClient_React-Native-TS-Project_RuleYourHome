import React, { Component } from 'react';
import {
  StyleSheet, ScrollView, View, Text, Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Header, globalStyles } from '..';
import { h, w, appColor, serverUrl, Background, disColor, NoAvatar, ApiKeyImage } from '../../constants'
import { User, arrBoolEd, arrTextEd, arrColorEd, ImageService } from '../../interfaces'
import { actions, store } from '../../store'
import { Icon, Card, } from 'react-native-elements'
import { TextInput, Modal, Portal, Button, Provider, Avatar, Badge } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';

interface Props { }
interface State { }
var initArrBool: arrBoolEd = {
  login: false,
  email: false,
  name: false,
  surname: false,
  phone: false,
};
var initArrTxt: arrTextEd = {
  login: '',
  email: '',
  name: '',
  phone: '',
};
var initArrColor: arrColorEd = {
  login: appColor,
  email: appColor,
  name: appColor,
  phone: appColor,
  button: disColor
};
const options = {
  title: 'Выберите фото',
  takePhotoButtonTitle: 'Открыть камеру',
  chooseFromLibraryButtonTitle: 'Выбрать из галереи',
  //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  cancelButtonTitle: 'Отмена'
};

class EditProfileScreen extends Component<any, State, Props> {
  state = {
    login: '', email: '', name: '', phone: '', width: 1, avatarSource: '',
    visibility: false, visibilityRep: false,
    submit: false, disBtn: true, refreshing: false,
    badEnter: initArrBool, errorText: initArrTxt, colorField: initArrColor
  }

  componentDidMount = () => {
    console.log('Props EditProfileScreen', this.props)
    var { login, email, fullName, phone } = this.props.route.params
    this.setState({ login, email, name: fullName, phone })
  }
  render() {
    const { login, email, name, phone, badEnter, errorText, colorField, submit, disBtn, avatarSource } = this.state
    const { navigation } = this.props
    var { userLogin, token } = store.state;
    const { fixToText, icon, textInput, input, button, buttonContainer, buttonTitle, indicator,
      link, error, paddingBottom } = locStyles
    const { im, cardStyle, inputStyle, inputPaper, buttonContentSp, inputPaperWhite } = globalStyles
    return (
      <View style={{ height: h }}>
        <Header title={'Изменить профиль'}
          leftIcon={'arrow-left'}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />

        <View >
          {Background}</View>
        <ScrollView >
          <Card containerStyle={cardStyle} >
            <TouchableOpacity
              onPress={() => { this.imagePicker() }}>
              <Avatar.Image size={w * 0.3} source={{ uri: avatarSource ? avatarSource : userLogin.avatar ? userLogin.avatar.url : NoAvatar }}
                style={{ backgroundColor: 'white', alignSelf: 'center' }} />
              <Badge style={{ backgroundColor: 'white', position: 'absolute', bottom: 5, right: w * 0.3 }} size={25} >
                <MaterialCommunityIcons name="content-save-edit" color='black' size={20} />
              </Badge>
            </TouchableOpacity>
            <View style={fixToText}>
              <View style={textInput}>
                <TextInput
                  style={[inputPaperWhite, inputStyle]}
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
              <View style={textInput}>
                <TextInput
                  style={[inputPaperWhite, inputStyle]}
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
              <View style={textInput}>
                <TextInput
                  style={[inputPaperWhite, inputStyle]}
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
              <View style={textInput}>
                <TextInput
                  style={[inputPaperWhite, inputStyle]}
                  onChangeText={this.onChangePhone.bind(this)}
                  placeholder='Введите..'
                  label='Номер телефона'
                  render={props =>
                    <TextInputMask
                      {...props}
                      mask="8 ([000]) [000]-[00]-[00]"
                    />
                  }
                  value={phone}
                  onEndEditing={() => this.onCheckPhone(phone)}
                  disabled={submit}
                  theme={{ colors: { primary: colorField.name } }}
                />
                {/* <HelperText type="error" visible={badEnter.name} style={{marginBottom: -20, fontSize: 14, color: 'red'}} >
                  {errorText.name} 
                </HelperText> */}
                {badEnter.phone && <Text style={error}>{errorText.phone}</Text>}
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                const back = true;
                navigation.navigate('ADDRESSScreen', (back));
              }}
              disabled={submit} >
              <Text style={[link]}>{'Изменить свой адрес'}</Text>
            </TouchableOpacity>

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
                  Сохранить
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

  private imagePicker() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = path:' + response.path
        + ' uri:' + response.uri + ' fileName:' + response.fileName);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({ avatarSource: response.uri, });
        this.LoadImage(response.data);
      }
    });
  }

  private async LoadImage(url: string) {
    var { uid } = this.props.route.params
    var { userLogin, token } = store.state;
    var obj
    this.setState({ load: false, submit: true, disBtn: true })
    var logAction = 'Отправление картинки'
    const imgData = new FormData()
    imgData.append('image', url)
    const response = await fetch('https://api.imgbb.com/1/upload?key=' + ApiKeyImage, {
      method: 'POST',
      mode: 'cors',
      body: imgData
    })
    if (response.status == 200) {
      const dataImg: ImageService = await response.json()
      console.log('Успех fetch ' + logAction, dataImg)
      obj = {
        Url: dataImg.data.url,
        UrlDelete: dataImg.data.delete_url
      } 
    }
    else {
      Alert.alert('Внимание', 'Ошибка загрузки изображения, status'+response.status, [{ text: 'OK' }]);
      console.log('Внимание', response);
      this.setState({ loadError: true })
      return
    }
    var log = 'Изменить аватар'
    var $this = this
    fetch(serverUrl + 'profile/loadImage?Uid=' + uid, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(obj),
    })
      .then(function (response) {
        if (response.status == 200 || response.status == 201) {
          console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
          console.log(response);
          return response.json();
        }
        else if (response.status == 500) {
          console.log('Server Error', "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', 'Ошибка сервера. Status: ' + response.status + ' ' + response,
            [{ text: 'OK' }]);
        }
        else if (response.status == 404) {
          console.log('Bad Request', "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', 'Пользователь не найден',
            [{ text: 'OK' }]);
        }
        else {
          console.log(response.statusText, "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', response.statusText + " Status: " + response.status + ' ' + response,
            [{ text: 'OK' }]);
        }
        $this.setState({ load: true, submit: false, disBtn: false });
        return undefined
      })
      .then(function (data: User) {
        console.log('data: ', data);
        if (data != undefined) {
          actions.Login(token, data)
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


  private checkFields() {
    const { login, email, name, badEnter, colorField } = this.state
    if (login && email && name && !badEnter.login &&
      !badEnter.email && !badEnter.name && !badEnter.phone) {
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
    if (name.trim().length < 2 || name.trim().length > 50) {
      badEnter.name = true;
      colorField.name = 'red'
      errorText.name = 'ФИО должно быть больше 1 символа и меньше 50'
      this.setState({ badEnter, errorText, name, disBtn: true, colorField });
      return;
    }
  }
  private onChangePhone(phone: string) {
    var { badEnter, errorText, colorField } = this.state
    if (phone == ' ') { return }
    if (!phone) {
      badEnter.phone = true;
      colorField.phone = 'red'
      errorText.phone = 'Поле не заполнено'
      this.setState({ badEnter, errorText, phone, disBtn: true, colorField });
      return;
    }
    else {
      badEnter.phone = false;
      colorField.phone = appColor
      this.setState({ phone, badEnter, colorField });
      this.checkFields()
    }
  }
  private onCheckPhone(phone: string) {
    var { badEnter, errorText, colorField } = this.state
    if (phone.trim().length < 1 || phone.trim().length > 17) {
      badEnter.phone = true;
      colorField.phone = 'red'
      errorText.phone = 'Номер должен состоять из 11 символов'
      this.setState({ badEnter, errorText, phone, disBtn: true, colorField });
      return;
    }
  }

  private onSubmit() {
    const { login, email, name, phone, badEnter, errorText, colorField } = this.state
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
    if (!phone) {
      badEnter.phone = true;
      errorText.phone = 'Поле не заполнено'
      colorField.phone = 'red'
      this.setState({ badEnter, errorText, colorField });
    }

    if (!login || !email || !name || !phone) {
      Alert.alert('Внимание', 'Не все поля заполнены',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      this.setState({ disBtn: true });
      return;
    }

    if (badEnter.login || badEnter.email || badEnter.name || badEnter.phone) {
      this.setState({ good: false }); //, isVisible: true, textOverlay: txt 
      Alert.alert('Внимание', 'Заполните поля правильно',
        [{ text: 'OK' }]);

      return;
    }
    else this.setState({ good: true, disBtn: false });

    var { uid } = this.props.route.params
    const { userLogin, token } = store.state;

    obj = {
      Login: login,
      Email: email,
      FullName: name,
      Phone: phone,
    }
    url = serverUrl + 'profile/upd?Uid=' + uid;
    log = 'Изменить профиль'

    console.log('login: ' + login + ' ФИО: ' + name + ' Email: ' + email + ' Phone: ' + phone)
    console.log('badEnter.login: ' + badEnter.login + ' badEnter.name: ' + badEnter.name +
      ' badEnter.surname: ' + badEnter.surname)

    this.setState({ submit: true, disBtn: true })
    fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(obj),
    })
      .then(function (response) {
        if (response.status == 200 || response.status == 201) {
          console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
          console.log(response);
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
        else if (response.status == 404) {
          console.log('Bad Request', "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', 'Пользователь не найден',
            [{ text: 'OK' }]);
        }
        else {
          console.log(response.statusText, "Status: " + response.status + ' ' + response)
          Alert.alert('Внимание', response.statusText + " Status: " + response.status + ' ' + response,
            [{ text: 'OK' }]);
        }
        $this.setState({ submit: false, disBtn: false });
        return undefined
      })
      .then(function (data: User) {
        console.log('data: ', data);
        if (data != undefined) {
          actions.Login(token, data)
          navigation.pop();
        }
      })
      .catch(error => {
        console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
        if (error == 'TypeError: Network request failed') {
          Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);
        }
        else {
          Alert.alert('Внимание', 'Ошибка ' + error, [{ text: 'OK' }]);
        }
        $this.setState({ submit: false, disBtn: false })
        return
      });
  }
  private setClearState() {
    var arr: arrBoolEd = {
      login: false,
      email: false,
      name: false,
      surname: false,
      phone: false,
    };
    var arrCol: arrColorEd = {
      login: appColor,
      email: appColor,
      name: appColor,
      phone: appColor,
      button: disColor
    };
    this.setState({
      login: '', email: '', name: '', surname: '',
      color: appColor, good: true, submit: false, disBtn: true,
      badEnter: arr, errorText: initArrTxt, colorField: arrCol
    })
  }
}

const locStyles = StyleSheet.create({
  icon: {
    marginTop: 20,
    width: 35,
    height: 35,
  },
  textInput: {
    width: w * 0.8,
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
    marginTop: 10,
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
    margin: 20,
    color: appColor,
    // textAlign: 'center',
    fontSize: 18,
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

export { EditProfileScreen };