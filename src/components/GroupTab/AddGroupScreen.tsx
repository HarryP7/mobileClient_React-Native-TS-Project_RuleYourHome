import React, { Component } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity, Image,
  Button, TextInput, Alert, ActivityIndicator
} from 'react-native';
import {
  LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SvgXml } from 'react-native-svg';
import { save } from '../../allSvg'
import { Header } from '..';//, styles 
import { Dropdown, DropDownMargins } from 'react-native-material-dropdown';
import { h, w, appColor, serverUrl, BackgroundImage, Background } from '../../constants'
import { GroupStatus } from '../../enum/Enums'
import { backArrow } from '../../allSvg'
import { useGlobal, store } from '../../store'
import { globalStyles } from '../globalStyles';
import { Card, Input } from 'react-native-elements';
import { GroupPRO } from '../../routes';
import { Group } from '../../interfaces';

interface Props { }
interface State { }
interface arrGroupBool {
  title: Boolean, status: Boolean
}
interface arrGroupText {
  title: string, status: string
}
var arr: arrGroupBool = {
  title: false, status: false
};
var arrTxt: arrGroupText = {
  title: '', status: ''
};
var arrColor: arrGroupText = {
  title: 'gray', status: 'gray'
};

class AddGroupScreen extends Component<any, State, Props> {
  state = {
    title: '', status: '', badEnter: arr, errorText: arrTxt, fieldColor: arrColor,
    good: false, submit: false,

  }

  componentDidMount = () => {    
    console.log('Props AddGroupScreen', this.props)
  }

  render() {
    const { submit, title, status, badEnter, errorText, fieldColor } = this.state
    const { navigation } = this.props
    const { container, textInput, textInput2, input,
      button, fixToText, sectionContainer, sectionTitle } = styles
    const { im, label, label2, indicator, cardStyle, inputMultiline, 
      contStyle, error, inputStyle } = globalStyles
    let dataStatus = [{
      value: GroupStatus.Public, }, {
      value: GroupStatus.Pravite, },];
    return (<View>
      <Header title='Добавить группу'
        leftIcon={'arrow-left'}
        onPressLeft={() => {
          this.setClearState();
          navigation.goBack();
        }} />
      <View>
        {Background}</View>
      <ScrollView>
        <Card containerStyle={cardStyle} >
        {submit && <ActivityIndicator style={indicator} size={70} color={appColor} />}
          <View style={fixToText}>
            <View style={textInput}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={label}> Название <Text style={{ color: 'red' }}>*</Text></Text>
              </View>
              {/* <TextInput
                style={inputMultiline}
                onChangeText={this.onChangeTitle.bind(this)}
                placeholder='Название..'
                autoCorrect={true}
                value={title}
                multiline={true}
                numberOfLines={1}
                editable={!submit}
              />
              {badEnter.title && <Text style={error}>{errorText.title}</Text>} */}
              
              <Input
                  inputContainerStyle={[inputMultiline, {borderColor: fieldColor.title,}]}
                  inputStyle={inputStyle}
                  onChangeText={this.onChangeTitle.bind(this)}
                  placeholder='Название..'
                  autoCorrect={true}
                  multiline={true}
                  numberOfLines={1}
                  value={title}
                  errorMessage={badEnter.title ? errorText.title : ''}
                  errorStyle={error}
                  onEndEditing={() => this.onCheckTitle(title)}
                />
            </View>
          </View>
          <View style={fixToText}>
            <View style={textInput2}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={label2}> Статус группы <Text style={{ color: 'red' }}>*</Text></Text>
              </View>
              <Dropdown
                containerStyle={contStyle}
                data={dataStatus}
                onChangeText={this.onChangeStatus.bind(this)}
                value={status}
                pickerStyle={inputMultiline}
                dropdownPosition={0}
                disabled={submit}
              />
              {badEnter.status && <Text style={error}>{errorText.status}</Text>}
            </View>
          </View>
        </Card>

        <View style={{ alignItems: 'flex-end' }}>
          <View style={button}>
            <TouchableOpacity onPress={this.onSubmit.bind(this)}
              disabled={submit}>
              <View style={sectionContainer}>
                <SvgXml
                  xml={save}
                  style={styles.iconMin} fill='#fff' />
                <Text style={sectionTitle}>Сохранить</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ margin: 30 }}><Text> </Text></View>
      </ScrollView>
    </View>

    );
  }
  onCheckTitle(title: string): void {
    var { badEnter, errorText, fieldColor } = this.state
    if (!title) {
      badEnter.title = true;
      errorText.title = 'Поле не заполнено!'
      fieldColor.title = 'red'
      this.setState({ fieldColor, badEnter, errorText, title, good: false });
    }
    else if (title.trim().length < 4 || title.trim().length > 25) {
      badEnter.title = true;
      errorText.title = 'Название должно быть больше 4х символов и меньше 25!'
      fieldColor.title = 'red'
      this.setState({ fieldColor, badEnter, errorText, title, good: false });
    }
    else {
      badEnter.title = false;
      this.setState({ title, badEnter });
    }
  }

  private onChangeTitle(title: string) {
    var { badEnter, errorText, fieldColor } = this.state
    
    if (title.trim().length > 4 && title.trim().length < 25) {
      fieldColor.title = 'green';
      badEnter.title = false;
      this.setState({ badEnter, errorText, title, good: false });
      return;
    }
    else if(title.trim().length > 25) {
      badEnter.title = true;
      errorText.title = 'Название должно быть больше меньше 25!'
      fieldColor.title = 'red'
      this.setState({ fieldColor, badEnter, errorText, title, good: false });      
    }
    else {
      badEnter.title = false;
      this.setState({ title, badEnter });
    }
  }
  private onChangeStatus(status: string) {
    var { badEnter, errorText } = this.state
    if (!status) {
      badEnter.status = true;
      errorText.status = 'Поле не заполнено!'
    }
    else {
      badEnter.status = false;
    }
    this.setState({ status, badEnter });
  }


  private onSubmit() {
    const { title,  status, badEnter, errorText } = this.state

    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string;
    
    if (title.trim().length < 4 || title.trim().length > 25) {
      badEnter.title = true;
      errorText.title = 'Название должно быть больше 4х символов и меньше 25!'
      this.setState({ badEnter, errorText, title, good: false });
      
    }
    if (!title) {
      badEnter.title = true;
      errorText.title = 'Поле не заполнено!'
    }
    if (!status) {
      badEnter.status = true;
      errorText.status = 'Поле не заполнено!'
    }
    if (!title || !status) {
      Alert.alert('Внимание', 'Не все поля заполнены!',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      return;
    }
    //console.log("params" , "Fk_Home: " +navigation.state.params)
    this.setState({ good: true, submit: true })
    obj = {
      Supervisor: store.state.userLogin.uid,
      Title: title,
      Home: navigation.state.params,
      Status: status == GroupStatus.Public ? 1 : 2,
      //Image: '5ddc6bd0-627b-42da-a603-d62adab55efe'
    }
    url = serverUrl+'groups/create/';
    log = 'Добавить группу'

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
        if (response.status == 500)
          console.log('Server Error', "Status: " + response.status + ' ' + response.json())
      })
      .then(function(data: Group) {          
        navigation.navigate(GroupPRO, (data));
      })
      .catch(error => {
        Alert.alert('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error,
          [{ text: 'OK' }]);
      });
  }
  private setClearState() {
    this.setState({
      title: '', status: '', badEnter: arr, errorText: arrTxt, fieldColor: arrColor,
      good: false, submit: false,
    })
  }
}


const styles = StyleSheet.create({

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
  iconMin: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  sectionContainer: {
    backgroundColor: '#15a009',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7
  },
  sectionTitle: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#fff',
  },
})
export { AddGroupScreen };