import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { h, w, NoFoto, months, } from '../../constants'
import { Category } from '../../enum/Enums'
import { Avatar, Title, Card, TouchableRipple } from 'react-native-paper'
import { globalStyles } from '..'


const AdvertCard = ({ data, onPress, onMoveGroup }: any) => {
    const { dateStyle, container, h1, h3, containerText, time, category, voting } = styles
    const { title, text, fk_Category, createdAt, votings, lg } = data
    const { im, indicator, cardStyle, sub } = globalStyles
    //console.log("title: "+title+" voting "+ votings[0])
    return (
        <TouchableOpacity
            onPress={onPress}>
            <Card style={[container, { marginTop: 0 }]}>
                <TouchableOpacity
                    onPress={onMoveGroup} >
                    <Card.Title title={lg.title} titleStyle={{ fontSize: 17 }} subtitle={toDate(createdAt) + ' ' + toTime(createdAt)}
                        left={props => <Avatar.Image source={{ uri: lg.image ? lg.image.url : NoFoto, }} {...props} style={{ backgroundColor: 'white' }} />} />
                </TouchableOpacity>
                <Card.Content >
                    <View style={containerText}>
                        <Text style={category}>{fk_Category == 1 ? Category.Repairs :
                            fk_Category == 2 ? Category.EngineeringWorks :
                                fk_Category == 3 ? Category.Overhaul :
                                    fk_Category == 4 ? Category.EnergySaving :
                                        fk_Category == 5 ? Category.Owners :
                                            fk_Category == 6 ? Category.CommunityInfrastructure :
                                                Category.Attention}</Text>
                        {votings[0] && <Text style={voting}>Голосование</Text>}
                    </View>
                    <Title style={h1}> {title}</Title>
                    <View style={{marginVertical: -20}}>
                    <Text style={h3}>Уважаемые жильцы!</Text>
                    <Text style={h3}>{text} </Text>
                    </View>
                </Card.Content>
                {/* <Card.Actions>      
                </Card.Actions> */}
            </Card>
        </TouchableOpacity>

    )
}

const toDate = (date: Date) => {
    var d = new Date(date);
    var day = d.getDate().toString();
    var hours = (d.getHours() - 3).toString();
    day = +hours < 0 ? (+day - 1).toString() : day;
    day = day.length == 1 ? '0' + day : day;
    var month = (d.getMonth() + 1).toString()
    month = month.length == 1 ? '0' + month : month;
    month = months[+month - 1];
    return day + ' ' + month + ' ' + d.getFullYear();
}
const toTime = (time: Date) => {
    var date = new Date(time);
    var hours = (date.getHours() - 3).toString();
    hours = +hours < 0 ? (+hours + 24).toString() : hours;
    hours = hours.length === 1 ? '0' + hours : hours;
    var minutes = date.getMinutes().toString();
    minutes = minutes.length === 1 ? '0' + minutes : minutes;
    return hours + ':' + minutes;
}


const styles = StyleSheet.create({
    container: {
        // padding: 3,
        // justifyContent: 'space-between',
        borderColor: '#eee',
        borderWidth: 0.3,
        borderRadius: 0,
    },
    containerText: {
        flexDirection: 'row'
    },
    h1: {
        fontSize: 16,
        width: w * 0.67,
        // marginHorizontal: 10

    },
    h3: {
        paddingLeft: 5,
        marginVertical: 2,
        fontSize: 15,
    },
    images: {
        width: w / 4,
        height: w / 5,
        borderRadius: 10,
    },
    dateStyle: {
        marginLeft: 10,
        marginTop: 9,
        color: 'grey'
    },
    time: {
        marginTop: 9,
        margin: 4,
        color: 'grey'
    },
    category: {
        backgroundColor: '#15a009',
        borderRadius: 6,
        color: '#fff',
        margin: 3,
        paddingVertical: 1,
        paddingHorizontal: 7
    },
    voting: {
        backgroundColor: '#2D3AF2',
        borderRadius: 6,
        color: '#fff',
        margin: 3,
        paddingVertical: 1,
        paddingHorizontal: 7
    }
})
export { AdvertCard }