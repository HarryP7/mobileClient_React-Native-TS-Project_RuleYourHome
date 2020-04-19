import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { h, w, NoFoto, NoAvatar, appColor } from '../../../constants'
import { HomeStatus } from '../../../enum/Enums'
import { Divider, Icon } from 'react-native-elements'
import { globalStyles } from '../../../components/globalStyles'

const TentantCard = ({ data, onPress, loadError }: any) => {
    const {indicator} =globalStyles
    const { container, images, h1, containerText, access } = styles
    const { myGroups, address, phone, fk_Gender, fullName, avatar, uid } = data
    return (<View>
        {loadError &&
        <ActivityIndicator style={indicator} size={50} color={appColor} />}
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                <Image source={avatar ? { uri: avatar.url } : require('../../../../icon/user1.png')}
                    style={images} />
                <Text style={h1}>{fullName}</Text>
            <Icon name='chevron-right' />
            </View>
        </TouchableOpacity>
        <Divider />
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        padding: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    containerText: {
        flexDirection: 'column'
    },
    h1: {
        justifyContent: 'center',
        marginLeft: 10,
        fontSize: 18,
        width: w * 0.67,
    },
    access: {
        color: '#656565'
    },
    images: {
        width: 50,
        height: 50,
        borderRadius: 50
    },

})
export { TentantCard }