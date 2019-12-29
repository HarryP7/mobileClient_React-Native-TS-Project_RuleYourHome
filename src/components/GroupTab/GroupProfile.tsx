import React, { Component } from 'react';
import {
    View, Text, ScrollView, Image, ActivityIndicator, Button
} from 'react-native';
import { backArrow } from '../../allSvg'
import { Header, AdvertCard, globalStyles } from '..';
import { AddADVERT } from '../../routes';
import { useGlobal, store } from '../../store'

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
    removed: boolean
}

interface State {
    adverts: Advert[],
    load: boolean,
}
class GroupProfile extends Component<any, Props, State> {
    state = { adverts: [], load: false } as State

    componentDidMount = async () => {
        try {
            const { userLogin, token } = store.state;
            const response = await fetch('http://192.168.43.80:5000/api/adverts',
            { headers: {  'Authorization': `Bearer ${token}` }
            })
            const adverts = await response.json()
            this.setState({ adverts, load: true })
        } catch (e) {
            throw e
        }
    }

    render() {
        const { button2, images, h1, container, indicator } = globalStyles
        const { title, image } = this.props.navigation.state.params
        console.log(this.props.navigation)
        const { navigation } = this.props
        const { adverts, load } = this.state
        return (
            <View >
                <Header title='Группа' 
                    leftIcon={backArrow}
                    onPressLeft={() => navigation.goBack()} />
                <ScrollView>
                    <Image source={{ uri: image.url }}
                        style={images} />
                    <Text style={h1}>{title} </Text>
                    <View style={{ width: 150, alignSelf: 'center' }}>
                    </View>
                    <View style={button2}>
                        <View style={{ width: 150 }}>
                            <Button
                                title='Добавить'
                                onPress={() => navigation.navigate(AddADVERT, (adverts))}//navigation.navigate(GroupPRO, (adverts))
                                color='#92582D' />
                        </View>
                        {/* <Button
                        title='Присоединиться'
                        onPress={this.onJoin}
                        color='#92582D' /> */}
                        <View style={{ width: 150 }}>
                            <Button
                                title='Обсуждения'
                                onPress={this.onDiscussions}
                                color='#92582D' />
                        </View>
                    </View>
                    {load ?
                        <View style={container}>
                            {adverts.map(item => {
                                return <AdvertCard data={item} key={item.uid}
                                    onPress={() => console.log('onPress AdvertCard')} />//navigation.navigate(GroupPRO, (item))
                            })}
                        </View>
                        : <ActivityIndicator style={indicator} size={50} color="#92582D" />
                    }                    
                    <View style={{ margin: 30 }}><Text> </Text></View>
                </ScrollView>
            </View>
        );
    }
    private onJoin() {
        console.log('onPress Присоединиться')
    }
    private onDiscussions() {
        console.log('onPress Обсуждения')
    }
}

export { GroupProfile };