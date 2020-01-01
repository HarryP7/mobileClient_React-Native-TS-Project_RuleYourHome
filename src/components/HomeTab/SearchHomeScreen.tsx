import * as React from 'react';
import {
  View,Text, ScrollView, ActivityIndicator, Image, Alert, RefreshControl } from 'react-native';
import { Header, SearchHeader, HomeCard,  globalStyles } from '..';
import {  menu, search,backArrow, rightBack } from '../../allSvg'
import {  HOMEProfile } from '../../routes';
import { brown, serverUrl, BackgroundImage } from '../../constants';
import {  ListItem, Button, Icon } from 'react-native-elements'
import { Home } from '../../interfaces'
import { SvgXml } from 'react-native-svg';

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
      const data = await response.json()
      this.setState({ data, dataOld: data, load: true })
      console.log('Успех fetch '+logAction,data)
    } catch (error) {
      console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
      if (error == 'TypeError: Network request failed') {
        Alert.alert('Внимание', 'Сервер не доступен: ' + error, [{ text: 'OK' }]);
        
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
      ('г. '+el.city+', ул. '+el.street+', д.'+ el.homeNumber).toLowerCase().indexOf(text.toLowerCase()) > -1
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
    const dataR = [{ "admin": null, "adverts": [Array], "createdAt": "2019-11-15T00:00:00", "editedAt": "2019-11-15T00:00:00", "fk_Admin": "0000e0000-t0t-00t0-t000-00000000000", "fk_Home": null, "fk_Image": "5ddc6bd0-627b-42da-a603-d62adab55efe", "fk_Status": 1, "home": null, "image": { createdAt: "2019-11-15T00:00:00", removed: false, uid: "3f7d7280-dba7-4119-9cdf-71dd30647d6e", url: "https://i.ibb.co/c1Tc0Pp/house-1876063-960-720.jpg" }, "messages": [Array], "removed": false, "title": "Дом - Объявления", "uid": "3f685871-7ff7-4e1e-8280-f93064bd4f2a", "users": [Array] }, { "admin": null, "adverts": [Array], "createdAt": "2019-11-15T00:00:00", "editedAt": "2019-11-15T00:00:00", "fk_Admin": "0000e0000-t0t-00t0-t000-00000000000", "fk_Home": null, "fk_Image": "3f7d7280-dba7-4119-9cdf-71dd30647d6e", "fk_Status": 1, "home": null, "image": { createdAt: "2019-11-15T00:00:00", removed: false, uid: "5ddc6bd0-627b-42da-a603-d62adab55efe", url: "https://i.ibb.co/bQcGvqJ/yxz-Pf-v-Yy3g.jpg" }, "messages": [Array], "removed": false, "title": "1й подъезд - Объявления", "uid": "dac7bf05-4260-4d0f-9e32-d2eee80589db", "users": [Array] }]
    const { background, container, indicator, im } = globalStyles
    const { navigation } = this.props
    console.log('Rander Props: ',this.props)
    console.log('Rander Data: ',data)
    return (<View>
      {visibleSearch ?
       <SearchHeader           
         rightIcon={rightBack}
         onChangeText={this.onSearchHome.bind(this)}
         value={this.state.text}
         onPressRight={() => this.setState({visibleSearch: false, data: this.state.dataOld})}
         onBlur={() => this.setState({visibleSearch: false})}
       />  : 
        <Header title='Поиск дома'
          leftIcon={menu}
          onPressLeft={() => {
            navigation.openDrawer()
          }}
          rightIcon={search}
          onPressRight={() => this.setState({visibleSearch: true})}
        />        
      }      
      <View>
      <Image source={BackgroundImage} style={im}></Image>
      </View>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
      }
    >        
        {load ?
          <View style={container}>
            {data.map(item => {
              return <HomeCard data={item} key={item.uid}
                onPress={() => navigation.navigate(HOMEProfile, (item))} />//
            })}
          </View> :
          !loadError &&
          <ActivityIndicator style={indicator} size={50} color={brown} />
        }
        <View style={{margin: 30}}><Text></Text></View>
      </ScrollView>
    </View>
    );
  }
}



export {SearchHomeScreen} //connect(mapStateToProps,{searchChanged})