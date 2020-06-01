import React, { Component } from 'react';
import {  StyleSheet, ScrollView, View, Text, TouchableOpacity,
  Alert, Switch, SafeAreaView, ActivityIndicator
} from 'react-native';
import { Card, Input, CheckBox, Icon } from 'react-native-elements'
import { SvgXml } from 'react-native-svg';
import { save, add } from '../../allSvg'
import { Header } from '..';
import { Dropdown } from 'react-native-material-dropdown';
import { h, w, appColor, serverUrl, Background } from '../../constants'
import { Category } from '../../enum/Enums'
import { globalStyles } from '..';
import { store } from '../../store';
import { Voting, AdvBool, Advert, Answer, initAdvBool, initAdvText } from '../../interfaces';

interface Props { }

interface State {
  title: string,
  text: string,
  category: string,
  voting: Voting[],
  good: boolean,
  submit: boolean,
  badEnter: AdvBool,
  errorText: Advert,
  addVoting: boolean
}
const initAdvAnswer: Answer = {
  uid: '',  
  option: '',
  count: 0
};
const initArrAdvAns: Answer[] = [];
initArrAdvAns.push(initAdvAnswer)
const initAdvVoting: Voting = {
  uid: '',  
  title: '',
  options: initArrAdvAns,
  isMulti: false,
  yourOption: '',
  voteds:[],  
  totalVotes: 0
};
var initVoting: Voting[] = [];
initVoting.push(initAdvVoting)

var initState = {
  text: '', title: '', category: 'Выберите категорию..', voting: initVoting.slice(),
  good: true, submit: false, badEnter: initAdvBool, errorText: initAdvText, addVoting: true,
}

class AddAdvertScreen extends Component<any, State, Props> {
  state = initState as State

  componentDidMount = () => {
    console.log('Props AddAdvertScreen', this.props)
  }

  render() {
    const { text, title, category, voting, badEnter, errorText, good, addVoting, submit } = this.state
    const { navigation } = this.props
    const { container, fixToText, label, label2, label4, addPosition, textInput, textInput2,
      iconButton, inputMultiline, button, buttonContainer, error,sectionTitle, styleSwitch, iconButton2
    } = styles
    const { inputStyle, imScroll, cardUsersStyle,  dropdownStyle, indicator } = globalStyles
    let dataCategory = [{
      value: Category.Repairs }, {
      value: Category.EngineeringWorks }, {
      value: Category.Overhaul }, {
      value: Category.EnergySaving }, {
      value: Category.Owners }, {
      value: Category.CommunityInfrastructure }, {
      value: Category.Attention },];
    return (<View>
      <Header title='Добавление объявление'
        leftIcon={'arrow-left'}
        onPressLeft={() => {
          this.setClearState(); 
          navigation.goBack();
        }} />
      {/* <View>
        <Image source={BackgroundImage} style={imScroll}></Image></View> */}
        {Background}
      <ScrollView>
        <SafeAreaView>
          <Card containerStyle={[cardUsersStyle,{margin: 5, marginHorizontal: 5}]} >          
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
                  errorMessage={badEnter.title ? errorText.title : ''}
                  errorStyle={error}
                  disabled={submit}
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
                  errorStyle={error}
                  disabled={submit}
                />
              </View>
            </View>

            <View style={fixToText}>
              <View style={textInput2}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={label2}> Категория <Text style={{ color: 'red' }}>*</Text></Text>
                </View>
                <Dropdown
                  data={dataCategory}
                  onChangeText={this.onChangeCategory.bind(this)}
                  value={category}
                  dropdownPosition={0}
                  pickerStyle={[dropdownStyle, inputMultiline]}                  
                  disabled={submit}
                />
                {badEnter.category && <Text style={error}>Поле не заполнено!</Text>}
              </View>
            </View>
          </Card>
          <Card containerStyle={[cardUsersStyle, { marginHorizontal: 5, marginTop: 0 }]} >
            <TouchableOpacity onPress={() => this.setState({ addVoting: !addVoting })}
              style={addPosition}>
              <Switch
                style={styleSwitch}
                value={addVoting}
                onValueChange={() => this.setState({ addVoting: !addVoting })}
                thumbColor='green'
                disabled={submit}
              />
              <Text style={label4}> Добавить голосование</Text>
            </TouchableOpacity>
          </Card>
          {/* <CheckBox title='Добавить голосование'
            checked={checked}
            onPress={() => this.setState({ checked: !checked })}
            checkedColor='green'
            center
          ></CheckBox> */}
          {addVoting && this.addVotingPress()}

          <View style={{ alignItems: 'flex-end' }}>
            <View style={button}>
              <TouchableOpacity onPress={this.onSubmit.bind(this)}               
              disabled={submit}>
                <View style={buttonContainer}>
                  <SvgXml
                    xml={save}
                    style={iconButton2} fill='#fff' />
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
    const { voting, submit } = this.state
    const { navigation } = this.props
    const { container, fixToText, label, label4,label5, textInput, containerStyle, iconButton1,
      iconButton, inputMultiline, votingContainer, addPosition, top } = styles
    const { inputStyle, cardUsersStyle, indicator, label3 } = globalStyles
    return <View>
      {voting.map((item: Voting, idV: number) => {
        return <View style={votingContainer}>
        {submit && <ActivityIndicator key={idV} style={indicator} size={50} color={appColor} />}
          <View style={fixToText}>
            <View style={textInput}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={label}> Вопрос <Text style={{ color: 'red' }}>*</Text></Text>
              </View>
              <Input
                key={idV}
                inputContainerStyle={inputMultiline}
                inputStyle={inputStyle}
                onChangeText={this.onChangeQuestion.bind(this, idV)}
                placeholder='Введите вопрос..'
                multiline={true}
                numberOfLines={1}
                value={item.title}
                disabled={submit}
              />
            </View>
          </View>
          {item.options.map((el: Answer, idAns: number) => {
            return <View style={fixToText}>
              <View style={textInput}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={label5}> Вариант ответа <Text style={{ color: 'red' }}>*</Text></Text>
                </View>
                <Input
                  key={idAns}
                  inputContainerStyle={inputMultiline}
                  inputStyle={inputStyle}
                  onChangeText={this.onChangeAnswer.bind(this, idV, idAns)}
                  placeholder='Введите текст..'
                  multiline={true}
                  numberOfLines={1}
                  value={el.option}
                  disabled={submit}
                />
              </View>
            </View>
          })
          }

          <TouchableOpacity style={[addPosition, top]}
            onPress={this.addMoreAnswerPress.bind(this, idV)} 
            disabled={submit}>
            <SvgXml
              xml={add}
              style={iconButton1} fill='green' />
            <Text >   Добавить еще один вариант ответа</Text>
          </TouchableOpacity>
          {/* <CheckBox title='Многовариантное голосование'
            checked={item.isMulti}
            onPress={() => {
              voting[idV].isMulti = !item.isMulti
              this.setState({ voting })
            }}
            checkedColor='green'
            containerStyle={containerStyle}
          /> */}
        </View>
      })
      }

      {/* <Card containerStyle={cardUsersStyle} >
        <TouchableOpacity style={addPosition}
          onPress={this.addMoreVotingPress.bind(this)} 
          disabled={submit} >
          <SvgXml
            xml={add}
            style={iconButton} fill='green' />
          <Text style={label4}>   Добавить еще одно голосование</Text>
        </TouchableOpacity>
      </Card> */}
    </View>
  }

  private addMoreVotingPress() {
    var { voting, badEnter, errorText } = this.state
    var addAdvAnswer: Answer = {
      uid: '', 
      option: '',
      count: 0
    };
    var addAdvVoting: Voting = {
      uid: '', 
      title: '',
      options: [addAdvAnswer],
      isMulti: false,
      yourOption: '',
      voteds:[],  
      totalVotes: 0
    };
    voting.push(addAdvVoting)
    this.setState({ voting })
  }
  private addMoreAnswerPress(idV: number) {
    var { voting } = this.state
    var addAdvAnswer: Answer = {
      uid: '', 
      option: '',
      count: 0
    };
    voting[idV].options.push(addAdvAnswer)
    this.setState({ voting })
  }
  private onChangeTitle(title: string) {
    var { badEnter, errorText } = this.state
    if (title.length > 200) {
      badEnter.title = true;
      errorText.title = 'Ограничение ввода, не более 200 символов'
    }
    else {
      badEnter.title = false;
    }
    this.setState({ title, badEnter });
  }
  private onChangeText(text: string) {
    var { badEnter, errorText } = this.state
    badEnter.text = false;
    this.setState({ text, badEnter });
  }
  private onChangeCategory(category: string) {
    var badEnter = this.state.badEnter
    badEnter.category = false;
    this.setState({ category, badEnter });
  }
  private onChangeQuestion(idV: number, title: string) {
    var { badEnter, voting } = this.state
    //badEnter.voting[idV].title = false;
    voting[idV].title = title
    this.setState({ voting, badEnter });
  }
  private onChangeAnswer(idV: number, idAns: number, option: string) {
    var { badEnter, voting } = this.state
    //badEnter.voting[idV].options[idAns].option = false;
    voting[idV].options[idAns].option = option
    this.setState({ voting, badEnter });
  }


  private onSubmit() {
    const { text, title, category, voting, addVoting, badEnter, errorText, } = this.state
    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string;
    if (!title.trim()) {
      badEnter.title = true;
      errorText.title = 'Поле не заполнено!'
      this.setState({ title: title.trim(), badEnter, errorText, good: false });
    }
    if (!text.trim()) {
      badEnter.text = true;
      errorText.text = 'Поле не заполнено!'
      this.setState({ text: text.trim(), badEnter, errorText, good: false });
    }
    if (category == 'Выберите категорию..') {
      badEnter.category = true;
      errorText.category = 'Поле не заполнено!'
      this.setState({ badEnter, errorText, good: false });
    }
    if (!text.trim() || !title.trim() || category == 'Выберите категорию..') {
      Alert.alert('Внимание', 'Не все поля заполнены!',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      return;
    }
    //console.log(navigation.state.params)
    var good = true
    if (addVoting) {
      voting.forEach(el => {
        //console.log('el.title: ' + el.title)
        !el.title ? good = false : good = good
        if (el.title.length > 200) {
          Alert.alert('Внимание', 'Ограничение ввода вопроса, не более 200 символов!',
            [{ text: 'OK' }],
            { cancelable: false });
        }
        el.options.forEach(e => {
          //console.log('e.options: ' + e.options)
          !e.option ? good = false : good = good
          if (e.option.length > 50) {
            Alert.alert('Внимание', 'Ограничение ввода варианта ответа, не более 50 символов!',
              [{ text: 'OK' }],
              { cancelable: false });
          }
        })
      })
      if (!good) {
        Alert.alert('Внимание', 'Не все поля в голосовании заполнены!',
          [{ text: 'OK' }],
          { cancelable: false },
        );
        return;
      }
    }
    const { userLogin, token } = store.state
    this.setState({ submit: true })
    obj = {
      Author: userLogin.uid,
      Title: title,
      Text: text,
      Category: category == Category.Repairs ? 1 :
        category == Category.EngineeringWorks ? 2 :
          category == Category.Overhaul ? 3 :
            category == Category.EnergySaving ? 4 :
              category == Category.Owners ? 5 :
                category == Category.CommunityInfrastructure ? 6 : 7,
      LocalGroup: navigation.state.params,
      Voting: voting
    }
    url = serverUrl + 'adverts/create/';
    log = 'Добавить обьявление'

    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(obj), //JSON.stringify(
    })
      .then(function (response) {
        if (response.status == 200 || response.status == 201) {
          console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
          console.log(response);
          $this.setClearState();
          navigation.goBack();
        }
        if (response.status == 500)
          console.log('Server Error', "Status: " + response.status + ' ' + response.json())
      })
      .then(function () {

      })
      .catch(error => {
        if (error == 'TypeError: Network request failed') {
          console.log('Внимание', 'Сервер не доступен: ' + log + ' Post fetch: ' + error);
          Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);
          $this.setState({ submit: false })
        }
        else {          
        console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
          Alert.alert('Внимание', 'Ошибка: ' + error, [{ text: 'OK' }]);
          $this.setState({ submit: false })
        }
        return
      });
  }
  private setClearState() {
    this.setState({
      text: '', title: '', category: 'Выберите категорию..', voting: initVoting.slice(),
      good: true, submit: false, badEnter: initAdvBool, errorText: initAdvText, addVoting: true,} as State)
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
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 30,
    width: 160,
    marginRight: 20
  },
  label: {
    marginTop: -5,
    marginBottom: 5,
    marginLeft: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  label2: {
    marginBottom: -25,
    fontSize: 18,
    fontWeight: 'bold',
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
  label5: {
    marginLeft: 5,
    marginVertical: 5,
    fontSize: 17,
  },
  iconButton2: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  iconButton1: {
    width: 30,
    height: 30,
    marginLeft: 20,
  },
  iconButton: {
    width: 40,
    height: 40,
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
  votingContainer: {
    borderColor: '#ddd',
    backgroundColor: '#eff',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 5,
    paddingVertical: 5,

  },
  addPosition: {
    flexDirection: 'row',
    //marginBottom: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  top: {
    marginTop: 10
  },
  containerStyle: {
    backgroundColor: '#eff',
    borderColor: '#eff'
  },
  styleSwitch: {
    marginLeft: w * 0.1,
    height: 30
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
})
export { AddAdvertScreen };