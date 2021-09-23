import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Pressable, ImageBackground, StyleSheet, TextInput, Image, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import Row_simple from '../../../utils/components/row_simple'
import { Picker } from '@react-native-community/picker'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/Feather';
import { SaveLogin, SaveUser } from '../../../actions/loginActions';
import DatePicker from 'react-native-date-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Input, Button, CheckBox, ThemeProvider } from 'react-native-elements';
import Colum_simple from '../../../utils/components/colum_simple';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Col } from 'react-native-table-component';
import DateInputComp from './dateInputComp';
import moment from 'moment'
import 'moment/locale/es'
import { validateMail } from '../../../utils/validation';
import { Config } from '../../../configuration/config';
import ModalSexo from './modal';

const initDateSelect = new Date()
initDateSelect.setFullYear(2000)
initDateSelect.setMonth(0)
initDateSelect.setDate(1)

export default function Register(props) {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const user = useSelector(reducers => reducers.loginReducer).User;
    const [name, setName] = useState(null)
    const [dni, setDni] = useState(null)
    const [email, setEmail] = useState(null)
    const [contrasena, setPassword] = useState(null)
    const [contrasenaC, setPasswordC] = useState(null)
    const [showPassword, setShowPassWord] = useState(false);
    const [showPasswordC, setShowPassWordC] = useState(false);
    const [date, setDate] = useState(initDateSelect)
    const [birthdate, setBirthdate] = useState("");
    const [lastnameP, setLastNameP] = useState(null);
    const [lastnameM, setLastNameM] = useState(null);
    const [sexo, setSexo] = useState(null)
    const inputRef = useRef()
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };
    const selectDate = () => {
        setBirthdate(date.toISOString())
        setModalVisible(false);
    }

    const [modalCurrent, setModalCurrent] = useState(false);
    const toggleModalCurrent = () => {
        setModalCurrent(!modalCurrent);
    };

    const url_data = Config.URL_SERVER + "/Account/register"
    const onSummit = async () => {
        if (!name || !dni || !email || !contrasena || !birthdate || !lastnameP || !lastnameM || !sexo) {
            return Alert.alert(
                "Alerta",
                "Llene todo los campos",
                [{ text: "Aceptar", style: "default" }]
            )
        } else {
            if (!validateMail(email)) {
                Alert.alert(
                    "Alerta",
                    "Ingrese un email válido.",
                    [{ text: "Aceptar", style: "default" }]
                )
            } else if (contrasena != contrasenaC) {
                Alert.alert(
                    "Error",
                    "Las contraseñas no coinciden.",
                    [{ text: "Aceptar", style: "default" }]
                )
            }
            else {
                const formData = {
                    dni: dni,
                    apE_PAT: lastnameP,
                    apE_MAT: lastnameM,
                    nombre: name,
                    fechA_NACIMIENTO: birthdate,
                    correo: email,
                    contrasena: contrasena,
                    iD_SEXO: sexo
                }
                try {
                    const res = await Axios.post(url_data, formData);
                    console.log("Resultado de registro: ", res.data);
                    if (res.data.status == 1) {
                        Alert.alert(
                            "Satisfactorio",
                            "Registrado Correctamente.",
                            [
                                {
                                    text: "Ok",
                                    onPress: () => { navigation.navigate("HomeLogin") }
                                }
                            ]
                        )
                    } else if (res.data.status == 2) {
                        Alert.alert(
                            "Error",
                            "DNI o Correo existente.",
                            [
                                {
                                    text: "Ok",
                                    onPress: () => { }
                                }
                            ]
                        )
                    } else {
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
                } catch (error) {
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
            }
        }


        /*try {
            const res = await Axios.post(url_data, formData)
            console.log("res:", res)
            Alert.alert(
                "Satisfactorio",
                "Nuevo usuario creado",
                [
                    {
                        text: "Ok",
                        onPress: () => navigation.goBack()
                    }
                ]
            )

            //props.navigation.replace('SideBarStack');//No es necesario, y hace renderizar 2 veces.
        } catch (error) {
            console.log(error);
            Alert.alert(
                "Error",
                "Ocurrió un error al crear usuario.",
                [
                    {
                        text: "Ok",
                        onPress: () => navigation.goBack()
                    }
                ]
            )
        }*/
        //props.navigation.replace('SideBarStack');//No es necesario, y hace renderizar 2 veces.

    };

    return (
        <ImageBackground style={styles.containerhead} resizeMode='cover' source={require("../../../../assets/fondo-02.png")}>
            <View style={styles.top}>
                <Row_simple jus_cont={'flex-start'} alitems={'space-around'} flex={1}>
                    <Colum_simple jus_cont={'center'} alitems={'flex-start'} flex={1}>
                        <Pressable android_ripple={{ color: "#3b3b3b" }}
                            onPress={() => navigation.goBack()}>
                            <Icon5 name='arrow-left' color={"#b99a55"} size={30} />
                        </Pressable>
                    </Colum_simple>
                    <Colum_simple jus_cont={'center'} alitems={'flex-end'} flex={1}>
                        <Image
                            source={require("../../../../assets/logobarber.png")} style={{ width: 100, height: 100 }}>
                        </Image>
                    </Colum_simple>
                </Row_simple>
                <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, color: "#fff" }}>Registro</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.container}>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>

                        <View style={[styles.container_input, { paddingRight: 20 }]}>
                            <Icon4 name='id-card' color={"#868686"} size={20} />
                            <TextInput
                                placeholder='DNI'
                                placeholderTextColor="#fff"
                                keyboardType="numeric"
                                maxLength={8}
                                onChangeText={(e) => setDni(e)}
                                style={styles.input}
                            />
                        </View>
                        <View style={[styles.container_input, { paddingRight: 20 }]}>
                            <Icon name='mail' color={"#868686"} size={20} />
                            <TextInput
                                placeholder='E-mail'
                                placeholderTextColor="#fff"
                                keyboardType="email-address"
                                onChangeText={(e) => setEmail(e)}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.container_input}>
                            <Icon4 name='lock' color={"#868686"} size={20} />
                            <TextInput
                                placeholder='Password'
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
                        <View style={styles.container_input}>
                            <Icon4 name='lock' color={"#868686"} size={20} />
                            <TextInput
                                placeholder='Confirmar Password'
                                placeholderTextColor="#fff"
                                keyboardType="default"
                                secureTextEntry={showPasswordC ? false : true}
                                onChangeText={(e) => setPasswordC(e)}
                                style={styles.input}
                            />
                            {
                                showPasswordC ? <Icon name='md-eye-off-outline' color="#868686" size={20} style={{ marginRight: 10 }}
                                    onPress={() => setShowPassWordC(false)} /> :
                                    <Icon name='ios-eye-outline' color="#868686" size={20} style={{ marginRight: 10 }}
                                        onPress={() => setShowPassWordC(true)} />
                            }
                        </View>
                        <View style={[styles.container_input, { paddingRight: 20 }]}>
                            <Icon4 name='user-circle-o' color={"#868686"} size={20} />
                            <TextInput
                                placeholder='Nombres'
                                placeholderTextColor="#fff"
                                keyboardType="default"
                                onChangeText={(e) => setName(e)}
                                style={styles.input}
                            />
                        </View>
                        <View style={[styles.container_input, { paddingRight: 20 }]}>
                            <Icon4 name='user-circle-o' color={"#868686"} size={20} />
                            <TextInput
                                placeholder='Apellido Paterno'
                                placeholderTextColor="#fff"
                                keyboardType="default"
                                onChangeText={(e) => setLastNameP(e)}
                                style={styles.input}
                            />
                        </View>

                        <View style={[styles.container_input, { paddingRight: 20 }]}>
                            <Icon4 name='user-circle-o' color={"#868686"} size={20} />
                            <TextInput
                                placeholder='Apellido Materno'
                                placeholderTextColor="#fff"
                                keyboardType="default"
                                onChangeText={(e) => setLastNameM(e)}
                                style={styles.input}
                            />
                        </View>
                        <View style={[styles.container_input, { paddingRight: 20 }]} onTouchEnd={() => openModal()}>
                            <Icon4 name='calendar-o' color={"#868686"} size={20} />
                            <TextInput
                                placeholder='Fecha de nacimiento'
                                placeholderTextColor="#fff"
                                keyboardType="default"
                                value={birthdate ? moment(birthdate).format('DD/MM/YYYY') : ""}
                                editable={false}
                                style={[styles.input, { color: "#fff" }]}
                            />

                        </View>
                        <DateInputComp isModalVisible={isModalVisible} date={date}
                            setDate={setDate} closeModal={closeModal} selectDate={selectDate} />


                        <View style={styles.container_input} onTouchEnd={() => toggleModalCurrent()}>
                            <TextInput
                                placeholder='Género'
                                placeholderTextColor="#7c7878"
                                keyboardType="default"
                                value={sexo && sexo == 1 ? "Masculino" : "Femenino"}
                                editable={false}
                                style={[styles.input, { color: "#000" }]}
                            />
                        </View>
                        <ModalSexo setsexo={setSexo} isModalVisible={modalCurrent} toggleModal={toggleModalCurrent}
                    onBackButtonPress={() => setModalCurrent(false)} />

                        <View style={styles.containerBtn}>
                            <Pressable style={{ width: "100%" }} android_ripple={{ color: "#fff" }}
                                onPress={() => onSummit()}>
                                <Text style={styles.textbtn}>G U A R D A R</Text>
                            </Pressable>
                        </View>
                    </View>
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
    },
    container: {
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 20
    },
    top: {
        paddingHorizontal: 20,
        height: 100,
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
    container_inputPicker: {
        color: "#000",
        borderWidth: 2,
        borderColor: "#cbd5e0",
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        borderRadius: 10,
        marginVertical: 6,
        width: 290
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
    },
    row: {
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: 290,
        borderWidth: 1,
        borderColor: "#fff",
        marginVertical: 10,
        paddingHorizontal: 10
    }
})
