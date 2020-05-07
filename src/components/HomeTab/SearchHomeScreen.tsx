import * as React from 'react';
import { View,Text, ScrollView, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { SearchHeader, HomeCard,  globalStyles } from '..';
import {  HOMEProfile } from '../../Navigations/routes';
import { appColor, serverUrl, Background, h, w } from '../../constants';
import { Home } from '../../interfaces'

interface State {
  data: Home[],
  dataOld: Home[],
  load: boolean,
  visibleSearch: boolean,
  text: string,
  refreshing: boolean,
  loadError: boolean
}

class SearchHomeScreen extends React.PureComponent<any, State> {
  state = { data: [], dataOld: [], load: false, visibleSearch: false, 
    text: '', refreshing: false, loadError: false } as State
  
  componentDidMount = async () => {
    this.setState({loadError: false})
    var logAction = 'home all';
    
    try {
      const response = await fetch(serverUrl+'home/all')
      if (response.status == 200) {
      const data = await response.json()
      this.setState({ data, dataOld: data, load: true })
      console.log('Успех fetch '+logAction, data)      
    }
    } catch (error) {
      console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
      if (error == 'TypeError: Network request failed') {
        Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);
        
      this.setState({ loadError: true })
      }
      else {
        Alert.alert('Внимание', 'Ошибка сервера: ' + error, [{ text: 'OK' }]);
      }
      this.setState({ loadError: true })
      return
    }
  }

  onSearchHome = (text: string) => {
    var txt: Home[] = this.state.dataOld;
    if(text){
      var filtered = txt.filter((el) =>
      ('г. '+el.city+', '+el.street+', д.'+ el.homeNumber).toLowerCase().indexOf(text.toLowerCase()) > -1
        );     
      this.setState({ data: filtered, text });
      }
      else this.setState({ data: this.state.dataOld, text });
  }

  private async onRefresh() {
    this.setClearState();   
    this.componentDidMount();     
  }
  private setClearState() {
   this.setState({ data: [], dataOld: [], load: false, visibleSearch: false, text: '', refreshing: false})  
  }

  render() {
    const { data, load, visibleSearch, refreshing, loadError } = this.state
    const { background, container, indicator, im } = globalStyles
    const { navigation } = this.props
    console.log('Rander Props: ',this.props)
    console.log('Rander Data: ',data)
    return (<View>
      
       <SearchHeader           
          // leftIcon={'menu'}
          // onPressLeft={() => {
          //   navigation.openDrawer()
          // }}
         onChangeText={this.onSearchHome.bind(this)}
         value={this.state.text}
         subjectSearch='адрес'
       />    
      <View>
      {Background}
      </View>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
      }
    >        
        {load ?
            data.map(item => {
              return <HomeCard data={item} key={item.uid}
                onPress={() => navigation.navigate(HOMEProfile, (item))} />//
            }) :
          <View>
          {Background}
          {!loadError && <ActivityIndicator style={indicator} size={50} color={appColor} />}
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
            }
          >
            <View style={{ marginBottom: h }}>
              <Text> </Text>
            </View>
          </ScrollView>
        </View>
        }
        <View style={{margin: 30}}><Text></Text></View>
      </ScrollView>
    </View>
    );
  }
}



export {SearchHomeScreen} //connect(mapStateToProps,{searchChanged})