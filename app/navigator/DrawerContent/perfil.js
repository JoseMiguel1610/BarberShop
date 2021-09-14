import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { Avatar, Caption, Title } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../styles/colors';
import { Config } from '../../configuration/config';
import Axios from 'axios';


const Perfil = () => {
    const url_data = Config.URL_SERVER
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [ sexo, setSexo ] = useState(null)
    const User = useSelector(reducers => reducers.loginReducer).User;
    const navigation = useNavigation()
    const photoDefaut = 'https://i.stack.imgur.com/34AD2.jpg'

    useEffect(() => {
        async function getUser() {
            try {
                const res = await Axios.get(url_data + "/" + User[0].dni);
                const userData = res.data.objModel[0]
                console.log(userData);
                if (res.data.objModel.length > 0) {
                    setEmail(userData.correo)
                    setName(userData.nombre)
                    setSexo(userData.iD_SEXO)
                }
            }
            catch (e) {
            }



        }
        getUser()
    }, [User])

    return (
        <View style={{ flexDirection: 'row', marginTop: 15, display: 'flex', alignItems: 'center' }}>
            {sexo == 1 &&
            <Avatar.Image
                source={require('../../../assets/man.png')}
                size={100}
            />}
            {sexo == 2 &&
            <Avatar.Image
                source={require('../../../assets/woman.png')}
                size={100}
            />}
            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>{name}</Title>
                <Caption ellipsizeMode='tail' numberOfLines={1} style={styles.caption}>{email}</Caption>
            </View>
        </View>
    )
}

export default Perfil

const styles = StyleSheet.create({
    perfil: {
        width: "100%",
        height: 165,
        backgroundColor: Colors.color_gray_bg,
        // backgroundColor: "yellow",
        borderTopRightRadius: 20,
        paddingLeft: 20,
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    caption: {
        fontSize: 13,
        lineHeight: 14,
        textTransform: 'lowercase',
        width: 160
    },
    perfil_left: {
        width: "50%",
    },
    perfil_right: {
        width: "50%",
        alignItems: "center"
    },
    perfil_hello: {
        fontSize: 16,
        color: Colors.textColor,
        fontWeight: "100",
        fontFamily: "Poppins-Medium"
    },
    perfil_nombre: {
        fontSize: 20,
        color: Colors.textColor,
        fontFamily: "Poppins-Bold",
        textTransform: "capitalize",
        lineHeight: 25
    },
    rango: {
        color: Colors.textColor,
        fontSize: 13,
        fontFamily: "Metropolis-Regular",
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 9999
    },
    button: {
        marginVertical: 50,
        backgroundColor: "white",
        width: 125,
        marginTop: 12,
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        lineHeight: 22,
        marginTop: 0,
        marginBottom: 4
    },
    icon: {
        color: "black"
    },
    vipIcon: {
        width: 20,
        height: 20
    }
})
