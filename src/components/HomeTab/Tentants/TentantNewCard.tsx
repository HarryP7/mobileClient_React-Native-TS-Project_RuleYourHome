import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { h, w, NoFoto, NoAvatar } from '../../../constants'
import { HomeStatus } from '../../../enum/Enums'
import { Divider, Icon } from 'react-native-elements'

const TentantNewCard = ({ data, onPress, onPressBtn }: any) => {
    const { container, images, h1, sectionContainer, sectionTitle } = styles
    const { myGroups, address, phone, fk_Gender, fullName, avatar, uid } = data
    return (<View>
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                <Image source={avatar ? { uri: avatar.url } : require('../../../../icon/user1.png')}
                    style={images} />
                <Text style={h1}>{fullName}</Text>
                <TouchableOpacity onPress={onPressBtn} >
                    <View style={sectionContainer}>
                        <Text style={sectionTitle}>Добавить</Text>
                    </View>
                </TouchableOpacity>
            <Icon name='chevron-right' />
            </View>
        </TouchableOpacity>
        <Divider />
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    h1: {
        justifyContent: 'center',
        marginLeft: 10,
        fontSize: 18,
        width: w * 0.40,
    },
    images: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    sectionContainer: {
        backgroundColor: '#15a009',
        height: 35,
        borderRadius: 7,
        width: 110,
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center'
    },

})
export { TentantNewCard }