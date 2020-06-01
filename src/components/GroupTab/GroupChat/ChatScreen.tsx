import React, { Component } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, ScrollView,
    ActivityIndicator, Button, RefreshControl, Alert, Keyboard, Linking, StatusBar
} from 'react-native';
import { Header, globalStyles } from '../../';
import { h, w, appColor, NoFoto, serverUrl, months, BackgroundWhite, NoAvatar, ApiKeyImage } from '../../../constants'
import { store } from '../../../store';
import { advert, Voting, Answer, Advert, Voted, AdvertsReview, GroupChat, ImageService, UserData } from '../../../interfaces';
import { RadioButton, ProgressBar, Card, TextInput, IconButton, Avatar, Paragraph, Appbar } from 'react-native-paper';
import { Bubble, GiftedChat, SystemMessage, IMessage, Send } from 'react-native-gifted-chat'
import ImagePicker from 'react-native-image-picker';
import { SvgXml } from 'react-native-svg';
import { backArrow } from '../../../allSvg';

interface Props { }
interface State {
    data: GroupChat[],
    message: string,
    submit: boolean,
    load: boolean,
    loadError: boolean,
    refreshing: boolean,
    inverted: boolean,
    step: number,
    messages: IMessage[],
    imageSource: string,
    imageName: string,
    loadEarlier: boolean,
    isLoadingEarlier: boolean,
    isTyping: boolean
    user: UserData
}
const initUser = {
    _id: '',
    name: '',
    avatar: '',
}
const otherUser = {
    _id: 2,
    name: '',
    avatar: '',
}
const options = {
    title: 'Выберите фото',
    takePhotoButtonTitle: 'Открыть камеру',
    chooseFromLibraryButtonTitle: 'Выбрать из галереи',
    //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    cancelButtonTitle: 'Отмена'
};

class ChatScreen extends Component<any, State, Props> {
    state = {
        data: [], message: '', user: initUser, submit: false, load: false, loadError: false,
        refreshing: false, inverted: false, step: 0, messages: [], imageSource: '', imageName: '', loadEarlier: true,
        isLoadingEarlier: false, isTyping: false
    } as State

    _isMounted = false
    componentDidMount = async () => {
        this._isMounted = true
        // console.log('props: ', this.props)
        console.log(' props.params: ', this.props.route.params)
        var logAction = 'Обсуждения';
        const uid = this.props.route.params
        const { userLogin, token } = store.state;
        const user = {
            _id: userLogin.uid,
            name: userLogin.fullName,
            avatar: userLogin.avatar ? userLogin.avatar.url : NoAvatar,
        }
        this.setState({ loadError: false, load: false, isTyping: false, user })
        console.log('userLogin ', userLogin)
        try {
            if (token) {
                const response = await fetch(serverUrl + 'groups/chat?Fk_Group=' + uid,
                    {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                if (response.status == 200) {
                    const data: GroupChat[] = await response.json()
                    console.log('Успех fetch ' + logAction)
                    const messages: IMessage[] = [];
                    data.forEach((el: GroupChat) => {
                        var d = new Date(el.createdAt);
                        // console.log('userUid:' +el.fK_Author)
                        messages.push({
                            _id: el.uid, text: el.text, createdAt: d.setHours(d.getUTCHours()),
                            user: {
                                _id: el.fk_Author, name: el.author.fullName,
                                avatar: el.author.avatar ? el.author.avatar.url : NoAvatar,
                            }, image: el.image ? el.image.url : '', sent: true, received: true,
                        })
                    })
                    this.setState({ messages, step: messages.length, load: true, isLoadingEarlier: false })
                }
                else if (response.status == 404) {
                    console.log('Внимание', 'Чат не найден Fk_Group=' + uid);
                    this.setState({ loadError: true })
                }
            }
            else {
                console.log('Внимание', 'token=' + token);
            }
        } catch (error) {
            console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
            if (error == 'TypeError: Network request failed') {
                Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);

                this.setState({ loadError: true })
            }
            else if (error.status == 404) {
                console.log('Внимание', 'Чат не найден: ' + error, [{ text: 'OK' }]);
            }
            else {
                Alert.alert('Внимание', 'Ошибка сервера: ' + error, [{ text: 'OK' }]);
            }
            this.setState({ loadError: true })
            return
        }
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    onLoadEarlier = () => {
        this.setState({ isLoadingEarlier: true })
        this.onRefresh()
    }
    parsePatterns = (_linkStyle: any) => {
        return [
            {
                pattern: /#(\w+)/,
                style: { textDecorationLine: 'underline', color: 'darkorange' },
                onPress: () => Linking.openURL('http://gifted.chat'),
            },
        ]
    }
    onReceive = (text: string) => {
        this.setState((previousState: any) => {
            return {
                messages: GiftedChat.append(
                    previousState.messages as any,
                    [
                        {
                            _id: Math.round(Math.random() * 1000000),
                            text,
                            createdAt: new Date(),
                            user: otherUser,
                        },
                    ],
                ),
            }
        })
    }
    onSendFromUser = (messages: IMessage[] = []) => {
        const { user } = this.state
        const createdAt = new Date()
        const messagesToUpload = messages.map(message => ({
            ...message,
            user,
            createdAt,
            _id: Math.round(Math.random() * 1000000),
        }))
        this.onSend(messagesToUpload)
    }

    setIsTyping = () => {
        this.setState({
            isTyping: !this.state.isTyping,
        })
    }

    renderBubble = (props: any) => {
        return <Bubble {...props} />// textStyle={{ right: { color: 'black', }}} wrapperStyle={{ right: { backgroundColor: '#99c2ff' } }}/>
    }

    renderSystemMessage = (props: any) => {
        return (
            <SystemMessage {...props} containerStyle={{ marginBottom: 15, }}
                textStyle={{ fontSize: 14, }}
            />
        )
    }
    renderCustomView(props: any) {
        return <View {...props} style={{ backgroundColor: '#aaa' }} />
    }

    onQuickReply = (replies: any) => {
        const { user } = this.state
        const createdAt = new Date()
        if (replies.length === 1) {
            this.onSend([
                {
                    createdAt,
                    _id: Math.round(Math.random() * 1000000),
                    text: replies[0].title,
                    user,
                },
            ])
        } else if (replies.length > 1) {
            this.onSend([
                {
                    createdAt,
                    _id: Math.round(Math.random() * 1000000),
                    text: replies.map((reply: any) => reply.title).join(', '),
                    user,
                },
            ])
        } else {
            console.warn('replies param is not set correctly')
        }
    }

    renderQuickReplySend = () => <Text>{' custom send =>'}</Text>

    renderSend = (props: Send['props']) => (
        <Send {...props} containerStyle={{ justifyContent: 'center' }}>
            <IconButton icon="send" //onPress={() => { this.onSendPress() }}
                size={30} color={appColor} style={{ margin: 0 }} />
        </Send>
    )

    onSend(messages: IMessage[]) {
        this.setState((previousState: any) => {
            const sentMessages = [{ ...messages[0], sent: true, received: true }]
            return { messages: GiftedChat.append(previousState.messages, sentMessages) }
        })
        Keyboard.dismiss()
        this.onSendPress()
    }
    // renderAccessory = () => (
    //     <AccessoryBar onSend={this.onSendFromUser} isTyping={this.setIsTyping} />
    //   )
    renderCustomActions = (props: any) =>
        <Send {...props} containerStyle={{ justifyContent: 'center' }}>
            <IconButton icon="image-outline" onPress={() => { this.imagePicker() }}
                size={30} color={appColor} style={{ margin: 0 }} />
        </Send>


    render() {
        const { userLogin, token } = store.state;
        const { navigation } = this.props
        const { load, loadError, user, messages } = this.state
        const { im, h1, h3, indicator, sub, inputStyle, inputPaperWhite } = globalStyles
        const { iconLeftStyle, containerBtn, category, cardStyle, сommentCardStyle, сommentStyle } = styles
        return (<View style={{ display: 'flex', height: '100%' }}>
            <Header title='Обсуждения'
                leftIcon={'arrow-left'}
                onPressLeft={navigation.goBack} />
            {/* <StatusBar backgroundColor={appColor} barStyle="light-content" />
            <Appbar.Header
                style={{ backgroundColor: appColor, display: 'flex' }}>
                {/* <TouchableOpacity onPress={() => navigation.goBack()} style={containerBtn}>
                    <SvgXml xml={backArrow} style={iconLeftStyle} fill='white' />
                </TouchableOpacity> *
                <IconButton icon="arrow-left" onPress={navigation.goBack}
                size={30} color={'white'} style={{ margin: 0,display: 'flex', position: 'absolute', top: 7, left: 10 }} />
                <Appbar.Content title={'Обсуждения'} titleStyle={{ fontSize: 22, marginLeft: 50  }} />
            </Appbar.Header> */}
            {BackgroundWhite}
            <GiftedChat
                user={user}
                messages={messages}
                onSend={this.onSend.bind(this)}
                loadEarlier={this.state.loadEarlier}
                onLoadEarlier={this.onLoadEarlier}
                isLoadingEarlier={this.state.isLoadingEarlier}
                parsePatterns={this.parsePatterns}
                scrollToBottom
                //onLongPressAvatar={() => console.log('long press')}
                onPressAvatar={user => navigation.navigate('PROFILE', (user._id))}
                onQuickReply={this.onQuickReply}
                keyboardShouldPersistTaps='never'
                // renderAccessory={this.renderAccessory}
                //renderCustomView={this.renderCustomView}
                renderActions={this.renderCustomActions}
                renderBubble={this.renderBubble}
                renderSystemMessage={this.renderSystemMessage}
                renderSend={this.renderSend}
                onInputTextChanged={this.onChangeMessage.bind(this)}
                quickReplyStyle={{ borderRadius: 2 }}
                renderQuickReplySend={this.renderQuickReplySend}
                timeTextStyle={{ left: { color: 'grey' }, right: { color: '#eee' } }}
                isTyping={this.state.isTyping}
                infiniteScroll
                placeholder='Введите сообщение..'
                alwaysShowSend={true}
                locale={require('dayjs/locale/ru')}
                // renderLoading={this.renderLoading.bind(this)}
                isCustomViewBottom={true}
            // renderMessage={}
            />
            {/* {(!messages && !load) && !loadError && 
                <ActivityIndicator style={{ marginTop: h * 0.2, alignSelf: "center", position: 'absolute' }} size={50} color={appColor} />} */}

        </View>
        );
    }

    private imagePicker() {
        ImagePicker.showImagePicker(options, (resp) => {
            console.log('Response = origURL:', resp.origURL + ' path:' + resp.path
                + ' uri:' + resp.uri + ' fileName:' + resp.fileName);
            if (resp.didCancel) {
                console.log('User cancelled image picker');
            } else if (resp.error) {
                console.log('ImagePicker Error: ', resp.error);
            } else if (resp.customButton) {
                console.log('User tapped custom button: ', resp.customButton);
            } else {
                this.SendPicture(resp.data, resp.fileName)
            }
        });
    }

    private async SendPicture(data: string, fileName: string | undefined) {
        const { user } = this.state
        var logAction = 'Отправление картинки'
        const imgData = new FormData()
        imgData.append('image', data)
        var url = 'https://api.imgbb.com/1/upload?key=' + ApiKeyImage
        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                body: imgData
            })
            if (response.status == 200) {
                const dataImg: ImageService = await response.json()
                console.log('Успех fetch ' + logAction, dataImg)
                var urlImg = dataImg.data.url
                var msg = {
                    _id: Math.round(Math.random() * 10000),
                    createdAt: new Date(),
                    text: '',
                    user: user
                }
                this.setState((previousState: any) => {
                    const sentMessages = [{ ...msg, sent: true, received: true, image: urlImg }]
                    return { messages: GiftedChat.append(previousState.messages, sentMessages), }
                })
                this.setState({ imageSource: urlImg })
                this.onSendPress()
            }
            else {
                console.log('Внимание', response);
                this.setState({ loadError: true })
            }

        } catch (error) {
            console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
            if (error == 'TypeError: Network request failed') {
                Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);

                this.setState({ loadError: true })
            }
            else if (error.status == 404) {
                console.log('Внимание', 'Обьявление не найдено: ' + error, [{ text: 'OK' }]);
            }
            else {
                Alert.alert('Внимание', 'Ошибка сервера: ' + error, [{ text: 'OK' }]);
            }
            this.setState({ loadError: true })
            return
        }
    }

    private onChangeMessage(message: string) {
        this.setState({ message })
    }

    private async onSendPress() {
        const { imageSource, message, messages } = this.state
        var logAction = 'Отправление сообщения'
        try {
            const { userLogin, token } = store.state;
            const uid = this.props.route.params
            var obj = {
                Fk_Author: userLogin.uid,
                Message: message,
                Image: imageSource,
                Fk_Group: uid,
            }
            if (token) {
                this.setState({ imageSource: '' })

                var url = serverUrl + 'groups/saveMessage'
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(obj)
                })
                if (response.status == 200) {
                    // messages[0].received = true
                    // this.setState({messages})
                    const dataNew: GroupChat = await response.json()
                    console.log('Успех fetch ' + logAction, dataNew)
                }
                else if (response.status == 404) {
                    console.log('Внимание', 'response=' + response.status + ' ' + response.statusText);
                    this.setState({ loadError: true })
                }
                else {
                    console.log('Внимание', 'status=' + response.status + ' ' + response.statusText);
                    this.setState({ loadError: true })
                }
            }
        } catch (error) {
            console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
            if (error == 'TypeError: Network request failed') {
                Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);

                this.setState({ loadError: true })
            }
            else if (error.status == 404) {
                console.log('Внимание', 'Обьявление не найдено: ' + error, [{ text: 'OK' }]);
            }
            else {
                Alert.alert('Внимание', 'Ошибка сервера: ' + error, [{ text: 'OK' }]);
            }
            this.setState({ loadError: true })
            return
        }
    }



    private async onRefresh() {
        this.setClearState();
        this.componentDidMount();
    }
    private setClearState() {
        this.setState({
            data: [], message: '', submit: false, load: false, loadError: false,
            refreshing: false,
        })
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    dateStyle: {
        marginHorizontal: 15,
        color: 'grey'
    },
    time: {
        margin: 3,
        marginLeft: -10,
        padding: 1,
        color: 'grey'
    },
    iconLeftStyle: {
        width: 20,
        height: 20,
    },
    containerBtn: {
        //backgroundColor: 'gold',
        padding: 20,
        borderRadius: 35,
    },
    fixToText: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        marginVertical: 30,
        width: 160,
        marginRight: 20
    },
    label: {
        marginBottom: 1,
        marginHorizontal: 16,
        fontSize: 16,
        fontWeight: 'bold',
    },
    label2: {
        marginTop: 10,
        color: 'grey',
        fontSize: 14,
        textAlign: 'center'
    },
    label3: {
        marginTop: -10,
        marginBottom: 5,
        fontSize: 16,
    },
    label4: {
        marginVertical: 5,
        fontSize: 17,
    },
    label5: {
        marginHorizontal: 15,
        fontSize: 16,
    },
    inputMultiline: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10
        // alignContent: 'flex-start',
    },
    textInput: {
        width: w * 0.9,
    },
    iconButton2: {
        width: 20,
        height: 20,
        marginLeft: 20,
    },
    iconButton1: {
        width: 30,
        height: 30,
        marginLeft: 20,
    },
    iconButton: {
        width: 40,
        height: 40,
        marginLeft: 20,
    },
    sectionTitle: {
        fontSize: 18,
        paddingLeft: 10,
        color: '#fff',
    },
    addPosition: {
        flexDirection: 'row',
        //marginBottom: 20,
        marginRight: 20,
        alignItems: 'center',
    },
    top: {
        marginTop: 10
    },
    optionCont: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    optionNonCont: {
        // flexDirection: 'row',
        // marginHorizontal: 5,
        height: 45
    },
    optionText: {
        paddingTop: 6,
        fontSize: 16
    },
    btnCont: {
        margin: 10
    },
    progress: {
        height: 10,
        marginHorizontal: 15,
        borderRadius: 10
    },
    category: {
        backgroundColor: '#15a009',
        borderRadius: 6,
        color: '#fff',
        margin: 3,
        marginLeft: 15,
        paddingVertical: 1,
        paddingHorizontal: 7
    },
    votings: {
        backgroundColor: '#2D3AF2',
        borderRadius: 6,
        color: '#fff',
        margin: 3,
        paddingVertical: 1,
        paddingHorizontal: 7
    },
    cardStyle: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        margin: 0,
        borderRadius: 0,
        // borderWidth: 1,
        // borderColor: '#ddd'
    },
    сommentStyle: {
        fontSize: 15,
        backgroundColor: 'white',
        width: w * 0.85,
        marginLeft: 10
    },
    сommentCardStyle: {
        margin: 0,
        width: w,
        padding: 0,
        // paddingBottom:10,
        alignSelf: 'flex-end'
    },
    cardComment: { marginHorizontal: 0, paddingHorizontal: 5, borderRadius: 0 }
})

export { ChatScreen }

