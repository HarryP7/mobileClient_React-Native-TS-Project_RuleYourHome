import React, { Component } from 'react';
import {
    View, Text, ScrollView, Image, ActivityIndicator, Button, Alert, RefreshControl, Route
} from 'react-native';
import { Header, AdvertCard, globalStyles } from '..';
import { AddADVERT, ADVERTPro } from '../../Navigations/routes';
import { useGlobal, store } from '../../store'
import { Role } from '../../enum/Enums';
import { serverUrl, appColor, NoFoto, w, Background } from '../../constants';
import { Advert, Group } from '../../interfaces';

interface Props { }

interface State {
    fk_Status: boolean,
    adverts: Advert[],
    load: boolean,
    refreshing: boolean,
}
class GroupProfile extends Component<any, Props, State> {
    state = {
        fk_Status: false, adverts: [], load: false, refreshing: false,
    } as State

    componentDidMount = async () => {
        console.log(this.props.navigation)
        try {
            const { userLogin, token } = store.state;
            var { uid } = this.props.route.params
            const response = await fetch(serverUrl + 'adverts?Fk_Group=' + uid,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            const dAdv: Advert[] = await response.json()
            var adverts: Advert[] = [];
            dAdv.forEach((adv: Advert) => {
                adv.lg = this.props.route.params
                adverts.push(adv)
            });
            this.setState({ adverts, load: true })
        } catch (e) {
            throw e
        }
    }

    render() {
        const { button2, images, h1, container, indicator } = globalStyles
        const { uid, title, image, fk_Supervisor } = this.props.route.params
        const { navigation } = this.props
        const { adverts, load, refreshing, fk_Status } = this.state
        const { userLogin, token } = store.state;
        return (
            <View >
                <Header title='Группа'
                    leftIcon={'arrow-left'}
                    onPressLeft={() => navigation.goBack()} />
                <View>
                    {Background}
                </View>
                <ScrollView refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
                    }>
                    <Image source={{ uri: image ? image.url : NoFoto }}
                        style={images} />
                    <Text style={h1}>{title} </Text>
                    <View style={{ width: 150, alignSelf: 'center' }}>
                    </View>
                    <View style={button2}>
                        <View style={{ width: w * 0.42 }}>
                            {(userLogin.fk_Role == Role.admin || userLogin.uid == fk_Supervisor) ?
                                <Button
                                    title='Добавить'
                                    onPress={() => navigation.navigate(AddADVERT, (uid))}//navigation.navigate(GroupPRO, (adverts))
                                    color={appColor} />
                                : <Button
                                    title='Присоединиться'
                                    onPress={() => this.onJoin(userLogin.uid)}
                                    color={appColor} />
                            }
                        </View>
                        <View style={{ width: w * 0.42 }}>
                            <Button
                                title='Обсуждения'
                                onPress={this.onDiscussions}
                                color={appColor} />
                        </View>
                    </View>
                    {load ?
                        <View style={container}>
                            {adverts.map(adv => {
                                return <AdvertCard data={adv} key={adv.uid}
                                    onPress={() => navigation.navigate(ADVERTPro, (adv))} />//navigation.navigate(GroupPRO, (item))
                            })}
                        </View>
                        : <ActivityIndicator style={[indicator, { marginTop: w + 20 }]} size={50} color={appColor} />
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