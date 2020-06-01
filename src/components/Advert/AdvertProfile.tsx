import React, { Component } from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, ScrollView,
    ActivityIndicator, RefreshControl, Alert, Keyboard
} from 'react-native';
import { Header, globalStyles } from '..';
import { backArrow } from '../../allSvg'
import { HomeStatus, Role, Category } from '../../enum/Enums';
import { h, w, appColor, NoFoto, serverUrl, months, Background, NoAvatar } from '../../constants'
import { Badge, Divider, CheckBox, Input } from 'react-native-elements';
import { store } from '../../store';
import { advert, Voting, Answer, Advert, Voted, AdvertsReview } from '../../interfaces';
import { RadioButton, ProgressBar, Card, Button, TextInput, IconButton, Avatar, Paragraph } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface AdvertData {
    advert: Advert,
    voting: Voting[],
    reviews: AdvertsReview[]
}
interface СheckedOp {
    checked: boolean[],
    uid: string[]
}
interface Props { }
interface State {
    advert: Advert,
    voting: Voting[],
    reviews: AdvertsReview[],
    submit: boolean,
    load: boolean,
    loadError: boolean,
    refreshing: boolean,
    option: string[],
    checkedOps: boolean[],
    uidChecked: string[],
    voted: boolean,
    vote: Vote,
    comment: string,
    fkAnswer: string,
    commentBottom: number
}
var initCh: СheckedOp[] = [{
    checked: [],
    uid: []
}];

var initVote: Vote = {
    option: [],
    checkOp: [],
    yourOption: [],
    fk_Voting: ''
}
interface Vote {
    option: string[],
    checkOp: СheckedOp[],
    yourOption: string[],
    fk_Voting: string
}
var voteColor = '#eff'


class AdvertProfile extends Component<any, State, Props> {
    state = {
        advert: advert, voting: [], reviews: [], submit: false, load: false, loadError: false,
        refreshing: false, option: [], checkedOps: [], uidChecked: [], voted: false, vote: initVote,
        comment: '', fkAnswer: '', commentBottom: -10
    } as State

    componentDidMount = async () => {
        console.log('props: ', this.props)
        console.log(' props.params: ', this.props.route.params)
        this.setState({ loadError: false })
        var logAction = 'Объявление';
        try {
            const { userLogin, token } = store.state;
            const { uid, votings } = this.props.route.params
            if (votings && token) {
                const response = await fetch(serverUrl + 'adverts/profile?Uid=' + uid,
                    { headers: { 'Authorization': `Bearer ${token}` } })
                const data: AdvertData = await response.json()
                if (response.status == 200) {
                    this.setState({
                        advert: data.advert, voting: data.voting,
                        reviews: data.reviews, load: true
                    })
                    console.log('Успех fetch ' + logAction, data.advert)
                    console.log('Voting ', data.voting)
                    console.log('AdvertsReview ', data.reviews)
                    this.isUserVoted();
                }
                else if (response.status == 404) {
                    console.log('Внимание', 'Голосование не найдено uid=' + uid);
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
                console.log('Внимание', 'Голосование не найдено: ' + error, [{ text: 'OK' }]);
            }
            else {
                Alert.alert('Внимание', 'Ошибка сервера: ' + error, [{ text: 'OK' }]);
            }
            this.setState({ loadError: true })
            return
        }
    }
    render() {
        const { userLogin, token } = store.state;
        const { navigation } = this.props
        const { uid, title, text, fk_Category, createdAt, votings, lg } = this.props.route.params
        const { reviews, refreshing, load, comment, loadError, commentBottom } = this.state
        const { im, h1, h3, indicator, sub, inputStyle, inputPaperWhite } = globalStyles
        const { dateStyle, time, category, cardStyle, сommentCardStyle, сommentStyle } = styles
        //console.log('votings: ', votings)
        return (<View style={{ display: 'flex', height: '100%' }}>
            <Header title='Объявление'
                leftIcon={'arrow-left'}
                onPressLeft={() => navigation.goBack()} />
            {Background}
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
                }
            >
                <Card style={cardStyle} >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('GroupPRO', (lg))} >
                        <Card.Title title={lg.title} titleStyle={{ fontSize: 17 }} subtitle={this.toDate(createdAt) + ' ' + this.toTime(createdAt)}
                            left={props => <Avatar.Image source={{ uri: lg.image ? lg.image.url : NoFoto, }} {...props} style={{ backgroundColor: 'white' }} />} />
                    </TouchableOpacity>
                    <View style={sub}>
                        <Text style={category}>{fk_Category == 1 ? Category.Repairs :
                            fk_Category == 2 ? Category.EngineeringWorks :
                                fk_Category == 3 ? Category.Overhaul :
                                    fk_Category == 4 ? Category.EnergySaving :
                                        fk_Category == 5 ? Category.Owners :
                                            fk_Category == 6 ? Category.CommunityInfrastructure :
                                                Category.Attention}</Text>
                    </View>
                    <Text style={h1}>{title}</Text>
                    <Text style={h3}>Уважаемые жильцы!</Text>
                    <Text style={h3}>{text} </Text>
                    {(votings && load) ? this.onVotings() :
                        !loadError && <ActivityIndicator style={{ marginTop: h * 0.2, alignSelf: "center" }} size={50} color={appColor} />
                    }
                </Card>
                {(reviews && load) && this.onReviews()}
            </ScrollView>

            <Card style={сommentCardStyle} >
                <View style={sub}>
                    <TextInput
                        style={[сommentStyle, { marginBottom: commentBottom }]}
                        dense={true}
                        onChangeText={this.onChangeСomment.bind(this)}
                        placeholder='Введите текст..'
                        // onTouchStart={this.activeField.bind(this)}
                        onEndEditing={() => this.onEndComment()}
                        multiline={true}
                        numberOfLines={1}
                        selectionColor={appColor}
                        textAlignVertical='bottom'
                        theme={{ colors: { primary: 'white', disabled: 'white', } }}
                        value={comment}
                    />
                    <IconButton icon="send" onPress={() => { this.onSendPress() }}
                        size={30} color={appColor} style={{ margin: 0 }} />
                </View>
            </Card>

        </View>
        );
    }

    private activeField() {
        this.setState({ commentBottom: 0 });
    }
    private onEndComment() {
        this.setState({ commentBottom: -10 });
    }


    private onVotings() {
        const { submit, load, voting, option, checkedOps, vote, voted, fkAnswer } = this.state
        const { navigation } = this.props
        const { label, label2, dateStyle, voiteSt, optionCont, optionNonCont, optionText, progress,
            votingContainer, label5, btnCont, containerStyle, votings } = styles
        const { buttonContainer, buttonTitle, sub } = globalStyles
        return <View>
            {voting.map((elV: Voting, idV: number) => {
                var max = 0;
                elV.options.forEach(item => {
                    if (item.count > max) max = item.count
                })
                return <Card style={votingContainer} key={idV}>
                    <View style={sub}>
                        <Text style={label}>{elV.title}</Text>
                        <Text style={votings}>Голосование</Text>
                    </View>
                    <Divider style={{ marginTop: 10 }} />
                    {voted ? elV.options.map((elA: Answer, idAns: number) => {
                        var coef = 100;
                        var procent = elA.count / elV.totalVotes * coef
                        return <View>
                            <View style={[optionCont, { justifyContent: 'space-between' }]} key={idAns}>
                                <Text style={[label5, { fontWeight: fkAnswer == elA.uid ? 'bold' : 'normal' }]}>{elA.option}</Text>
                                <Text style={[label5, { fontWeight: fkAnswer == elA.uid ? 'bold' : 'normal' }]}>{max == elA.count &&
                                    <AntDesign name="checkcircle" color='green' size={20} />
                                } {Math.round(procent)}%</Text>
                            </View>
                            <ProgressBar style={progress} progress={procent / coef} color='blue' />
                            <Text style={voiteSt}>{elA.count} голос(ов)</Text>
                        </View>
                    })
                        : false ? //elV.isMulti
                            elV.options.map((elA: Answer, idAns: number) => {
                                return <CheckBox
                                    title={elA.option}
                                    checked={checkedOps[idAns]}
                                    onPress={() => { this.onCheckBoxPress.bind(this, idAns, elA) }}
                                    key={idAns}
                                    checkedColor='green'
                                    uncheckedColor='#333'
                                    textStyle={{ color: 'black', fontWeight: 'normal', textAlign: 'right', fontSize: 16 }}
                                    containerStyle={containerStyle}
                                />
                            })
                            : <View style={{ marginBottom: 10 }}>
                                <RadioButton.Group
                                    onValueChange={option => {
                                        this.onRadioButtonPress(idV, option)
                                    }}
                                    value={option[idV]}
                                >
                                    {elV.options.map((elA: Answer, idAns: number) => {
                                        return <View style={optionNonCont}>
                                            <RadioButton.Item
                                                value={elA.uid}
                                                theme={{ colors: { primary: "black" } }}
                                                label={elA.option}
                                                labelStyle={{ marginLeft: -15 }}
                                                style={{ width: w * 0.9 }}
                                                key={idAns}
                                            // disabled={submit} 
                                            />
                                        </View>
                                    })
                                    }
                                </RadioButton.Group>
                            </View>
                    }
                    {voted && <Text style={label2}>Проголосовало - {elV.totalVotes} человек(а) </Text>}
                    {!voted && <View>
                        <TextInput
                            mode='outlined'
                            style={{ borderRadius: 20, backgroundColor: 'white', }}
                            onChangeText={(value) => {
                                elV.yourOption = elV.yourOption + ', '
                                vote.yourOption[idV] = value
                                this.onChangeYourOption.bind(this, elV.uid, vote)
                            }}
                            label='Свой вариант'
                            placeholder='Введите текст..'
                            dense={true}
                            // multiline={true}
                            // numberOfLines={1}
                            value={vote.yourOption[idV]}
                            disabled={submit}
                            theme={{ colors: { primary: appColor } }}
                        />
                        <Button
                            mode='contained'
                            onPress={() => this.onVotePress(idV, elV)}
                            style={buttonContainer}
                            labelStyle={buttonTitle}
                            uppercase={false}>
                            Проголосовать
                        </Button>
                    </View>
                    }
                </Card>
            })
            }
        </View>
    }

    private onReviews() {
        const { reviews } = this.state
        const { navigation } = this.props
        const { cardComment } = styles
        const { cardStyle } = globalStyles
        return <View>
            <Card style={{ marginHorizontal: 0, paddingHorizontal: 35, paddingBottom: 10, paddingTop: 5, borderRadius: 0 }}>
                <Text style={{ fontSize: 18, color: 'grey' }}>{"Комментарии:"}</Text>
            </Card>
            {reviews.map((elR: AdvertsReview, idV: number) => {
                return <Card style={cardComment}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PROFILE', (elR.author.uid))} >
                        <Card.Title
                            title={elR.author.fullName}
                            titleStyle={{ marginTop: - 30, fontSize: 16 }}
                            left={props =>
                                <Avatar.Image
                                    source={{ uri: elR.author.avatar ? elR.author.avatar.url : NoAvatar, }}
                                    {...props}
                                    style={{ backgroundColor: 'white' }} />}
                        />
                    </TouchableOpacity>
                    <Card.Content>
                        <Paragraph style={{ marginLeft: 55, marginTop: -40, fontSize: 15 }}>{elR.reviews}</Paragraph>
                        <Paragraph style={{ marginLeft: 55, fontSize: 13, color: 'grey', marginBottom: -10, }}>
                            {this.toDate(elR.createdAt) + ' ' + this.toTime(elR.createdAt)}</Paragraph>
                    </Card.Content>
                </Card>
            })
            }
        </View>

    }


    private onRadioButtonPress(idV: number, op: string) {
        var option = this.state.option
        option[idV] = op
        this.setState({ option })
        console.log("option", option)
    }

    private onCheckBoxPress(idAns: number, elA: Answer) {
        var { checkedOps, uidChecked, vote } = this.state
        checkedOps[idAns] = !checkedOps[idAns];
        !checkedOps[idAns] ? uidChecked[idAns] = '' : uidChecked[idAns] = elA.uid;
        this.setState({ checkedOps, uidChecked, vote })
    }
    private onChangeYourOption(uid: string, vote: Vote) {
        this.setState({ vote });
    }

    private onChangeСomment(comment: string) {
        var commentBottom = -10;
        if (comment.length > 39) commentBottom = 0
        else commentBottom = -10
        this.setState({ comment, commentBottom })
    }

    private async onSendPress() {
        const { advert, comment, reviews } = this.state
        var logAction = 'Коментарий'
        try {
            const { userLogin, token } = store.state;
            const { uid, voting } = this.props.route.params
            var obj = {
                Fk_Author: userLogin.uid,
                Reviews: comment,
                Fk_Advert: advert.uid,
            }
            if (token && comment) {
                //this.setState({ loadError: false, load: false })

                var url = serverUrl + 'adverts/review'
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(obj)
                })
                //const data: AdvertData = await response.json()
                if (response.status == 200) {
                    const data: AdvertsReview = await response.json()
                    reviews.push(data);
                    this.setState({ reviews, comment: '' })
                    Keyboard.dismiss()
                    console.log('Успех fetch ' + logAction, data)
                }
                else if (response.status == 404) {
                    console.log('Внимание', 'Обьявление не найдено uid=' + advert.uid);
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
    private async onVotePress(idV: number, elV: Voting) {
        var $this = this
        const { option, uidChecked, vote } = this.state
        var logAction = 'Голосование'
        try {
            const { userLogin, token } = store.state;
            const { uid, voting } = this.props.route.params
            var obj = {
                Fk_User: userLogin.uid,
                Fk_Voting: elV.uid,
                yourOption: elV.yourOption ? elV.yourOption + ', ' + (vote.yourOption[idV] ? vote.yourOption[idV] : '') : '',
                Fk_Answer: option[0]
            }
            console.log("option", option[0]+', Fk_Voting: ' + elV.uid+' yourOption: '+obj.yourOption)
            if (token && option[0]) {
                this.setState({ loadError: false, load: false })
                // if (!elV.isMulti) {
                    var url = serverUrl + 'adverts/vote?Fk_Option=' + option[0]
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Accept': "application/json",
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(obj)
                    })
                    //const data: AdvertData = await response.json()
                    if (response.status == 200) {
                        this.setState({ voted: true })
                        this.componentDidMount();
                        console.log('Успех fetch ' + logAction)
                    }
                    else if (response.status == 404) {
                        console.log('Внимание', 'Голосование не найдено uid=' + uid);
                        this.setState({ loadError: true })
                    }
                // }
                // else {
                //     console.log('uidChecked: ', uidChecked)
                //     uidChecked.forEach(item => {
                //         var url = serverUrl + 'adverts/vote?Fk_Option=' + item
                //         fetch(url, {
                //             method: 'POST',
                //             headers: {
                //                 'Accept': "application/json",
                //                 'Content-Type': 'application/json',
                //                 'Authorization': `Bearer ${token}`
                //             },
                //             body: JSON.stringify(obj)
                //         })
                //             .then(function (response) {
                //                 if (response.status == 200) {
                //                     $this.setState({ voted: true })
                //                     $this.componentDidMount();
                //                     console.log('Успех fetch ' + logAction, response.status)
                //                     //return response.json()
                //                 }
                //                 else if (response.status == 404) {
                //                     console.log('Внимание', 'Голосование не найдено uid=' + uid);
                //                     $this.setState({ loadError: true })
                //                 }
                //             })
                //         // .then(function(data: AdvertData){
                //         //     $this.setState({
                //         //         advert: data.advert, voting: data.voting, load: true
                //         //     }) 
                //         // })

                //     })
                // }
            }
        } catch (error) {
            console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
            if (error == 'TypeError: Network request failed') {
                Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);

                this.setState({ loadError: true })
            }
            else if (error.status == 404) {
                console.log('Внимание', 'Голосование не найдено: ' + error, [{ text: 'OK' }]);
            }
            else {
                Alert.alert('Внимание', 'Ошибка сервера: ' + error, [{ text: 'OK' }]);
            }
            this.setState({ loadError: true })
            return
        }
    }
    private isUserVoted() {
        const { voting } = this.state
        const { userLogin, token } = store.state;
        voting.forEach(item => {
            var filter: Voted[] = item.voteds.filter(f => f.fk_User == userLogin.uid)
            console.log("Voted: ", filter);
            if (filter.length) {
                this.setState({ voted: true, fkAnswer: filter[0].fk_Answer })
            }
        })
    }

    private toDate = (date: Date) => {
        var d = new Date(date);
        var day = d.getDate().toString();
        var hours = (d.getHours() - 3).toString();
        day = +hours < 0 ? (+day - 1).toString() : day;
        day = day.length == 1 ? '0' + day : day;
        var month = (d.getMonth() + 1).toString()
        month = months[+month - 1];
        return day + ' ' + month + ' ' + d.getFullYear() + ' г.';
    }
    private toTime = (time: Date) => {
        var date = new Date(time);
        var hours = (date.getHours() - 3).toString();
        hours = +hours < 0 ? (+hours + 24).toString() : hours;
        hours = hours.length === 1 ? '0' + hours : hours;
        var minutes = date.getMinutes().toString();
        minutes = minutes.length === 1 ? '0' + minutes : minutes;
        return hours + ':' + minutes;
    }
    private async onRefresh() {
        this.setClearState();
        this.componentDidMount();
    }
    private setClearState() {
        this.setState({
            advert: advert, voting: [], submit: false, load: false, loadError: false,
            refreshing: false,
        })
    }
}

const styles = StyleSheet.create({
    votingContainer: {
        // borderColor: 'gray',
        backgroundColor: voteColor,
        //borderWidth: 0,
        borderRadius: 5,
        marginTop: 10,
        // marginHorizontal: -10,
        paddingVertical: 10,
        paddingHorizontal: 20,

    },
    row: {
        flexDirection: 'row'
    },
    dateStyle: {
        marginHorizontal: 15,
        color: 'grey'
    },
    voiteSt: {
        color: 'grey',
        textAlign: 'right'
    },
    time: {
        margin: 3,
        marginLeft: -10,
        padding: 1,
        color: 'grey'
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
        marginRight: 16,
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
        // marginHorizontal: 15,
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
    containerStyle: {
        backgroundColor: voteColor,
        borderColor: voteColor,
        paddingVertical: 5,
        marginLeft: -10,
        width: w
    },
    optionCont: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    optionNonCont: {
        // flexDirection: 'row',
        // marginHorizontal: 5,
        display: "flex",
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
        // marginHorizontal: 15,
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
        paddingBottom: 5,
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

export { AdvertProfile }

