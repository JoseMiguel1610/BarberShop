import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { View, Text, Pressable, ImageBackground, StyleSheet, TextInput, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper'
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import { SaveLogin, SaveToken, SaveUser } from '../../actions/loginActions';
import { Config } from '../../configuration/config';
import { SvgUri } from 'react-native-svg'
import { storeTokenJWT, storeUserData } from '../../utils/AsyncStore';
import SpinnerModal from '../../utils/components/spinnerModal';
import parseJwt from '../../utils/parseJwt';
export default function Login(props) {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [username, setEmail] = useState(null)
    const [loading, setLoading] = useState(false)
    const [contrasena, setPassword] = useState(null)
    const [showPassword, setShowPassWord] = useState(false);
    const url_data =  Config.URL_SERVER + "/Account/login"



    const onSummit = async () => {
        if (!username || !contrasena) {
            return Alert.alert(
                "Alerta",
                "Llene todo los campos",
                [{ text: "Aceptar", style: "default" }]
            )
        } else {
            const formData = { "correo": username, "contrasena": contrasena }
            try {
                setLoading(true)
                const res = await Axios.post(url_data, formData);
                if (res.data.objModel) {
                    let user = res.data.objModel.infouser
                    await storeTokenJWT(res.data.objModel.access_Token)
                    await storeUserData(user)
                    setLoading(false)
                    dispatch(SaveToken(res.data.objModel.access_Token))
                    dispatch(SaveUser(user))
                    dispatch(SaveLogin(true))
                    
                } else {
                    setLoading(false)
                    Alert.alert(
                        "Error",
                        "Correo o contraseña incorrecta.",
                        [
                            {
                                text: "Ok",
                                onPress: () => { }
                            }
                        ]
                    )
                }
            } catch (error) {
                setLoading(false)
                Alert.alert(
                    "Error",
                    "Ocurrió un error, intentelo más tarde.",
                    [
                        {
                            text: "Ok",
                            onPress: () => { }
                        }
                    ]
                )
            }
            //props.navigation.replace('SideBarStack');//No es necesario, y hace renderizar 2 veces.
        }

    };

    return (
        <ImageBackground style={styles.container} resizeMode='cover' source={require("../../../assets/fondo-02.png")}>
            <SpinnerModal loading={loading} text="Iniciando sesión" />
            <View style={{ marginBottom: 30 }}>
                <Image
                    source={require("../../../assets/logobarber.png")} style={{ width: 200, height: 200 }}>
                </Image>
            </View>
            <View style={[styles.container_input, { paddingRight: 20 }]}>
                <Icon name='mail' color={"#868686"} size={20} />
                <TextInput
                    placeholder='Email'
                    placeholderTextColor="#fff"
                    keyboardType="default"
                    onChangeText={(e) => setEmail(e)}
                    style={styles.input}
                />
            </View>
            <View style={styles.container_input}>
                <Icon4 name='lock' color={"#868686"} size={20} />
                <TextInput
                    placeholder='*****'
                    placeholderTextColor="#fff"
                    keyboardType="default"
                    secureTextEntry={showPassword ? false : true}
                    onChangeText={(e) => setPassword(e)}
                    style={styles.input}
                />
                {
                    showPassword ? <Icon name='md-eye-off-outline' color="#868686" size={20} style={{ marginRight: 10 }}
                        onPress={() => setShowPassWord(false)} /> :
                        <Icon name='ios-eye-outline' color="#868686" size={20} style={{ marginRight: 10 }}
                            onPress={() => setShowPassWord(true)} />
                }
            </View>
            <View style={{marginTop: 10}}>
                <Pressable style={{ width: "100%" }} android_ripple={{ color: "#fff" }}
                    onPress={() => navigation.navigate("Password")}>
                    <Text style={{ color: "#c7c7c7" }}>Olvidaste tu contraseña?</Text>
                </Pressable>
            </View>

            <View style={styles.containerBtn}>
                <Pressable style={{ width: "100%" }} android_ripple={{ color: "#fff" }}
                    onPress={() => onSummit()}>
                    <Text style={styles.textbtn}>E N T R A R</Text>
                </Pressable>
            </View>

            <View style={{marginTop: 40}}>
                <Text style={{ color: "#c7c7c7" }}>No tienes cuenta?</Text>
            </View>
            <View style={{marginTop: 10}}>
                <Pressable style={{ width: "100%" }} android_ripple={{ color: "#fff" }}
                    onPress={() => navigation.navigate("Registro")}>
                    <Text style={{ color: "#b99a55" }}>Crear Cuenta.</Text>
                </Pressable>
            </View>

            {/* <Geoloc /> */}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    container_input: {
        backgroundColor: "transparent",
        width: 290,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#fff",
        marginVertical: 10,
        paddingHorizontal: 10
    },
    icon: {
        width: 40,
        height: 40
    },
    input: {
        flex: 1,
        color: "#fff",
        fontFamily: "Metropolis-Bold"
    },
    textbtn: {
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        //fontSize:15,
        marginVertical: 12
    },
    containerBtn: {
        marginTop: 40,
        width: 290,
        backgroundColor: "#b99a55",
        marginVertical: 10,
        overflow: "hidden"
    },
    text1: {
        color: "#e9c28f",
        textDecorationLine: "underline",
        marginVertical: 2.5,
        paddingVertical: 5,
        fontWeight: "bold"
    },
    text2: {
        color: "#fff",
        fontWeight: "bold"
    },
    loginFooter: {
        //flexDirection: "row",
        marginTop: 20,
        width: 220,
        //justifyContent: "space-around",
        alignItems: "center"
    }
})
