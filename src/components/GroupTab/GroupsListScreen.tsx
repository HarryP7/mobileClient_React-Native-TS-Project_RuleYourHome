import * as React from 'react';
import {
  View,Text, ScrollView, ActivityIndicator,Image } from 'react-native';
import { Header, SearchHeader, GroupCard,  globalStyles } from '..';
import {  backArrow, search, rightBack } from '../../allSvg'
import { GroupPRO } from '../../routes';
import { ColorApp, serverUrl, BackgroundImage } from '../../constants';
import { useGlobal, store } from '../../store'
import { Group } from '../../interfaces'

interface State {
  data: Group[],
  dataOld: Group[],
  load: boolean,
  visibleSearch: boolean,
  text: string
}

class GroupScreen extends React.PureComponent<any, State> {
  state = { data: [], dataOld: [], load: false, visibleSearch: false, text: '' } as State
  
  componentDidMount = async () => {
    try {
      const { userLogin, token } = store.state;
      const response = await fetch(serverUrl+'groups',
      { headers: {  'Authorization': `Bearer ${token}` }})
      const data = await response.json()
      this.setState({ data, load: true, dataOld: data })
    } catch (e) {
      throw e
    }
  }

  onSearchGroup = (text: string) => {
    var txt: Group[] = this.state.dataOld;
    if(text){
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
    var localGroups = this.props.navigation.state.params 
    console.log("props", this.props)
    console.log("param: ", localGroups)
    return (<View>
      {visibleSearch ?
        <SearchHeader           
          rightIcon={rightBack}
          onChangeText={this.onSearchGroup}
          value={this.state.text}
          onPressRight={() => this.setState({visibleSearch: false, data: this.state.dataOld})}
          onBlur={() => this.setState({visibleSearch: false})}
        /> : 
        <Header title='Группы'          
        leftIcon={backArrow}
        onPressLeft={() => navigation.goBack()}
          rightIcon={search}
          onPressRight={() => this.setState({visibleSearch: true})}
        />
      }      
      <View>
      <Image source={BackgroundImage} style={im}></Image></View>
      <ScrollView >
        {load ?
          <View style={container}>
            {data.map(item => {
              return <GroupCard data={item} key={item.uid}
                onPress={() => navigation.navigate(GroupPRO, (item))} />//
            })}
          </View> :
          <ActivityIndicator style={indicator} size={50} color={ColorApp} />
        }
        <View style={{margin: 30}}><Text></Text></View>
      </ScrollView>
    </View>
    );
  }
}

export {GroupScreen} 