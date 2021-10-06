import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-paper'
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { optionsImagePicker } from '../../../../../utils/others';
import { Colors } from '../../../../../styles/colors';


const Header = ({ name, sexo, setFormData, avatarSource, setAvatarSource }) => {
    //const [avatarSource, setAvatarSource] = useState(null)
    const navigation = useNavigation()
    const User = useSelector(reducers => reducers.loginReducer).User;
    const photoDefaut = 'https://i.stack.imgur.com/34AD2.jpg';
    function selectImg() {
        ImagePicker.showImagePicker(optionsImagePicker, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                //photoBase64(response.data)
                setFormData(x => { return { ...x, photoBase64: response.data } })
                setAvatarSource(source)
            }
        });
    }

    return (
        <View style={styles.container}>
            <Pressable android_ripple={{ color: "#b99a55", radius: 15 }} style={{ width: 30 }}
                onPress={() => navigation.goBack()}>
                <Icon name='arrow-left' color={"#b99a55"} size={30} />
            </Pressable>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                    <Text style={styles.h1}>Perfil de {name}</Text>
                    <Text style={styles.text1}>Actualiza sus datos personales.</Text>
                </View>
                <View style={{ overflow: "hidden" }}>
                    <Pressable style={{ position: "relative" }} onPress={() => { }}>
                        {sexo == 1 &&
                            <Avatar.Image
                                source={require('../../../../../../assets/man.png')}
                                size={100}
                            />}
                        {sexo == 2 &&
                            <Avatar.Image
                                source={require('../../../../../../assets/woman.png')}
                                size={100}
                            />}
                    </Pressable>
                </View>
            </View>
        </View >
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    button: {
        backgroundColor: "white",
        alignItems: "center"
    },
    buttonText: {
        lineHeight: 17,
        marginTop: 3,
        marginBottom: 4
    },
    vipIcon: {
        width: 20,
        height: 20
    },
    h1: {
        fontWeight: "bold",
        fontSize: 15
    },
    text1: {
        fontSize: 15
    },
    rango: {
        color: Colors.textColor,
        fontSize: 13,
        fontFamily: "Metropolis-Regular",
    }
})
