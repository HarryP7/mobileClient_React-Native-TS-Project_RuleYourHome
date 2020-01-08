import React, { Component } from 'react';
import {
    View, Text, ScrollView, Image, ActivityIndicator, Button, Alert, RefreshControl
} from 'react-native';
import { backArrow } from '../../allSvg'
import { Header, AdvertCard, globalStyles } from '..';
import { AddADVERT, ADVERTPro } from '../../routes';
import { useGlobal, store } from '../../store'
import { Role } from '../../enum/Enums';
import { serverUrl, ColorApp, NoFoto, w } from '../../constants';
import { Voting } from '../../interfaces';

interface Props { }

interface Advert {
    uid: string,
    title: string,
    text: string,
    fk_Author: string,
    fk_Image: string,
    fk_Category: number,
    Fk_LocalGroup: string,
    createdAt: Date,
    editedAt: Date,
    removed: boolean,
    voting: Voting[]
}

interface State {
    adverts: Advert[],
    load: boolean,
    refreshing: boolean,
}
class GroupProfile extends Component<any, Props, State> {
    state = { adverts: [], load: false, refreshing: false,  } as State

    componentDidMount = async () => {
        console.log(this.props.navigation)
        try {
            const { userLogin, token } = store.state;
            const { uid } = this.props.navigation.state.params
            const response = await fetch(serverUrl+'adverts?Fk_Group='+ uid,
            { headers: {  'Authorization': `Bearer ${token}` }
            })
            const adverts: Advert[] = await response.json()
            this.setState({ adverts, load: true })
        } catch (e) {
            throw e
        }
    }

    render() {
        const { button2, images, h1, container, indicator } = globalStyles
        const { uid, title, image, fk_Supervisor } = this.props.navigation.state.params        
        const { navigation } = this.props
        const { adverts, load, refreshing } = this.state
        const { userLogin, token } = store.state;
        return (
            <View >
                <Header title='Группа' 
                    leftIcon={backArrow}
                    onPressLeft={() => navigation.goBack()} />
                    <ScrollView
                      refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
                      }
                    >
                    <Image source={{ uri: image ? image.url : NoFoto }}
                        style={images} />
                    <Text style={h1}>{title} </Text>
                    <View style={{ width: 150, alignSelf: 'center' }}>
                    </View>
                    <View style={button2}>
                        <View style={{ width: 150 }}>
                            {(userLogin.fk_Role == Role.admin || userLogin.uid == fk_Supervisor )?
                            <Button
                                title='Добавить'
                                onPress={() => navigation.navigate(AddADVERT, (uid))}//navigation.navigate(GroupPRO, (adverts))
                                color={ColorApp} />
                            : <Button
                            title='Приосединиться'
                            onPress={() => this.onJoin(userLogin.uid)}
                            color={ColorApp} />
                            }
                        </View>
                        <View style={{ width: 150 }}>
                            <Button
                                title='Обсуждения'
                                onPress={this.onDiscussions}
                                color={ColorApp} />
                        </View>
                    </View>
                    {load ?
                        <View style={container}>
                            {adverts.map(item => {
                                return <AdvertCard data={item} key={item.uid}
                                    onPress={() => navigation.navigate(ADVERTPro, (item))} />//navigation.navigate(GroupPRO, (item))
                            })}
                        </View>
                        : <ActivityIndicator style={[indicator,{marginTop: w + 20}]} size={50} color={ColorApp} />
                    }                    
                    <View style={{ margin: 30 }}><Text> </Text></View>
                </ScrollView>
            </View>
        );
    }
    private async onRefresh() {
      this.setClearState();
      this.componentDidMount();
    }
    private setClearState() {
      this.setState({
        adverts: [], load: false, refreshing: false,
      })
    }
    private onJoin(uid: string) {

        console.log('onPress Присоединиться')
    }
    private onDiscussions() {
        console.log('onPress Обсуждения')
    }
}

export { GroupProfile };