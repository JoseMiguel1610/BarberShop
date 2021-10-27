import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, ImageBackground, StyleSheet, TextInput, Image, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import Row_simple from '../../../utils/components/row_simple'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { SaveLogin, SaveUser } from '../../../actions/loginActions';
import Colum_simple from '../../../utils/components/colum_simple';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Col } from 'react-native-table-component';
import { validateMail } from '../../../utils/validation';
import { Config } from '../../../configuration/config';
export default function ForgetPassword(props) {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    console.log("nadaa");
    const user = useSelector(reducers => reducers.loginReducer).User;
    const [name, setName] = useState('')
    const [enviado, setEnviado] = useState(false)
    const [email, setEmail] = useState(null)
    const [contrasena, setPassword] = useState(null)
    const [showPassword, setShowPassWord] = useState(false);
    const url_data = Config.URL_SERVER +  "/Account/forgetpassword"

    const onSummit = async () => {
        if (!email) {
            return Alert.alert(
                "Alerta",
                "Ingrese un email",
                [{ text: "Aceptar", style: "default" }]
            )
        } else {
            if (!validateMail(email)) {
                Alert.alert(
                    "Alerta",
                    "Ingrese un email válido.",
                    [{ text: "Aceptar", style: "default" }]
                )
            } else {
                const formData = { "correo": email }
                try {
                    const res = await Axios.post(url_data, formData);
                    console.log(res.data);
                    if (res.data.status == 1) {
                        setEnviado(true)
                    } else if (res.data.status == 2) {
                        Alert.alert(
                            "Error",
                            "Email no existente.",
                            [{ text: "Aceptar", style: "default" }]
                        )
                    } else {
                        Alert.alert(
                            "Error",
                            "Ocurrió un error, inténtelo más tarde.",
                            [{ text: "Aceptar", style: "default" }]
                        )
                    }

                } catch (error) {
                    console.log(error);
                }
            }
        }
    };

    const getFirstCharacter = (email) => {
        var fstChar = email.substr(0, 3);
        let posicion = email.lastIndexOf('@')
        let after = email.charAt(posicion);
        let lastposition = email.lastIndexOf(".")
        console.log(lastposition);
        let final = email.substr(lastposition, 4)
        let emailOcult = fstChar + "******" + after + "*****" + final
        return " " + emailOcult;

    }

    const onSummitOk = async () => {
        navigation.navigate('HomeLogin')
    }

    return (
        <ImageBackground style={styles.containerhead} resizeMode='cover' source={require("../../../../assets/fondo-02.png")}>
            <View style={styles.top}>
            <Row_simple jus_cont={'flex-start'} alitems={'center'} flex={1}>
                    <Colum_simple jus_cont={'center'} alitems={'flex-start'} flex={0.3}>
                        <Pressable android_ripple={{ color: "#3b3b3b" }}
                            onPress={() => navigation.goBack()}>
                            <Icon5 name='arrow-left' color={"#b99a55"} size={30} />
                        </Pressable>
                    </Colum_simple>
                    <Colum_simple jus_cont={'center'} alitems={'center'} flex={0.9}>
                            <Text style={{ fontSize: 20, color: "#fff" }}>Restablecimiento de contraseña</Text>
                    </Colum_simple>
                    <Colum_simple jus_cont={'center'} alitems={'flex-end'} flex={0.6}>
                        <Image
                            source={require("../../../../assets/logobarber.png")} style={{ width: 100, height: 100 }}>
                        </Image>
                    </Colum_simple>
                </Row_simple>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    {enviado == false &&
                        <>
                            <View style={{ marginTop: 20, paddingHorizontal: 20, width: "85%" }}>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={{ textAlign: "center", fontSize: 15, color: "#fff" }}>Ingresa tu dirección de correo electrónico que usaste para registrarte.
                                        Te enviaremos tu nueva contraseña.</Text>
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <View style={[styles.container_input, { paddingRight: 20 }]}>
                                        <TextInput
                                            placeholder='E-mail'
                                            placeholderTextColor="#fff"
                                            keyboardType="default"
                                            onChangeText={(e) => setEmail(e)}
                                            style={styles.input}
                                        />
                                    </View>

                                    <View style={styles.containerBtn}>
                                        <Pressable style={{ width: "100%" }} android_ripple={{ color: "#fff" }}
                                            onPress={() => onSummit()}>
                                            <Text style={styles.textbtn}>E N V I A R</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </>
                    }

                    {enviado != false &&
                        <>
                            <View style={{ marginTop: 50, paddingHorizontal: 20, width: "85%" }}>
                                <View>
                                    <Text style={{ textAlign: 'left', fontSize: 15, color: "#fff" }}>Se restableció su contraseña,
                                        se le envió su nueva contraseña a: </Text>
                                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 50 }}>
                                        <Text style={{ fontSize: 15, color: "#fff" }}>
                                            {getFirstCharacter(email)}</Text>
                                    </View>
                                </View>
                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                                    <View style={styles.containerBtn2}>
                                        <Pressable style={{ width: "100%" }} android_ripple={{ color: "#fff" }}
                                            onPress={() => onSummitOk()}>
                                            <Text style={styles.textbtn}>O K</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </>
                    }

                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    containerhead: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: "#9b9b9b"
    },
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center'
    },
    top: {
        paddingHorizontal: 20,
        height: 150,
    },
    centro_cont: {
        display: 'flex',
        justifyContent: 'center',
    },
    container_sec: {
        margin: 20
    },
    txt_white: {
        color: '#fff',
        fontSize: 18,
        fontFamily: "Metropolis-Bold"
    },
    acontainer: {
        width: '60%',
        paddingHorizontal: 20,
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 20,
        borderRadius: 25,
        borderColor: '#3b3b3b',
        borderWidth: 2

    },
    txt_center: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase'
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
        width: 290,
        backgroundColor: "#b99a55",
        marginVertical: 10,
        overflow: "hidden"
    },
    containerBtn2: {
        marginTop: 20,
        width: 100,
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
