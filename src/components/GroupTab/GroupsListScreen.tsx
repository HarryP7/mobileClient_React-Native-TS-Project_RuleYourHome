import * as React from 'react';
import {
  View, Text, ScrollView, ActivityIndicator, Image
} from 'react-native';
import { Header, SearchHeader, GroupCard, globalStyles } from '..';
import { backArrow, search, rightBack } from '../../allSvg'
import { GroupPRO } from '../../Navigations/routes';
import { appColor, serverUrl, Background } from '../../constants';
import { useGlobal, store } from '../../store'
import { Group } from '../../interfaces'

interface State {
  data: Group[],
  dataOld: Group[],
  load: boolean,
  visibleSearch: boolean,
  text: string
}

class GroupListScreen extends React.PureComponent<any, State> {
  state = { data: [], dataOld: [], load: false, visibleSearch: false, text: '' } as State

  componentDidMount = async () => {
    try {
      const { userLogin, token } = store.state;
      var Fk_Home = this.props.route.params
      const response = await fetch(serverUrl + 'groups/home?Fk_Home=' + Fk_Home,
        { headers: { 'Authorization': `Bearer ${token}` } })
      const data = await response.json()
      console.log("Успех HomeGroups fetch: ", data)
      this.setState({ data, load: true, dataOld: data })
    } catch (e) {
      throw e
    }
  }

  onSearchGroup = (text: string) => {
    var txt: Group[] = this.state.dataOld;
    if (text) {
      var filtered = txt.filter((el) =>
        el.title.toLowerCase().indexOf(text.toLowerCase()) > -1);
      this.setState({ data: filtered, text });
    }
    else this.setState({ data: this.state.dataOld, text });
  }

  render() {
    const { data, load, visibleSearch } = this.state
    const { background, container, indicator, im } = globalStyles
    const { navigation } = this.props
    console.log("props", this.props)
    console.log("data: ", data)
    return (<View>
      {visibleSearch ?
        <SearchHeader
          rightIcon={'arrow-up'}
          onChangeText={this.onSearchGroup}
          value={this.state.text}
          onPressRight={() => this.setState({ visibleSearch: false, data: this.state.dataOld, text:'' })}
          onBlur={() => this.setState({ visibleSearch: false })}
          subjectSearch='группу'
        /> :
        <Header title='Группы'
          leftIcon={'arrow-left'}
          onPressLeft={() => navigation.goBack()}
          rightIcon={'search'}
          onPressRight={() => this.setState({ visibleSearch: true })}
        />
      }
      <View>
        {Background}</View>
      <ScrollView >
        {load ?
          <View style={container}>
            {data.map(item => {
              return <GroupCard data={item} key={item.uid}
                onPress={() => navigation.navigate(GroupPRO, (item))} />//
            })}
          </View> :
          <ActivityIndicator style={indicator} size={50} color={appColor} />
        }
        <View style={{ margin: 50 }}><Text></Text></View>
      </ScrollView>
    </View>
    );
  }
}

export { GroupListScreen } 