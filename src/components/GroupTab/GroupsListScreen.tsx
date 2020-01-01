import * as React from 'react';
import {
  View,Text, ScrollView, ActivityIndicator,Image } from 'react-native';
import { Header, SearchHeader, GroupCard,  globalStyles } from '..';
import {  backArrow, search, rightBack } from '../../allSvg'
import { GroupPRO } from '../../routes';
import { brown, serverUrl, BackgroundImage } from '../../constants';
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
    const dataR = [{ "admin": null, "adverts": [Array], "createdAt": "2019-11-15T00:00:00", "editedAt": "2019-11-15T00:00:00", "fk_Admin": "0000e0000-t0t-00t0-t000-00000000000", "fk_Home": null, "fk_Image": "5ddc6bd0-627b-42da-a603-d62adab55efe", "fk_Status": 1, "home": null, "image": { createdAt: "2019-11-15T00:00:00", removed: false, uid: "3f7d7280-dba7-4119-9cdf-71dd30647d6e", url: "https://i.ibb.co/c1Tc0Pp/house-1876063-960-720.jpg" }, "messages": [Array], "removed": false, "title": "Дом - Объявления", "uid": "3f685871-7ff7-4e1e-8280-f93064bd4f2a", "users": [Array] }, { "admin": null, "adverts": [Array], "createdAt": "2019-11-15T00:00:00", "editedAt": "2019-11-15T00:00:00", "fk_Admin": "0000e0000-t0t-00t0-t000-00000000000", "fk_Home": null, "fk_Image": "3f7d7280-dba7-4119-9cdf-71dd30647d6e", "fk_Status": 1, "home": null, "image": { createdAt: "2019-11-15T00:00:00", removed: false, uid: "5ddc6bd0-627b-42da-a603-d62adab55efe", url: "https://i.ibb.co/bQcGvqJ/yxz-Pf-v-Yy3g.jpg" }, "messages": [Array], "removed": false, "title": "1й подъезд - Объявления", "uid": "dac7bf05-4260-4d0f-9e32-d2eee80589db", "users": [Array] }]
    const { background, container, indicator, im } = globalStyles
    const { navigation } = this.props
    console.log(this.props)
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
          <ActivityIndicator style={indicator} size={50} color={brown} />
        }
        <View style={{margin: 30}}><Text></Text></View>
      </ScrollView>
    </View>
    );
  }
}

export {GroupScreen} 