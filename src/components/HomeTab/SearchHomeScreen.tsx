import * as React from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { SearchHeader, HomeCard, globalStyles } from '..';
import { HOMEProfile } from '../../Navigations/routes';
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
  state = {
    data: [], dataOld: [], load: false, visibleSearch: false,
    text: '', refreshing: false, loadError: false
  } as State

  componentDidMount = async () => {
    this.setState({ loadError: false })
    var logAction = 'home all';

    try {
      const response = await fetch(serverUrl + 'home/all')
      if (response.status == 200) {
        const data = await response.json()
        this.setState({ data, dataOld: data, load: true })
        console.log('Успех fetch ' + logAction, data)
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
    if (text) {
      var arr = text.split(' ')
      var result
      var filtered = txt.filter((el) => el.city.toLowerCase().includes(arr[0].toLowerCase()))
      console.log('filtered1', filtered)
      result = filtered
      if (arr.length == 2 || arr.length == 3) {
        filtered = txt.filter((el) => el.city.toLowerCase().includes(arr[0].toLowerCase()) && 
        el.street.toLowerCase().includes(arr[1].toLowerCase()+(arr.length == 3 ? ' '+arr[2].toLowerCase(): '')))
        result = filtered
        console.log('filtered2', filtered)
      }
      var r = /\d+/
      var num = parseInt(text.replace(/[^\d]/g, ''))
      if (num) {
        filtered = txt.filter(el => el.homeNumber == num.toString())
        result = filtered == [] ? result : result.concat(filtered)
        console.log('filtered3', filtered)
      }

      result = result.filter((el, ind, self) => { return self.indexOf(el) == ind })

      this.setState({ data: result, text });
    }
    else this.setState({ data: this.state.dataOld, text });
  }

  private async onRefresh() {
    this.setClearState();
    this.componentDidMount();
  }
  private setClearState() {
    this.setState({ data: [], dataOld: [], load: false, visibleSearch: false, text: '', refreshing: false })
  }

  render() {
    const { data, load, visibleSearch, refreshing, loadError } = this.state
    const { background, container, indicator, im } = globalStyles
    const { navigation } = this.props
    console.log('Rander Props: ', this.props)
    console.log('Rander Data: ', data)
    return (<View>

      <SearchHeader
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
        <View style={{ margin: 30 }}><Text></Text></View>
      </ScrollView>
    </View>
    );
  }
}



export { SearchHomeScreen } //connect(mapStateToProps,{searchChanged})