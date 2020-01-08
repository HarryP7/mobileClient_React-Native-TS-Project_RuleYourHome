import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { h, w } from '../../constants'
import { Category } from '../../enum/Enums'


const AdvertCard = ({ data, onPress }: any) => {
        const { dateStyle, container, h1, containerText, time, category, voting } = styles
        const { title, fk_Category, createdAt, votings } = data
        //console.log("title: "+title+" voting "+ votings[0])
        return (
            <TouchableOpacity onPress={onPress}>
                <Text style={dateStyle}>{toDate(createdAt)}</Text>
                <View style={container}>
                    <View style={containerText}>
                        <Text style={time}>{toTime(createdAt)}</Text>
                        <Text style={category}>{fk_Category == 1 ? Category.Repairs :
                            fk_Category == 2 ? Category.EngineeringWorks :
                            fk_Category == 3 ? Category.Overhaul :
                            fk_Category == 4 ? Category.EnergySaving :
                            fk_Category == 5 ? Category.Owners :
                            fk_Category == 6 ? Category.CommunityInfrastructure :
                            Category.Attention}</Text>
                        {votings[0] && <Text style={voting}>Голосование</Text>}
                    </View>
                    <Text style={h1}> {title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const toDate = (date: Date) => {
      var d = new Date(date);
      var day = d.getDate().toString();
      var hours = (d.getHours()-3).toString();
      day = +hours<0 ? (+day-1).toString(): day;
      day = day.length == 1  ? '0' + day : day ;
      var month = (d.getMonth()+1).toString()
      month = month.length == 1 ? '0' + month : month;
      return day + '.' + month + '.' + d.getFullYear();
    }
    const toTime = (time: Date) => {
        var date = new Date(time);
        var hours = (date.getHours()-3).toString();
        hours = +hours<0 ? (+hours+24).toString(): hours;
        hours = hours.length === 1 ? '0'+hours : hours;
        var minutes = date.getMinutes().toString();
        minutes = minutes.length === 1 ? '0'+minutes : minutes;
        return hours + ':' + minutes;
    }


    const styles = StyleSheet.create({
        container: {
            padding: 3,
            justifyContent: 'space-between',
            borderColor: 'grey',
            borderWidth: 1,
            borderRadius: 5,
            margin: 5
        },
        containerText: {
            flexDirection: 'row'
        },
        h1: {
            fontSize: 20,
            width: w * 0.67,
            marginHorizontal: 10
        },
        images: {
            width: w / 4,
            height: w / 5,
            borderRadius: 10,
        },
        dateStyle:{
            marginLeft: 10
        },
        time: {
            margin: 3,
            padding: 1
        },
        category: {
            backgroundColor: '#13CE66',
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