import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { h, w } from '../../constants'
import { HomeStatus } from '../../enum/Enums'

const HomeCard = ({ data, onPress }: any) => {
    const { container, images, h1, containerText, access } = styles
    const { imageUrl, city, street, homeNumber, fk_Status } = data
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                <Image source={{ uri: imageUrl.url }}
                    style={images} />
                <View style={containerText}>
                    <Text style={h1}>г. {city}, ул. {street}, д. {homeNumber}</Text>
                    <Text style={access}>{fk_Status == 1 ? HomeStatus.Exploited : HomeStatus.Emergency} </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 5,
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
        width: w * 0.67,
    },
    access: {
        color: '#656565'
    },
    images: {
        width: w / 4,
        height: w / 5,
        borderRadius: 10,
    },

})
export { HomeCard }