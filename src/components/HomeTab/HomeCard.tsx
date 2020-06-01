import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { h, w, NoFoto } from '../../constants'
import { HomeStatus } from '../../enum/Enums'
import { Card, Title, Paragraph, TouchableRipple } from 'react-native-paper'

const HomeCard = ({ data, onPress }: any) => {
    const { container, images, h1, containerText, homeStatusGood, homeStatusBad } = styles
    const { imageUrl, city, street, homeNumber, fk_Status } = data
    return (
        <TouchableOpacity onPress={onPress}>
            <Card style={container}>
                <Card.Cover style={images} source={{ uri: imageUrl ? imageUrl.url : NoFoto }} />
                <Text style={h1}>г. {city}, {street}, д. {homeNumber}</Text>
                <Text style={[fk_Status == 1 ? homeStatusGood : homeStatusBad, { marginHorizontal: 5, marginBottom: 10 }]}>
                    {fk_Status == 1 ? HomeStatus.Exploited : HomeStatus.Emergency} </Text>
            </Card>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex',
        borderColor: '#bbb',
        borderWidth: 0.2,
        margin: 4,
        marginBottom: 0,
        //borderRadius: 0
    },
    containerText: {
        flexDirection: 'column'
    },
    h1: {
        marginTop: 10,
        margin: 5,
        fontSize: 20,
        width: w * 0.85,
    },
    homeStatusGood: {
        color: '#15a009'
    },
    homeStatusBad: {
        color: '#ff3437'
    },
    images: {
        height: w * 0.55,
        // borderRadius: 10,
    },

})
export { HomeCard }