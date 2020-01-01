import React, { Component } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity,
  TextInput, Alert, Switch, StatusBar
} from 'react-native';
import { Card, Input, CheckBox, Icon } from 'react-native-elements'
import { SvgXml } from 'react-native-svg';
import { save, add } from '../../allSvg'
import { Header } from '..';//, styles 
import { Dropdown } from 'react-native-material-dropdown';
import { h, w, brown, serverUrl } from '../../constants'
import { Category } from '../../enum/Enums'
import { backArrow } from '../../allSvg'
import SafeAreaView from 'react-native-safe-area-view';
import { globalStyles } from '..';
//import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
//import {Fab} from '@material-ui/core';
//import Save from '@material-ui/icons/Save';

interface Props { }
interface State { }
export interface AdvTxt {
  title: string,
  text: string,
  category: string,
  question: string,
  answer: string,
}
export interface AdvBool {
  title: boolean,
  text: boolean,
  category: boolean,
  question: boolean,
  answer: boolean,
}
var arrText: AdvTxt = {
  text: '',
  title: '',
  category: '',
  question: '',
  answer: '',
};
var arr: AdvBool = {
  title: false,
  text: false,
  category: false,
  question: false,
  answer: false,
};


class AddAdvertScreen extends Component<any, State, Props> {
  state = {
    text: '', title: '', category: '', question: '',
    answer: '', status: '', good: true, passGood: false, submit: false,
    badEnter: arr, errorText: arrText, checked: false, isMulti: false

  }

  render() {
    console.log('Props AddAdvertScreen', this.props)
    const { text, title, badEnter, errorText, answer,
      good, status, checked } = this.state
    const { navigation } = this.props
    const { container, fixToText, label, label2, label4, addPosition, textInput, textInput2,
      iconButton,inputMultiline, button, buttonContainer, sectionTitle, styleSwitch, inputStyle,
      error } = styles
    const { } = globalStyles
    let dataStatus = [{
      value: Category.Repairs }, {
      value: Category.EngineeringWorks }, {
      value: Category.Overhaul }, {
      value: Category.EnergySaving }, {
      value: Category.Owners }, {
      value: Category.CommunityInfrastructure }, {
      value: Category.Attention },];
    return (<View>
      <StatusBar backgroundColor={brown} barStyle="light-content" />
      <Header title='Добавление объявления'
        leftIcon={backArrow}
        onPressLeft={() => {
          this.setClearState();
          navigation.goBack();
        }} />
      <ScrollView>
        <SafeAreaView>
          <View style={container}>
            <View style={fixToText}>
              <View style={textInput}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={label}> Заголовок объявления <Text style={{ color: 'red' }}>*</Text></Text>
                </View>
                <Input
                  inputContainerStyle={inputMultiline}
                  inputStyle={inputStyle}
                  onChangeText={this.onChangeTitle.bind(this)}
                  placeholder='Заголовок..'
                  multiline={true}
                  numberOfLines={1}
                  value={title}
                  errorMessage={badEnter.title ? 'Поле не заполнено!' : ''}
                />
              </View>
            </View>
            <View style={fixToText}>
              <View style={textInput}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={label}> Текст объявления <Text style={{ color: 'red' }}>*</Text></Text>
                </View>
                <Input
                  inputContainerStyle={inputMultiline}
                  inputStyle={inputStyle}
                  onChangeText={this.onChangeText.bind(this)}
                  placeholder='Введите текст..'
                  multiline={true}
                  numberOfLines={5}
                  value={text}
                  textAlignVertical='top'
                  errorMessage={badEnter.text ? 'Поле не заполнено!' : ''}
                />
              </View>
            </View>

            <View style={fixToText}>
              <View style={textInput2}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={label2}> Категория <Text style={{ color: 'red' }}>*</Text></Text>
                </View>
                <Dropdown
                  data={dataStatus}
                  onChangeText={this.onChangeStatus.bind(this)}
                  value={status}
                  pickerStyle={inputMultiline}
                />
                {badEnter.category && <Text style={error}>Поле не заполнено!</Text>}
                {/* placeholder='Выберите статус..' */}
              </View>
            </View>
          </View>
          <View >
            <TouchableOpacity onPress={() => this.setState({ checked: !checked })}
              style={addPosition}>
              <Switch
                style={styleSwitch}
                value={checked}
                onValueChange={() => this.setState({ checked: !checked })}
                thumbColor='green'
              ></Switch>
              <Text style={label4}>Добавить голосование</Text>
            </TouchableOpacity>
          </View>
          {/* <CheckBox title='Добавить голосование'
            checked={checked}
            onPress={() => this.setState({ checked: !checked })}
            checkedColor='green'
            center
          ></CheckBox> */}
          {checked && this.addVotingPress()}

          <View style={{ alignItems: 'flex-end' }}>
            <View style={button}>
              <TouchableOpacity onPress={this.onSubmit.bind(this)} >
                <View style={buttonContainer}>
                  <SvgXml
                    xml={save}
                    style={iconButton} fill='#fff' />
                  <Text style={sectionTitle}>Сохранить</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ margin: 30 }}><Text> </Text></View>
        </SafeAreaView>
      </ScrollView>
    </View>

    );
  }

  private addVotingPress() {
    const { text, title, category, question, answer,
      good, status, checked, isMulti } = this.state
    const { navigation } = this.props
    const { container, fixToText, label, label4, textInput, containerStyle,
      iconButton, inputMultiline, inputStyle,
      advertContainer, addPosition } = styles
    return <View>
      <View style={advertContainer}>
        <View style={fixToText}>
          <View style={textInput}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={label}> Вопрос <Text style={{ color: 'red' }}>*</Text></Text>
            </View>
            <Input
              inputContainerStyle={inputMultiline}
              inputStyle={inputStyle}
              onChangeText={this.onChangeTitle.bind(this)}
              placeholder='Введите вопрос..'
              multiline={true}
              numberOfLines={1}
              value={title}
            />
          </View>
        </View>
        <View style={fixToText}>
          <View style={textInput}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={label}> Вариант ответа <Text style={{ color: 'red' }}>*</Text></Text>
            </View>
            <Input
              inputContainerStyle={inputMultiline}
              inputStyle={inputStyle}
              onChangeText={this.onChangeText.bind(this)}
              placeholder='Введите текст..'
              multiline={true}
              numberOfLines={1}
              value={text}
            />
          </View>
        </View>

        <TouchableOpacity style={addPosition}
          onPress={this.onSubmit.bind(this)} >
          <SvgXml
            xml={add}
            style={iconButton} fill='green' />
          <Text >   Добавить еще один вариант ответа</Text>
        </TouchableOpacity>
        <CheckBox title='Многовариантное голосование'
          checked={isMulti}
          onPress={() => this.setState({ isMulti: !isMulti })}
          checkedColor='green'
          containerStyle={containerStyle}
        ></CheckBox>
      </View>
      <TouchableOpacity style={addPosition}
        onPress={this.onSubmit.bind(this)} >
        <SvgXml
          xml={add}
          style={iconButton} fill='green' />
        <Text style={label4}>   Добавить еще одно голосование</Text>
      </TouchableOpacity>
    </View>
  }

  private onChangeTitle(title: string) {
    var badEnter = this.state.badEnter
    badEnter.title = false;
    this.setState({ title, badEnter });
  }
  private onChangeText(text: string) {
    var badEnter = this.state.badEnter
    badEnter.text = false;
    this.setState({ text, badEnter });
  }
  private onChangeStatus(status: string) {
    this.setState({ status });
  }


  private onSubmit() {
    //     e.preventDefault();
    const { text, title, category, question, answer, good, status, badEnter, errorText, } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string;
    //if (signup) {
    if (!text) {
      badEnter.text = true;
      errorText.text = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, good: false });
    }
    if (!title) {
      badEnter.title = true;
      errorText.title = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, good: false });
    }
    if (!category) {
      badEnter.category = true;
      errorText.category = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, good: false });
    }
    if (!text || !title || !category ||
      !question || !answer || !status) {
      Alert.alert('Внимание', 'Не все поля заполнены!',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      return;
    }

    // }
    //else 
    this.setState({ good: true })
    obj = {
      Admin: "0000e0000-t0t-00t0-t000-00000000000",
      Title: title,
      Text: text,
      Category: status == Category.Repairs ? 1 :
        status == Category.EngineeringWorks ? 2 :
          status == Category.Overhaul ? 3 :
            status == Category.EnergySaving ? 4 :
              status == Category.Owners ? 5 :
                status == Category.CommunityInfrastructure ? 6 : 7,
      LocalGroup: navigation.state.params[0].fk_LocalGroup
    }
    url = serverUrl+'adverts/create/';
    log = 'Добавить обьявление'

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
          // if (signup)
          //   $this.setClearState();
          // else
          navigation.goBack();
        }
        if (response.status == 500)
          console.log('Server Error', "Status: " + response.status + ' ' + response.json())
      })
      .then(function () {

      })
      .catch(error => {
        Alert.alert('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error,
          [{ text: 'OK' }]);
      });
  }
  private setClearState() {
    this.setState({
      text: '', title: '', category: '', question: '',
      answer: '', status: '', colorT: '#000', colorPass: '#000',
      good: false, signup: false
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
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  inputMultiline: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    alignContent: 'flex-start',
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
    marginVertical: 30,
    width: 160,
    marginRight: 20
  },
  label: {
    marginTop: -10,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  label2: {
    marginBottom: -25,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: -7
  },
  label3: {
    marginTop: -10,
    marginBottom: 5,
    fontSize: 16,
  },
  label4: {
    marginVertical: 5,
    fontSize: 17,
  },
  inputStyle: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  iconButton: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  buttonContainer: {
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
  advertContainer: {
    borderColor: 'gray',
    backgroundColor: '#FFD0AE',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    paddingVertical: 5
  },
  addPosition: {
    flexDirection: 'row',
    //marginBottom: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  containerStyle: {
    backgroundColor: '#FFD0AE',
    borderColor: '#FFD0AE'
  },
  styleSwitch: {
    marginLeft: w * 0.1,
    height: 30
  },
  error: {
    marginTop: 5,
    color: 'red',
    fontSize: 12,
    marginBottom: -10
  },
})
export { AddAdvertScreen };