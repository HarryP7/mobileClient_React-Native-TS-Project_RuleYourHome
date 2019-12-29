import React, { Component } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TouchableOpacity, TouchableWithoutFeedback,
  Button, TextInput, Alert
} from 'react-native';
import {
  LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SvgXml } from 'react-native-svg';
import { save } from '../../allSvg'
import { Header } from '..';//, styles 
import { Dropdown, DropDownMargins } from 'react-native-material-dropdown';
import { h, w } from '../../constants'
import { GroupStatus } from '../../enum/Enums'
import { backArrow } from '../../allSvg'
import { useGlobal, store } from '../../store'
import { globalStyles } from '../globalStyles';
//import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
//import {Fab} from '@material-ui/core';
//import Save from '@material-ui/icons/Save';

interface Props { }
interface State { }

class AddGroupScreen extends Component<any, State, Props> {
  state = {
     title: '',status: '', colorT: '#000', colorPass: '#000',
    good: false, submit: false,

  }

  render() {
    console.log('Props AddGroupScreen', this.props)
    const { submit, title,  colorT,
       good, status } = this.state
    const { navigation } = this.props
    const { container, fixToText,  textInput, textInput2, input,
      button, iconMin, sectionContainer, sectionTitle } = styles
      const { labelDropdown, label, label2} = globalStyles
    let dataStatus = [{
      value: GroupStatus.Public, }, {
      value: GroupStatus.Pravite, },];
    return (<View>
      <Header title='Добавить группу'
          leftIcon={backArrow}
          onPressLeft={() => {
            this.setClearState();
            navigation.goBack();
          }} />
      <ScrollView>
        <View style={container}>
          <View style={fixToText}>
            <View style={textInput}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={label}> Название <Text style={{ color: 'red' }}>*</Text></Text>
              </View>
              <TextInput
                style={input}
                onChangeText={this.onChangeTitle.bind(this)}
                placeholder='Название..'
                autoCorrect={true}
                value={title}
              />
            </View>
          </View>
          <View style={fixToText}>
            <View style={textInput2}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={label2}> Статус группы <Text style={{ color: 'red' }}>*</Text></Text>
              </View>
              <Dropdown
                data={dataStatus}
                onChangeText={this.onChangeStatus.bind(this)}
                value={status}
              />
              {/* placeholder='Выберите статус..' */}
            </View>
          </View>
        </View>

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
            {/* className={extendedIcon} */}
            {/* <Fab variant="extended">
        <Save />
        Сохранить
      </Fab> */}
          </View>
        </View>        
        <View style={{margin: 30}}><Text> </Text></View>
      </ScrollView>
    </View>

    );
  }

  private onChangeTitle(title: string) {
    this.setState({ title });
  }
  private onChangeStatus(status: string) {
    this.setState({ status });
  }


  private onSubmit() {
    //     e.preventDefault();
    const {  title,  good, status } = this.state
    
    const { navigation } = this.props
    var $this = this;
    var obj, url, log: string;
    //if (signup) {
      if ( !title || !status) {
        Alert.alert('Внимание', 'Не все поля заполнены!',
          [{ text: 'OK' }],
          { cancelable: false },
        );
        return;
      }
      // else if (year.length < 4 || year.length > 4) {
      //   Alert.alert('Внимание', 'Год должен иметь длину в 4 знака!',
      //     [{ text: 'OK' }],
      //     { cancelable: false },
      //   );
      //   this.setState({ good: false })
      //   return;
      // }
      
    // }
    //else 
    this.setState({ good: true, submit: true })
    obj = {
      Admin: store.state.userLogin.uid,
      Title: title,
      Home: navigation.state.params.uid,
      Status: status == GroupStatus.Public ? 1 : 2,
      Image: '5ddc6bd0-627b-42da-a603-d62adab55efe'
    }
    url = 'http://192.168.43.80:5000/api/groups/create/';
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
      appartament: '', title: '', floors: '', porches: '',
      year: '', status: '', colorT: '#000', colorPass: '#000',
      good: false, submit: false
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