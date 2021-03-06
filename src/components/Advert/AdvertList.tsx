import React, { Component } from 'react';
import {
    View, Text, ScrollView, Image, ActivityIndicator, Button, Alert, RefreshControl, Route, TouchableOpacity
} from 'react-native';
import { Header, AdvertCard, globalStyles } from '..';
import { AddADVERT, ADVERTPro } from '../../Navigations/routes';
import { useGlobal, store } from '../../store'
import { serverUrl, appColor, NoFoto, w, Background } from '../../constants';
import { Group, Advert, advert } from '../../interfaces';

interface Props { }

interface State {
    fk_Status: boolean,
    adverts: Advert[],
    localGroups: Group[],
    load: boolean,
    refreshing: boolean,
}
class AdvertList extends Component<any, Props, State> {
    state = {
        fk_Status: false, adverts: [], localGroups: [], load: false, refreshing: false,
    } as State

    componentDidMount = async () => {
        console.log(this.props.navigation)
        try {
            const { userLogin, token } = store.state;
            const response = await fetch(serverUrl + 'adverts/list?Fk_Home=' + userLogin.fk_Home,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            var localGroups: Group[] = await response.json()
            var adverts: Advert[] = [];
            localGroups.forEach((lg: Group) => {
                lg.adverts.forEach((adv: Advert) => {
                    adv.lg = lg
                    adverts.push(adv)
                })
            });
            adverts.sort(function(a, b){
                var dateA=new Date(a.createdAt), dateB=new Date(b.createdAt)
                return dateB.getTime()-dateA.getTime()
            })
            this.setState({ adverts, localGroups, load: true })
        } catch (e) {
            throw e
        }
    }

    render() {
        const { button2, images, h1, container, indicator } = globalStyles
        const { navigation } = this.props
        const { localGroups, adverts, load, refreshing, fk_Status } = this.state
        return (
            <View >
                <Header title='Объявления дома' position='center' />
                    {!load && Background}    
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
                    }
                >
                    {load ?
                        adverts.map((adv: Advert) => {
                            return <AdvertCard data={adv} key={adv.uid}
                                onPress={() => navigation.navigate('ADVERTPro', (adv))}
                                onMoveGroup={() => navigation.navigate('GroupPRO', (adv.lg))} />
                        })
                        : <ActivityIndicator style={[indicator, { marginTop: w + 20 }]} size={50} color={appColor} />
                    }
                    <View style={{ margin: 20 }}><Text> </Text></View>
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
}

export { AdvertList };