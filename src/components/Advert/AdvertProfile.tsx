import React, { Component } from 'react';
import {
    StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Button, RefreshControl, Alert
} from 'react-native';
import { Header, globalStyles } from '..';
import { backArrow } from '../../allSvg'
import { HomeStatus, Role } from '../../enum/Enums';
import { h, w, appColor, NoFoto, serverUrl, months, Background } from '../../constants'
import { Badge, Divider, Card, Input, CheckBox } from 'react-native-elements';
import { store } from '../../store';
import { advert, Voting, Answer, Advert, Voted } from '../../interfaces';
import { RadioButton, ProgressBar, Colors} from 'react-native-paper';

interface AdvertData {
    advert: Advert,
    voting: Voting[],
}
interface СheckedOp {
    checked: boolean[],
    uid: string[]
}
interface Props { }
interface State {
    advert: Advert,
    voting: Voting[],
    submit: boolean,
    load: boolean,
    loadError: boolean,
    refreshing: boolean,
    option: string[],
    checkedOps: boolean[],
    uidChecked: string[],
    voted: boolean,
    vote: Vote
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


class AdvertProfile extends Component<any, State, Props> {
    state = {
        advert: advert, voting: [], submit: false, load: false, loadError: false,
        refreshing: false, option: [], checkedOps: [], uidChecked: [], voted: false, vote: initVote
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
                        advert: data.advert, voting: data.voting, load: true
                    })
                    console.log('Успех fetch ' + logAction, data)
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
        const { uid, title, text, fk_Category, createdAt, votings, } = this.props.route.params
        const { refreshing, load } = this.state
        const { im, h1, h3, indicator, cardStyle, sub } = globalStyles
        const { dateStyle, time, } = styles
        //console.log('votings: ', votings)
        return (<View>
            <Header title='Объявление'
                leftIcon={'arrow-left'}
                onPressLeft={() => navigation.goBack()} />
            <View>
                {Background}
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
                    }
                >
                    <Card containerStyle={[cardStyle, { padding: 10, paddingBottom: 10, }]} >
                        <View style={sub}>
                            <Text style={dateStyle}>{this.toDate(createdAt)} </Text>
                            <Text style={time}> {this.toTime(createdAt)}</Text>
                        </View>
                        <Text style={h1}>{title}</Text>
                        <Text style={h3}>Уважаемые жильцы!</Text>
                        <Text style={h3}>{text} </Text>
                    </Card>
                    {votings && this.onVotings()}

                    <View style={{ margin: 55 }}><Text> </Text></View>
                </ScrollView>
            </View>
        </View>
        );
    }

    private onVotings() {
        const { submit, load, voting, option, checkedOps, loadError, vote, voted } = this.state
        const { navigation } = this.props
        const { fixToText, label, label2, textInput, optionCont, optionText, progress,
            inputMultiline, votingContainer, row, label5, btnCont, containerStyle } = styles
        const { inputStyle, cardUsersStyle, indicator, buttonContainer, buttonTitle } = globalStyles
        var uidChecked: string[] = [];
        return <View>            
            {load ?
                voting.map((elV: Voting, idV: number) => {
                    return <View style={votingContainer}>
                        <View style={fixToText}>
                            <View style={textInput}>
                                <Text style={label}>{elV.title}</Text>
                            </View>
                        </View>

                        {voted ? elV.options.map((elA: Answer, idAns: number) => {
                            return <View>                           
                            <View style={optionCont} key={idAns}>
                                <Text style={label5}>{elA.option} - {elA.count} голос(ов). </Text>
                            </View>
                            <ProgressBar style={progress} progress={elA.count*0.01} color='blue' /> 
                            </View>
                        })
                            : elV.isMulti ?
                                elV.options.map((elA: Answer, idAns: number) => {
                                    return <CheckBox
                                        title={elA.option}
                                        checked={checkedOps[idAns]} //vote.checkOp[idV].checked[idAns]
                                        onPress={() => {
                                            // checkedOps[idV].checkedOp[idAns] = !checkedOps[idV].checkedOp[idAns];
                                            // !checkedOps[idV].checkedOp[idAns] ? uidChecked = '' : uidChecked = elA.uidChecked;
                                            checkedOps[idAns] = !checkedOps[idAns];
                                            !checkedOps[idAns] ? uidChecked[idAns] = '' : uidChecked[idAns] = elA.uid;
                                            // vote.checkOp[idV].checked[idAns] = !vote.checkOp[idV].checked[idAns]
                                            // vote.checkOp[idV].uid[idAns] = !vote.checkOp[idV].checked[idAns] ? '' : elA.uid
                                            this.setState({ checkedOps, uidChecked, vote })
                                        }}
                                        checkedColor='green'
                                        uncheckedColor='#333'
                                        textStyle={{ color: '#000', fontWeight: 'normal', fontSize: 16 }}
                                        containerStyle={containerStyle}
                                    />
                                })
                                : <RadioButton.Group
                                    onValueChange={option => {
                                        this.onRadioButtonPress(idV, option)
                                    }}
                                    value={option[idV]}
                                >
                                    {elV.options.map((elA: Answer, idAns: number) => {
                                        return <View style={optionCont}>
                                            <RadioButton
                                                value={elA.uid}
                                                color="green"
                                                disabled={submit} />
                                            <Text style={optionText}>{elA.option}</Text>
                                        </View>
                                    })
                                    }
                                </RadioButton.Group>
                        }
                        {voted && <Text style={label2}>Проголосовало - {elV.totalVotes} человек(а) </Text>}
                       {!voted && <View>
                           <Text style={label5}>Свой вариант</Text>
                        <Input
                            inputContainerStyle={inputMultiline}
                            inputStyle={inputStyle}
                            onChangeText={(value) => {
                                elV.yourOption = elV.yourOption + ', '
                                vote.yourOption[idV] = value
                                this.onChangeYourOption.bind(this, elV.uid, vote)
                            }}
                            placeholder='Введите текст..'
                            multiline={true}
                            numberOfLines={1}
                            value={vote.yourOption[idV]}
                            disabled={submit}
                        />
                        <TouchableOpacity
                            onPress={() => this.onVotePress(idV, elV)}
                            style={btnCont}>
                            <View style={buttonContainer}>
                                <Text style={buttonTitle}>Проголосовать</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                }
                    </View>
                })
                : !loadError && <ActivityIndicator style={indicator} size={50} color={appColor} />
            }
        </View>
    }
    private onRadioButtonPress(idV: number, op: string) {
        var option = this.state.option
        option[idV] = op
        this.setState({ option })
        console.log("option", option)
    }
    private onChangeYourOption(uid: string, vote: Vote) {
        this.setState({ vote });
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
                yourOption: elV.yourOption ? elV.yourOption + ', ' + (vote.yourOption[idV] ? vote.yourOption[idV] : '') : ''
            }
            if (token) {
                this.setState({ loadError: false, load: false })
                if (!elV.isMulti) {
                    var url = serverUrl + 'adverts/vote?Fk_Option=' + option[idV]
                    const response = await fetch(url, {
                        method: 'PUT',
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
                }
                else {
                    console. log('uidChecked: ',uidChecked)
                    uidChecked.forEach(item => {
                        var url = serverUrl + 'adverts/vote?Fk_Option=' + item
                        fetch(url, {
                            method: 'PUT',
                            headers: {
                                'Accept': "application/json",
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(obj)
                        })
                            .then(function (response) {
                                if (response.status == 200) {
                                    $this.setState({ voted: true })
                                    $this.componentDidMount();
                                    console.log('Успех fetch ' + logAction, response.status)
                                    //return response.json()
                                }
                                else if (response.status == 404) {
                                    console.log('Внимание', 'Голосование не найдено uid=' + uid);
                                    $this.setState({ loadError: true })
                                }
                            })
                        // .then(function(data: AdvertData){
                        //     $this.setState({
                        //         advert: data.advert, voting: data.voting, load: true
                        //     }) 
                        // })

                    })
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
    private isUserVoted() {
        const {  voting } = this.state
        const { userLogin, token } = store.state;
        voting.forEach(item => {
        var filter = item.voteds.filter(f => f.fk_User == userLogin.uid)
        if (filter.length) {
            this.setState({ voted: true })
        }
    })
    }

    private toDate = (date: Date) => {
        var d = new Date(date);
        var day = d.getDate().toString();
        var hours = (d.getHours() - 3).toString();
        day = +hours < 0 ? (+day - 1).toString() : day;
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
        borderColor: 'gray',
        backgroundColor: '#FFD0AE',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 5,
        paddingVertical: 10
    },
    row: {
        flexDirection: 'row'
    },
    dateStyle: {
        marginLeft: 10
    },
    time: {
        margin: 3,
        padding: 1
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
        marginTop: -5,
        marginBottom: 5,
        marginLeft: 5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    label2: {        
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
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
        marginLeft: 15,
        marginVertical: 5,
        fontSize: 17,
    },
    inputMultiline: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        alignContent: 'flex-start',
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
        backgroundColor: '#FFD0AE',
        borderColor: '#FFD0AE',
        paddingVertical: 0,
    },
    optionCont: {
        flexDirection: 'row',
        marginLeft: 5
    },
    optionText: {
        paddingTop: 5,
        fontSize: 16
    },
    btnCont: {
        margin: 10
    },
    progress: {
        height: 15,
        marginHorizontal: 20,
        borderRadius: 10
    }
})

export { AdvertProfile }

