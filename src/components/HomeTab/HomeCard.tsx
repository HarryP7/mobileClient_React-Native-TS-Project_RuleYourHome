import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { h, w, NoFoto } from '../../constants'
import { HomeStatus } from '../../enum/Enums'
import { Card, Title, Paragraph } from 'react-native-paper'

const HomeCard = ({ data, onPress }: any) => {
    const { container, images, h1, containerText, homeStatusGood, homeStatusBad } = styles
    const { imageUrl, city, street, homeNumber, fk_Status } = data
    return (
        <TouchableOpacity onPress={onPress}>
            <Card style={container}>
                <Card.Cover source={{ uri: imageUrl ? imageUrl.url : NoFoto }} style={{padding: -5, margin: -6}}/>
                <Text style={h1}>г. {city}, {street}, д. {homeNumber}</Text>
                <Text style={[fk_Status == 1 ? homeStatusGood : homeStatusBad, {marginHorizontal:5, marginBottom:5}]}>
                    {fk_Status == 1 ? HomeStatus.Exploited : HomeStatus.Emergency} </Text>
            </Card>
            {/* <View style={container}>
                <Image source={{ uri: imageUrl ? imageUrl.url : NoFoto }}
                    style={images} />
                <View style={containerText}>
                    <Text style={h1}>г. {city}, {street}, д. {homeNumber}</Text>
                </View>
            </View> */}
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 0,
        backgroundColor: 'white'
    },
    containerText: {
        flexDirection: 'column'
    },
    h1: {
        marginTop:10,
        margin:5,
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
        width: w *0.8,
        height: w *0.8,
        borderRadius: 10,
    },

})
export { HomeCard }