import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { h, w, NoFoto } from '../../constants'
import { HomeStatus } from '../../enum/Enums'

const HomeCard = ({ data, onPress }: any) => {
    const { container, images, h1, containerText, homeStatusGood, homeStatusBad } = styles
    const { imageUrl, city, street, homeNumber, fk_Status } = data
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                <Image source={{ uri: imageUrl ? imageUrl.url : NoFoto }}
                    style={images} />
                <View style={containerText}>
                    <Text style={h1}>г. {city}, {street}, д. {homeNumber}</Text>
                    <Text style={fk_Status == 1 ? homeStatusGood :homeStatusBad }>{fk_Status == 1 ? HomeStatus.Exploited : HomeStatus.Emergency} </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        backgroundColor: 'white'
    },
    containerText: {
        flexDirection: 'column'
    },
    h1: {
        fontSize: 20,
        width: w * 0.65,
    },
    homeStatusGood: {
        color: '#13CE66'
    },
    homeStatusBad: {
        color: '#ff3437'
    },
    images: {
        width: w / 4,
        height: w / 5,
        borderRadius: 10,
    },

})
export { HomeCard }